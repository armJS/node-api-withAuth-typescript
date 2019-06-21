import * as express from 'express';
import { Request, Response } from 'express';
import NoteRepo from '../repositories/NoteRepo';

export const router = express.Router();

// GET ALL NOTES
router.get('/', async (req: Request, res: Response) => {
  try {
    res.send(await NoteRepo.list());
  } catch (e) {
    res.sendStatus(500);
  }
});

// CREATE A NOTE
router.post('/', async (req: Request, res: Response) => {
  try {
    await NoteRepo.create({ text: req.body.text, title: req.body.title });
    res.redirect('/notes');
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// FIND A NOTE
router.get('/:id', async (req: Request, res: Response) => {
  await NoteRepo.findById(req.query.id);
});

// UPDATE A NOTE
router.put('/:id', (req: Request, res: Response) => {
  res.send('OK' + req.params.id);
});

// DELETE A NOTE
router.delete('/:id', (req: Request, res: Response) => {
  res.send('OK' + req.params.id);
});
