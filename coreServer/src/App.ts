import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as hbs from 'hbs';
import * as mongoose from 'mongoose';
import Routes from './routes';

class App {
  public app: express.Application;
  private mongoUrl: string = process.env.MONGODB_URL || 'mongodb://localhost/notes';

  public constructor() {
    this.app = express();
    this.mongoSetup();
    this.config();
    this.routes();
    this.view();
    this.assets();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  }

  private routes(): void {
    Routes.init(this.app);
  }

  private view(): void {
    hbs.registerPartials(path.join(__dirname, 'views/templates'));
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'hbs');
  }

  private assets(): void {
    this.app.use(express.static(path.join(__dirname, 'public')));
    console.log(path.join(__dirname, 'node_modules', 'bootstrap', 'dist'));

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
}

export default new App().app;
