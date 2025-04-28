import { Request, Response } from 'express';
import prisma from '../../database';

class ControllerListOrders {
    async handle(req: Request, res: Response) {
        try {
            const response = await prisma.order.findMany({
                include: {
                    items: true, 
                    status: true, 
                    user: true
                }
            });

            res.status(201).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'error when listing' })
        }
    }
}

export { ControllerListOrders }