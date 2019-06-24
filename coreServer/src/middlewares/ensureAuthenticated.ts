import { Request, Response } from 'express';

export default (req: Request & { user: any }, res: Response, next) => {
  try {
    if (req.user) next();
    else res.redirect('/notes/login');
  } catch (e) {
    next(e);
  }
};
