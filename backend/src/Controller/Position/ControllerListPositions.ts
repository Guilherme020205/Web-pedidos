import { Request, Response } from 'express';
import prisma from '../../database';

class ControllerListPositions {
    async handle (req: Request, res: Response){
        try {
            const response = await prisma.position.findMany()
            res.status(201).json(response)
        } catch (error) {
            console.log(error)
            res.status(401).json({error: 'error when listing'})
        }
    }
}

export {ControllerListPositions}