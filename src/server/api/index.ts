
import express from 'express';
import cors from 'cors';
import { registerRouter } from './routes/register';
import { ashaWorkerRouter } from './routes/ashaWorker';
import { chatRouter } from './routes/chat';
import { healthSchemeRouter } from './routes/healthScheme';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/register', registerRouter);
app.use('/api/asha-workers', ashaWorkerRouter);
app.use('/api/chat', chatRouter);
app.use('/api/health-schemes', healthSchemeRouter);

// Default route
app.get('/api', (req, res) => {
  res.json({ message: 'RMNCHA Health Assistant API' });
});

// Start server if not imported
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export { app };
