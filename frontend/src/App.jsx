import { useEffect, useState } from 'react';
import './App.css';
import Modal from './components/modal/Modal';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNoteData, setEditNoteData] = useState({ _id: null, title: '', content: '' });

  useEffect(() => {
    async function fetchNotes() {
      const fetchedNotes = await fetch('http://localhost:5001/notes');
      const jsonNotes = await fetchedNotes.json();
      setNotes(jsonNotes);
    }
    fetchNotes();
  }, []);

  async function deleteNote(id){
    try {
      const response = await fetch(`http://localhost:5001/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok){
        throw new Error('Failed to delete the note');
      }

      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  async function addNote() {
    try {
      const response = await fetch('http://localhost:5001/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error('Failed to add the note');
      }

      const createdNote = await response.json();
      setNotes(prevNotes => [...prevNotes, createdNote]);
      setNewNote({ title: '', content: '' });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }

  function startEdit(note){
    setEditNoteData(note);
    setIsModalOpen(true);
  }

  async function editNote() {
    try {
      const response = await fetch(`http://localhost:5001/notes/${editNoteData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editNoteData),
      });

      if (!response.ok) {
        throw Error("Failed to edit note");
      }

      const updatedNote = await response.json();
      setNotes(prevNotes => prevNotes.map(note => note._id === editNoteData._id ? updatedNote : note));
      setEditNoteData({ _id: null, title: '', content: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='container'>
      <div className="add-note-container">
        <form
          onSubmit={e => {
            e.preventDefault();
            addNote();
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={newNote.title}
            onChange={e => setNewNote({ ...newNote, title: e.target.value })}
          />
          <textarea
            name="content"
            placeholder="Content"
            value={newNote.content}
            onChange={e => setNewNote({ ...newNote, content: e.target.value })}
          />
          <button type="submit">Add Note</button>
        </form>
      </div>    

      <div className='notes-container'>
        {notes.map(note => (
          <div key={note._id} className='note-container'>
            <button className='editBtn' onClick={() => startEdit(note)}>Edit</button>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button className='deleteBtn' onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Edit Note Number {editNoteData._id}</h3>
        <form onSubmit={e => {
          e.preventDefault();
          editNote();
        }}>
          <input
            type="text"
            placeholder="Title"
            value={editNoteData.title}
            onChange={e => setEditNoteData({ ...editNoteData, title: e.target.value })}
          />
          <textarea
            name="content"
            placeholder="Content"
            value={editNoteData.content}
            onChange={e => setEditNoteData({ ...editNoteData, content: e.target.value })}
          />
          <button type='submit'>Save Changes</button>
        </form>
      </Modal>
    </div>
  )
}

export default App
