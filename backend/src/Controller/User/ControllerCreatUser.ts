import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../../database';

class ControllerCreatUser {

    async handle(req: Request, res: Response) {
        const { name, email, user, positionId, password, isActive } = req.body

        const hashedPassword = await bcrypt.hash(password, 10); // criptografia da senha 

        try {

            const response = await prisma.user.create({
                data: {
                    name,
                    email,
                    user,
                    positionId,
                    password: hashedPassword, 
                    isActive
                }
            })

            res.status(201).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'error when create user' })
        }

    }
}

export { ControllerCreatUser }