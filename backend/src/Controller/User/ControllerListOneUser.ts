import { Request, Response } from 'express';
import prisma from '../../database';

class ControllerListOneUser {
    async handle(req: Request, res: Response) {
        const { idUser } = req.params;

        try {
            
            const response = await prisma.user.findUnique({
                where: {
                    id: idUser
                }
            })
            if (!response) {
                res.status(404).json({ error: 'user not found' });
            }
            
            res.status(201).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'error when searching for user'})
        }

    }
}

export { ControllerListOneUser }