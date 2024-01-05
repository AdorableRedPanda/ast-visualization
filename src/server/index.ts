import express from 'express';

import { API_PORT } from '../constants';
import { buildTree, cors, validateBody } from './middlewares';


const app = express();

app.use(cors);
app.use(express.json());
app.use(validateBody);

app.post('/tree', buildTree);

app.listen(API_PORT, () => console.log('Server is listening port:', API_PORT));
