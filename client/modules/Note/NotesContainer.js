import { connect } from 'react-redux';
import Notes from './Notes';
import { deleteNoteRequest, editNote, updateNoteRequest, moveWithLane } from '../Note/NoteActions';

const mapDispatchToProps = {
	onValueClick: editNote,
	onUpdate: updateNoteRequest,
	onDelete: deleteNoteRequest,
	moveWithLane,
};

export default connect(
	null,
	mapDispatchToProps
	)(Notes);