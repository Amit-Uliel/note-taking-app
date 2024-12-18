import mongoose from 'mongoose';
import app from './server.js';

mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb_c:27017/note-taking-app')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));