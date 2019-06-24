import { Request, Response } from 'express';
import * as passport from 'passport';
import { USER_SESSION_NAME } from '../constants';

export default class Login {
  public static render(req: Request, res: Response): void {
    res.render('login');
  }

  public static async perform(req: Request, res: Response): Promise<void> {
    try {
      passport.authenticate('local', {
        successRedirect: 'list',
        failureRedirect: 'login',
      })(req, res);
    } catch (e) {
      
    }
    
  }

  public static logout(req: Request, res: Response) {
    // @ts-ignore
    req.session.destroy();
    req.logout();
    res.clearCookie(USER_SESSION_NAME);
    res.redirect('list');
  }
}
