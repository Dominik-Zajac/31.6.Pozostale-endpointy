import React from 'react';
import { PropTypes } from 'prop-types';
import Lane from './LaneContainer.js';

const Lanes = ({ lanes }) => {
	return (
		<div className='lanes'>{ lanes.map(lane =>
			<lane className='lane' key={ lane.id } lane={ lane } />
		)}</div>
	);
};

Lanes.propTypes = {
	lanes: PropTypes.array,
};

export default Lanes;