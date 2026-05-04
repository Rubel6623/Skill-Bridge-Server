import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { AuthRoutes } from './modules/auth/auth.route';
import { UserRoutes } from './modules/user/user.route';
import { TutorRoutes } from './modules/tutor/tutor.route';
import { CategoryRoutes } from './modules/category/category.route';
import { BookingRoutes } from './modules/booking/booking.route';
import { ReviewRoutes } from './modules/review/review.route';
import { AvailabilityRoutes } from './modules/availability/availability.route';
import { BlogRoutes } from './modules/blog/blog.route';


const app: Application = express();
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/auth', AuthRoutes);
app.use('/api/admin', UserRoutes);
app.use('/api', TutorRoutes);
app.use('/api', CategoryRoutes);
app.use('/api', BookingRoutes);
app.use('/api', ReviewRoutes);
app.use('/api', AvailabilityRoutes)
app.use('/api/blogs', BlogRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Skill Bridge World!');
});

// global error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';
  
  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
});

// handle 404
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found!',
  });
});

export default app;

