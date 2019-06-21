import * as express from 'express';
import {Request, Response} from 'express';
import NoteRepo from "../repositories/NoteRepo";

export const router = express.Router();

// GET ALL NOTES
router.get('/', (req: Request, res: Response) => {
    NoteRepo.list().then(noteList =>
        res.render('index', {title: 'Notes', noteList})
    )
});

// CREATE A NOTE
router.post('/', (req: Request, res: Response) => {
    res.send('OK');
});

// FIND A NOTE
router.get('/:id', (req: Request, res: Response) => {
    res.send('OK' + req.params.id);
});

// UPDATE A NOTE
router.put('/:id', (req: Request, res: Response) => {
    res.send('OK' + req.params.id);
});

// DELETE A NOTE
router.delete('/:id', (req: Request, res: Response) => {
    res.send('OK' + req.params.id);
});
