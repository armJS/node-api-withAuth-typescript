import {Application} from 'express';
import {router as notesRouter} from './notes'

export class Routes {
    init(app: Application): void {
        app.use('/notes', notesRouter);
    }
}


export default new Routes;