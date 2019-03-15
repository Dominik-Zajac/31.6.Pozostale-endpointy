import Lane from '../models/lane';
import Note from '../models/note'
import uuid from 'uuid';

export function addLane(req, res) {
	if (!req.body.name) {
		res.status(403).end();
	}

	const newLane = new Lane(req.body);

	newLane.notes = [];

	newLane.id = uuid();
	newLane.save((err, saved) => {
		err ? res.status(500).send(err) : res.json(saved);
	});
}

export function getLanes(req, res) {
	Lane.find().exec((err, lanes) => {
		err ? res.status(500).send(err) : res.json({ lanes });
	});
}

export function editLane(req, res) {
	Lane.update({ id: req.params.id }, req.body.lane).exec((err, lane) => {
		err ? res.status(500).send(err) : res.json({ lane });
	});
}

export function deleteLane(req, res) {
	Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
		if (err) {
			res.status(500).send(err);
		}

		lane.notes.forEach((arg) => {
			arg.remove(() => {
				res.status(200).end();
			});
		});

		lane.remove(() => {
			res.status(200).end();
		});
	});
}