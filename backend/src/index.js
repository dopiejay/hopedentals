import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import servicesRouter from './routes/services.js';
import appointmentsRouter from './routes/appointments.js';
import authRouter from './routes/auth.js';
import teamRouter from './routes/team.js';
import testimonialsRouter from './routes/testimonials.js';
import contactRouter from './routes/contact.js';

dotenv.config({ quiet: true });

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || '*')
  .split(',')
  .map((o) => o.trim().replace(/\/+$/, ''));

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin.replace(/\/+$/, ''))) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'));
      }
    },
  }),
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/services', servicesRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/auth', authRouter);
app.use('/api/team', teamRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/contact', contactRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found.' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Shalom Dental API listening on port ${PORT}`);
});
