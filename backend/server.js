import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import noteRoutes from './routes/noteRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/note-taking-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/notes', noteRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));