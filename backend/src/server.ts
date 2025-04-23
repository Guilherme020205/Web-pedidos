import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import  router  from './routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors())

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });
app.use(router)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});