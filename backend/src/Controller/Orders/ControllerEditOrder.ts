import { Request, Response } from 'express';
import prisma from '../../database';

class ControllerEditOrder {
    async handle(req: Request, res: Response) {
        const { idOrder } = req.params;
        const { statusId, observation } = req.body;

        try {
            const response = await prisma.order.update({
                where: {
                    id: idOrder
                },
                data: {
                    statusId, 
                    observation
                }
            })

            res.status(201).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

}

export { ControllerEditOrder }