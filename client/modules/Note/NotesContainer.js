import { connect } from 'react-redux';
import Notes from './Notes';
import { deleteNoteRequest, editNote, updateNoteRequest, createNoteRequest } from '../Note/NoteActions';

const mapDispatchToProps = {
	createNote: createNoteRequest,
	deleteNote: deleteNoteRequest,
	updateNote: updateNoteRequest,
	editNote,
};

export default connect(
	null,
	mapDispatchToProps
	)(Notes);