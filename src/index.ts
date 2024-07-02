import express from 'express';
import connectDB from './config/db';
import todoRoutes from './routes/todoRoute';

const app = express();
const PORT = 3000;


connectDB();

// Middleware
app.use(express.json());
app.use('/api', todoRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
