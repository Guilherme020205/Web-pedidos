import { Request, Response } from 'express';
import prisma from '../../database';

class ControllerEditObservationOrder {
    async handle(req: Request, res: Response) {
        const { idOrder } = req.params;
        const { newObservation } = req.body;
        try {
            const response = await prisma.order.update({
                where: {
                    id: Number(idOrder)
                },
                data: {
                    observation: newObservation
                }
            })

            res.status(201).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

}

export { ControllerEditObservationOrder }