import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../server';

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Notes API', () => {
    let createdNoteId;

    test('should create a new note', async () => {
        const newNote = { title: 'Test Note', content: 'This is a test note' };
        const response = await request(app).post('/notes').send(newNote);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newNote.title);
        expect(response.body.content).toBe(newNote.content);

        createdNoteId = response.body._id; // Save the note ID for other tests
    });

    test('should fetch all notes', async () => {
        const response = await request(app).get('/notes');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        const createdNote = response.body.find(note => note._id === createdNoteId);
        expect(createdNote).toBeDefined();
        expect(createdNote.title).toBe('Test Note');
    });

    test('should update the created note', async () => {
        const updatedNote = { title: 'Updated Test Note', content: 'This is an updated test note' };
        const response = await request(app).put(`/notes/${createdNoteId}`).send(updatedNote);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updatedNote.title);
        expect(response.body.content).toBe(updatedNote.content);
    });

    test('should fetch all notes after update', async () => {
        const response = await request(app).get('/notes');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        const updatedNote = response.body.find(note => note._id === createdNoteId);
        expect(updatedNote).toBeDefined();
        expect(updatedNote.title).toBe('Updated Test Note');
    });

    test('should delete the created note', async () => {
        const response = await request(app).delete(`/notes/${createdNoteId}`);
        expect(response.status).toBe(204);
    });

    test('should fetch all notes after deletion', async () => {
        const response = await request(app).get('/notes');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        const deletedNote = response.body.find(note => note._id === createdNoteId);
        expect(deletedNote).toBeUndefined();
    });
});