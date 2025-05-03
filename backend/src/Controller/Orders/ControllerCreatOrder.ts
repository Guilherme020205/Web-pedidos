import { Response, Request } from 'express';
import prisma from '../../database';

class ControllerCreatOrder {
    async handle(req: Request, res: Response): Promise<void> {
        const { statusId, description, receipt_date, return_date, items } = req.body;
        const userId = req.userId;

        if (!userId) {
            res.status(400).json({ error: 'Usuário não autenticado' });
            return;
        }

        try {
            const statusToUse = statusId ?? (
                await prisma.status.findUnique({
                    where: { name: 'Novo' },
                    select: { id: true }
                })
            )?.id;

            if (!statusToUse) {
                res.status(400).json({ error: 'Status "Novo" não encontrado no banco.' });
                return;
            }

            const response = await prisma.order.create({
                data: {
                    userId,
                    statusId: statusToUse,
                    description,
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

export { ControllerCreatOrder };
