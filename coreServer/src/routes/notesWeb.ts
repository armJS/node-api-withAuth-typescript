import * as express from 'express';
import { Request, Response } from 'express';
import webController from '../controllers/web';
import registerController from '../controllers/register';
import loginController from '../controllers/login';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

export const router = express.Router();

router.get('/login', loginController.render);

router.post('/login', loginController.perform);

router.get('/logout', loginController.logout);

router.get('/register', registerController.render);

router.post('/register', registerController.perform);

router.get('/list', webController.list);

router.get('/view/:id', ensureAuthenticated, webController.view);

router.get('/add', ensureAuthenticated, webController.add);

router.post(
  '/save',
  ensureAuthenticated,
  async (req: Request, res: Response): Promise<void> => {
    if (req.body.operation === 'create') {
      await webController.save(req, res);
    } else {
      await webController.update(req, res);
    }
  },
);

router.post('/edit', ensureAuthenticated, webController.edit);

router.post('/confirmDelete', ensureAuthenticated, webController.confirmDelete);

router.post('/delete', ensureAuthenticated, webController.delete);
