import express from 'express';
import cors from 'cors';
import imageRoutes from './routes/imageRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// image routes
app.use('/api/images', imageRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));