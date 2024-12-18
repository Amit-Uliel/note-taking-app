import express from 'express';
import { getAllNotes, createNote, updateNote, deleteNote } from '../controllers/noteController.js';

const router = express.Router();

// Define routes and map them to controller methods
router.get('/', getAllNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;