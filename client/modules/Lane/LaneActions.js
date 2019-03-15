import callApi from '../../util/apiCaller';
import { lanes } from '../../util/schema';
import { normalize } from 'normalizr';
import { createNotes } from '../Note/NoteActions';

// Export Constants
export const CREATE_LANES = 'CREATE_LANES';
export const CREATE_LANE = 'CREATE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const MOVE_BETWEEN_LANES = 'MOVE_BETWEEN_LANES';
export const PUSH_TO_LANE = 'PUSH_TO_LANE';
export const REMOVE_FROM_LANE = 'REMOVE_FROM_LANE';

// Export Actions
export function createLanes(lanesData) {
	return {
		type: CREATE_LANES,
		lanes: lanesData,
	};
}

export function createLane(lane) {
	return {
		type: CREATE_LANE,
		lane: {
			notes: [],
			...lane,
		}
	};
}

export function editLane(laneId) {
	return {
		type: EDIT_LANE,
		id: laneId
	};
}

export function updateLane(lane) {
	return {
		type: UPDATE_LANE,
		lane,
	};
}

export function deleteLane(laneId) {
	return {
		type: DELETE_LANE,
		laneId
	};
}

export function fetchLanes() {
	return (dispatch) => {
		return callApi('lanes').then(res => {
			const normalized = normalize(res.lanes, lanes);
			const { lanes: normalizedLanes, notes } = normalized.entities;
			
			dispatch(createLanes(normalizedLanes));
			dispatch(createNotes(notes));
		});
	};
}

export function changeLanesRequest(sourceLaneId, targetLaneId, noteId) {
  return (dispatch) => {
    return callApi('notes/${noteId}', 'delete')
      .then((res) => {
        callApi('notes', 'post', { laneId: targetLaneId, note: res });
      })
      .then(() => {
        dispatch(removeFromLane(sourceLaneId, noteId));
        dispatch(pushToLane(targetLaneId, noteId));
      }
    );
  };
}

export function createLaneRequest(lane) {
	return (dispatch) => {
		return callApi('lanes', 'post', lane).then(res => {
			dispatch(createLane(res));
		});
	};
}

export function upadateLaneRequest(lane, laneId) {
	return (dispatch) => {
		return callApi(`lanes/${ laneId }`, 'put', { id: lane.id, name: lane.name }).then(() => {
			dispatch(updateLane(lane));
		});
	};
}

export function deleteLaneRequest(laneId) {
	return (dispatch) => {
		return callApi(`lanes/${ laneId }`, 'delete').then(() => {
			dispatch(deleteLane(laneId));
		});
	};
}

export function moveBetweenLanes(targetLaneId, noteId, sourceLaneId) {
  return {
    type: MOVE_BETWEEN_LANES,
    targetLaneId,
    noteId,
    sourceLaneId,
  };
}

export function removeFromLane(sourceLaneId, noteId) {
	return {
		type: REMOVE_FROM_LANE,
		sourceLaneId,
		noteId,
	};
}

export function pushToLane(targetLaneId, noteId) {
	return {
		type: PUSH_TO_LANE,
		targetLaneId,
		noteId,
	};
}