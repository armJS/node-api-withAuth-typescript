import restify, {Server} from 'restify';
import loger from './loger';
import config from '../config';
import authCheckHandler from "./handlers/authCheckHandler";
import UsersController from "./controllers/users";

const server: Server = restify.createServer({
    name: 'User-auth-server',
});

server.use(restify.plugins.authorizationParser());
server.use(authCheckHandler);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
    mapParams: true
}));

server.post('/users/create', UsersController.save);

server.post('/users/check', UsersController.check);

server.listen(process.env.PORT || config.PORT, "localhost", async () => {
    loger.log('info', server.name + ' listening at ' + server.url);
});