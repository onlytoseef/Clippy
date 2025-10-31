import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  origin: "http://localhost:3000",  // ⭐ frontend origin
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

import authRoute from './routes/auth';
import subscriptionRoute from './routes/subscriptions';
import adminRoute from './routes/admin';
import planRoute from './routes/plan';
import generationRoute from './routes/generation';

app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/subscription', subscriptionRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/plan', planRoute);
app.use('/api/v1/generation', generationRoute);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export { app };
