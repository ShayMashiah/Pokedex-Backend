import express from 'express';
import routes from './routes/index';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
}));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', routes); 

export default app;
