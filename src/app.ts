import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { AuthRoutes } from './modules/auth/auth.route';
import { UserRoutes } from './modules/user/user.route';
import { TutorRoutes } from './modules/tutor/tutor.route';
import { CategoryRoutes } from './modules/category/category.route';


const app: Application = express();
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/auth', AuthRoutes);
app.use('/api/admin', UserRoutes);
app.use('/api/tutors', TutorRoutes);
app.use('/api', CategoryRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Skill Bridge World!');
});

export default app;
