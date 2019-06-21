import Note, { INote } from '../models/Note';

class NoteRepo {
  create(note: any) {
    return new Note(note).save();
  }

  update(note: INote) {
    return Note.findByIdAndUpdate({ _id: note._id }, note, { new: true });
  }

  findById(id: any) {
    return Note.findById({ _id: id });
  }

  delete(id: any) {
    return Note.deleteOne({ _id: id });
  }

  list() {
    return Note.find({});
  }
}

export default new NoteRepo();
