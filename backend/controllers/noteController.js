import Note from '../models/Note.js';
import mongoose from 'mongoose';

/**
 * Retrieves all notes from the database.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a JSON response containing all notes or an error message.
 */
export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Creates a new note and saves it to the database.
 *
 * @param {Object} req - Express request object containing the note data in the request body.
 * @param {Object} req.body - The note data (title and content).
 * @param {Object} res - Express response object.
 * @returns {void} Sends the newly created note as a JSON response or an error message if creation fails.
 */
export const createNote = async (req, res) => {
    try {
        const note = new Note(req.body);
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};

/**
 * Updates an existing note by its ID.
 *
 * @param {Object} req - Express request object containing the note ID and updated data.
 * @param {Object} req.params - The route parameters (e.g., note ID).
 * @param {string} req.params.id - The ID of the note to be updated.
 * @param {Object} req.body - The updated note data (title and content).
 * @param {Object} res - Express response object.
 * @returns {void} Sends the updated note as a JSON response or an error message if the update fails.
 */
export const updateNote = async (req, res) => {
    const { id } = req.params;

    // Validate the ID format
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

/**
 * Deletes a note by its ID.
 * 
 * @param {Object} req - Express request object containing the note ID in params.
 * @param {Object} res - Express response object.
 * @returns {void} Sends the deleted note or an error message.
 */
export const deleteNote = async (req, res) => {
    const { id } = req.params;
    
    // Validate the ID format
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