import express from 'express';
import routes from './routes/index';
import cors from 'cors';
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
}));
app.use(express.json());
app.use('/api/v1', routes); 

export default app;
