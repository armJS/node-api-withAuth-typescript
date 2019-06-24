import { Request, Response } from 'express';
import Note from '../models/Note';

class Web {
  public static async list(req: Request, res: Response): Promise<void> {
    try {
      res.render('index', { title: 'Notes', noteList: await Note.find({}), user: req.user });
    } catch (e) {
      res.sendStatus(500);
    }
  }

  public static async view(req: Request, res: Response): Promise<void> {
    try {
      const note = await Note.findById({ _id: req.params.id });
      if (note) {
        res.render('note/view', { note, user: req.user });
      } else {
        // TODO:
      }
    } catch (e) {
      res.sendStatus(500);
    }
  }

  public static add(req: Request, res: Response): void {
    res.render('note/edit.hbs', { docreate: true });
  }

  public static async save(req: Request, res: Response): Promise<void> {
    try {
      const note = await new Note({ text: req.body.text, title: req.body.title }).save();
      res.redirect(`view/${note._id}`);
    } catch (e) {
      res.sendStatus(500);
    }
  }

  public static async edit(req: Request, res: Response): Promise<void> {
    try {
      res.render('note/edit.hbs', { docreate: false, note: await Note.findById(req.body.id) });
    } catch (e) {
      res.sendStatus(500);
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      await Note.updateOne({ _id: req.body.id }, { text: req.body.text, title: req.body.title });
      res.redirect(`view/${req.body.id}`);
    } catch (e) {
      res.sendStatus(500);
    }
  }

  public static async confirmDelete(req: Request, res: Response): Promise<void> {
    res.render('note/delete', { user: {}, note: await Note.findById({ _id: req.body.id }) });
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      await Note.deleteOne({ _id: req.body.id });
      res.redirect('/notes/list');
    } catch (e) {
      res.sendStatus(500);
    }
  }
}

export default Web;
