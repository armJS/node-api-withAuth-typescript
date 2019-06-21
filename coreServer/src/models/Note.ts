import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface INote extends mongoose.Document {
    title: string,
    text: string,
}

const NoteSchema: mongoose.Schema = new Schema({
    title: {
        type: String, required: true,
    },
    text: {
        type: String, required: true,
    }
});

export default mongoose.model<INote>('Note', NoteSchema);