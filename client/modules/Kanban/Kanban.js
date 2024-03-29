import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { compose } from 'redux';

// Import style
import styles from '../Lane/Lane.css';

const Kanban = props => (
	<div>
		<button 
			className={ styles.AddLane }
			onClick={ () => props.createLane({ name: 'New lane' }) }>
			Add Lane
		</button>
		<Lanes lanes={ props.lanes } />
	</div>
);

Kanban.need = [() => { return fetchLanes(); }];


Kanban.propTypes = {
	lanes: PropTypes.array,
	createLane: PropTypes.func,
};

const mapStateToProps = state => ({
	lanes: Object.values(state.lanes)
});

const mapDisptachToProps = {
	createLane: createLaneRequest,
};

export default compose(connect(mapStateToProps, mapDisptachToProps),DragDropContext(HTML5Backend))(Kanban);