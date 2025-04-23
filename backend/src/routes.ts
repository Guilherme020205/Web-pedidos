import { Router } from 'express';
import prisma from './database';

const router = Router();

router.get('/teste', (req, res) => {
    res.send('Hello, World! Teste');
})


export = router;