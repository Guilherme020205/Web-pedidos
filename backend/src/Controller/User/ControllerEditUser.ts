import { Request, Response } from 'express';
import prisma from '../../database';
import bcrypt from 'bcrypt';

class ControllerEditUser {
    async handle(req: Request, res: Response) {

        const { idUser } = req.params;
        const { name, email, user, positionId, password, isActive } = req.body;

        try {
            // const hashedPassword = await bcrypt.hash(password, 10);
            let updatedPassword = undefined;

            if (password) {
                updatedPassword = await bcrypt.hash(password, 10);
            }
            
            const response = await prisma.user.update({
                where: { id: idUser },
                data: {
                    name,
                    email,
                    user,
                    positionId,
                    ...(updatedPassword && { password: updatedPassword }),
                    // password: hashedPassword,
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