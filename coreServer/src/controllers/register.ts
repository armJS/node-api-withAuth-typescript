import { Request, Response } from 'express';
import * as request from 'superagent';

const apiKeys = {
  user: 'core-server',
  key: 'D4ED43C0-8BD6-4FE2-B358-7C0E230D11EF',
};

export default class Register {
  public static render(req: Request, res: Response): void {
    res.render('register');
  }

  public static async perform(req: Request, res: Response): Promise<void> {
    request
      .post('http://localhost:3500/users/create')
      .send({
        name: req.body.username,
        password: req.body.password,
      })
      .auth(apiKeys.user, apiKeys.key)
      .then(r => console.log(r.status));
  }
}
