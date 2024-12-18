import Note from '../models/Note.js';
import mongoose from 'mongoose';

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createNote = async (req, res) => {
    try {
        const note = new Note(req.body);
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};

export const updateNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid note ID' });
    }

    const { title, content } = req.body;

    try {
        const note = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );

        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid note ID' });
    }

    try {
        const note = await Note.findByIdAndDelete(id);

        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};