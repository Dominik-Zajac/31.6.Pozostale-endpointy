import { connect } from 'react-redux';
import Lane from './Lane';
import { createNoteRequest } from '../Note/NoteActions';
import { editLane, updateLaneRequest, deleteLaneRequest } from '../Lane/LaneActions';

const mapStateToProps = (state, ownProps) => ({
	laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});

const mapDispatchToProps = {
	editLane,
	addNote: createNoteRequest,
	updateLane: updateLaneRequest,
	deleteLane: deleteLaneRequest,
};

export default connect (
	mapStateToProps,
	mapDispatchToProps
	)(Lane);