import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as hbs from 'hbs';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as sessionFileStore from 'session-file-store';
import * as request from 'superagent';
import Routes from './routes';

import { USER_SESSION_NAME } from './constants';

const apiKeys = {
  user: 'core-server',
  key: 'D4ED43C0-8BD6-4FE2-B358-7C0E230D11EF',
};

class App {
  public app: express.Application;
  private mongoUrl: string = process.env.MONGODB_URL || 'mongodb://localhost/notes';

  public constructor() {
    this.app = express();
    this.mongoSetup();
    this.config();
    this.view();
    this.assets();
    this.auth();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  }

  private routes(): void {
    Routes.init(this.app);
  }

  private view(): void {
    hbs.registerPartials(path.join(__dirname, 'views/partials'));
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'hbs');
  }

  private assets(): void {
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(
      '/assets/vendor/bootstrap',
      express.static(path.join(__dirname, '../node_modules', 'bootstrap', 'dist')),
    );
    this.app.use('/assets/vendor/jquery', express.static(path.join(__dirname, '../node_modules', 'jquery')));
    this.app.use(
      '/assets/vendor/popper.js',
      express.static(path.join(__dirname, '../node_modules', 'popper.js', 'dist')),
    );
    this.app.use(
      '/assets/vendor/feather-icons',
      express.static(path.join(__dirname, '../node_modules', 'feather-icons', 'dist')),
    );
  }

  private auth(): void {
    const FileStore = sessionFileStore(session);
    this.app.use(
      session({
        store: new FileStore({ path: 'sessions' }),
        secret: 'keyboard mouse',
        resave: true,
        saveUninitialized: true,
        name: USER_SESSION_NAME,
      }),
    );

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    passport.serializeUser((user: { username: string }, done): void => {
      done(null, user.username);
    });

    passport.deserializeUser(async (username, done) => {
      done(null, { username });
    });

    passport.use(
      new passportLocal.Strategy(async (username, password, done) => {
        request
          .post('http://localhost:3500/users/check')
          .send({
            name: username,
            password,
          })
          .auth(apiKeys.user, apiKeys.key)
          .then(res => done(null, res.body))
          .catch(res => {
            res.errorMessage = 'Incorrect login or password';
            done(null, false);
          });
      }),
    );
  }
}

export default new App().app;
