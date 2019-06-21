import { Application } from 'express';
import { router as notes } from './notes';
import { router as notesApiRouter } from './notesApi';

export class Routes {
  init(app: Application): void {
    app.use('/notes', notes);
    app.use('/notes/api', notesApiRouter);
  }
}

export default new Routes();
