import restify, {Server, Request, Response, Next} from 'restify';
import loger from './loger';
import config from '../config';
import authCheckHandler from "./handlers/authCheckHandler";
import User from "./models/User";
import UserRepo from "./repositories/UserRepo";

const server: Server = restify.createServer({
    name: 'User-auth-server',
});

server.use(restify.plugins.authorizationParser());
server.use(authCheckHandler);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
    mapParams: true
}));

server.post('/createUser', async (req: Request, res: Response) => {
    const user: User = User.build({ name: req.body.name, password: req.body.password, email: req.body.email});
    await UserRepo.save(user);
    res.send(await UserRepo.list());
});

server.post('/updateUser', async (req: Request, res: Response) => {
    const user: User = User.build({ name: req.body.name, password: req.body.password, email: req.body.email});
    await UserRepo.update(req.body.id, {email: req.body.email});
    res.send(await UserRepo.list());
});

server.get('/getUser/:id', async (req: Request, res: Response) => {
    res.send(await UserRepo.findById(req.params.id));
});

server.post('/deleteUser', async (req: Request, res: Response) => {
    await UserRepo.delete(req.params.id);
    res.send(200);
});


server.get('/getUserList', async (req: Request, res: Response) => {
    res.send(await UserRepo.list());
});

server.listen(process.env.PORT || config.PORT, "localhost", async () => {
    loger.log('info', server.name + ' listening at ' + server.url);
});