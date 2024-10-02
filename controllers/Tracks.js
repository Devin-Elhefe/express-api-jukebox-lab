const express = require('express')
const router = express.Router()

const Track = require('../models/Track')


router.post('/', async function (req, res) {

    try {
        const { title, artist } = req.body;
        const newTrack = new Track({ title, artist });
        await newTrack.save();
        res.status(201).json(newTrack);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error creating track' });
    }
});

router.get('/', async function (req, res) {

    try {
        const tracks = await Track.find({});
        res.status(200).json(tracks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error fetching tracks' });
    }
})

router.get('/:tracksId', async function (req, res) {

    try {
        const track = await Track.findById(req.params.tracksId);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        res.status(200).json(track);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error fetching track' });
    }
});

router.put('/:tracksId', async function(req, res) {
    try {
        const { title, artist } = req.body;
        const updatedTrack = await Track.findByIdAndUpdate(req.params.tracksId, {title, artist}, { new: true });
    
        if (!updatedTrack) {
        return res.status(404).json({ message: 'Track not found' });
    }
        res.status(200).json(updatedTrack);
    }   catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating track' });
    }
});

router.delete('/:tracksId', async function(req, res) {
    try {
        const deletedTrack = await Track.findByIdAndDelete(req.params.tracksId);
        if (!deletedTrack) {
            return res.status(404).json({ message: 'Track not found'});
        }
        res.status(200).json(deletedTrack);
    }   catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error deleting track' });
    }
});

module.exports = router