import { Response, Request } from 'express';
import prisma from '../../database';

class ControllerCreatOrder {
    async handle(req: Request, res: Response): Promise<void> {
        const { statusId, description, observation, receipt_date, return_date, items } = req.body;
        const userId = req.userId;
        if (!userId) {
            res.status(400).json({ error: 'Usuário não autenticado' });
            return;
        }

        try {
            const response = await prisma.order.create({
                data: {
                    userId,
                    statusId,
                    description,
                    observation,
                    receipt_date: new Date(receipt_date),
                    return_date: new Date(return_date),
                    items: {
                        create: items.map((item: { name: string, quantity: number }) => ({
                            name: item.name,
                            quantity: item.quantity
                        }))
                    }
                },
                include: {
                    items: true
                }
            });


            res.status(201).json(response);
        } catch (error) {
            console.log(error);
            res.status(501).json({ error: 'error when create order' });
        }
    }
}

export { ControllerCreatOrder }