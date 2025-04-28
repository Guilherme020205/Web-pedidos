import { Request, Response } from 'express';
import prisma from '../../database';

class ControllerListOneOrder {
    async handle(req: Request, res: Response) {
        const { idOrder } = req.params;

        try {
            
            const response = await prisma.order.findUnique({
                where: {
                    id: Number(idOrder)
                }, 
                include: {
                    items: true, 
                    status: true, 
                    user: true, 
                }
            })
            if (!response) {
                res.status(404).json({ error: 'order not found' });
            }
            
            res.status(201).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'error when searching for order'})
        }
    }
}

export {ControllerListOneOrder}