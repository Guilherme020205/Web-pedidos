import { Request, Response } from 'express';
import prisma from '../../database';
class ControllerEditStatusOrder {
    async handle(req: Request, res: Response) {
        const { idOrder } = req.params;
        const { newStatus } = req.body;
        try {
            const response = await prisma.order.update({
                where: {
                    id: Number(idOrder)
                },
                data: {
                    statusId: newStatus
                }
            })

            res.status(201).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}

export { ControllerEditStatusOrder }