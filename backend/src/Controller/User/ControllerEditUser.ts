import { Request, Response } from 'express';
import prisma from '../../database';

class ControllerEditUser {
    async handle(req: Request, res: Response) {

        const { idUser } = req.params;
        const { name, email, user, positionId, isActive } = req.body;

        try {
            const response = await prisma.user.update({
                where: { id: idUser },
                data: {
                    name,
                    email,
                    user,
                    positionId,
                    isActive
                }
            })

            res.status(201).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error editing user' })
        }
    }
}

export { ControllerEditUser }