import React from 'react';
import { PropTypes } from 'prop-types';
import Note from './Note';
import Edit from '../../components/Edit';

// Import Style
//import styles from './Notes.css';

const Notes = ({ notes, laneId, editNote, updateNote, deleteNote }) => {
	return (
		<ul className='notes'>{ notes.map((note) =>
			<Note 
				id={ note.id }
				key={ note.id }
				editing={ note.editing }
				laneId={ laneId }
			>
				<Edit 
					editing={ note.editing }
					value={ note.task }
					onValueClick={ () => editNote(note.id) }
					onUpdate={ (task) => updateNote({
						...note,
						task,
						editing: false,
					}
				)}
					onDelete={ () => deleteNote(note.id, laneId) }
				/>
			</Note>
		)}</ul>
	);
};

Notes.propTypes = {
	deleteNote: PropTypes.func,
	updateNote: PropTypes.func,
	laneId: PropTypes.string,
	editNote: PropTypes.func,
	notes: PropTypes.array,
	editing: PropTypes.bool,
};

export default Notes;