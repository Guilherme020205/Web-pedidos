import { Request, Response } from 'express';
import prisma from '../../database';

class ControllerListUsers {
    async handle(req: Request, res: Response) {
        try {
            const response = await prisma.user.findMany()
            res.status(201).send(response);
        } catch (error) {
            
            res.status(201).json({error: 'error when listing'});
        }
    }
}

export { ControllerListUsers }