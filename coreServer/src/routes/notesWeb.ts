import * as express from 'express';
import { Request, Response } from 'express';
import controller from '../controllers/web';

export const router = express.Router();

router.get('/list', controller.list);

router.get('/view/:id', controller.view);

router.get('/add', controller.add);

router.post(
  '/save',
  async (req: Request, res: Response): Promise<void> => {
    if (req.body.operation === 'create') {
      await controller.save(req, res);
    } else {
      await controller.update(req, res);
    }
  },
);

router.post('/edit', controller.edit);

router.post('/confirmDelete', controller.confirmDelete);

router.post('/delete', controller.delete);
