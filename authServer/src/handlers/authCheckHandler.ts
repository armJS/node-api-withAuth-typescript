import {Request, Response, Next} from 'restify';

const apiKeys = {
    user: 'core-server',
    key: 'D4ED43C0-8BD6-4FE2-B358-7C0E230D11EF'
};

export default (req: Request, res: Response, next: Next) => {
    if (req.authorization && req.authorization.basic && req.authorization.basic.username === apiKeys.user && req.authorization.basic.password === apiKeys.key) {
        next();
    } else {
        res.send(401, new Error());
        next(false);
    }
}