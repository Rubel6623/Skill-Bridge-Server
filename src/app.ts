import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { AuthRoutes } from './modules/auth/auth.route';
import { UserRoutes } from './modules/user/user.route';


const app: Application = express();
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/auth', AuthRoutes);
app.use('/api/admin', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Skill Bridge World!');
});

export default app;
