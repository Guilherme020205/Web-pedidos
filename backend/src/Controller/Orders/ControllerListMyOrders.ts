import { Request, Response } from 'express';
import prisma from '../../database';

class ControllerListMyOrders {
    async handle(req: Request, res: Response) {
        const { idUser } = req.params;
        try {
            const response = await prisma.order.findMany({
                where: {
                    userId: idUser
                },
                orderBy:{
                    updateAt: 'desc'
                },
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

export { ControllerListMyOrders }