import * as express from 'express';
import { Request, Response } from 'express';
import NoteRepo from '../repositories/NoteRepo';

export const router = express.Router();

// GET ALL NOTES
router.get('/list', (req: Request, res: Response) => {
  NoteRepo.list().then(noteList => res.render('index', { title: 'Notes', noteList }));
});

// RENDER ADD NOTE TEMPLATE
router.get('/add', (req: Request, res: Response) => {
  res.render('note/edit.hbs');
});

// SAVE A NOTE
router.post('/save', async (req: Request, res: Response) => {
  try {
    const note = await NoteRepo.create({ text: req.body.text, title: req.body.title });
    res.redirect(`/view?id=${note._id}`);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/view/:id', async (req: Request, res: Response) => {
  try {
    res.render('note/view', { note: await NoteRepo.findById(req.params.id) });
  } catch (e) {
    res.sendStatus(500);
  }
});


