import { Request, Response } from 'express';
import prisma from '../../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class ControllerLogin {
    async handle(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const userExist = await prisma.user.findUnique({
                where: {
                    user: username
                }
            })
            if(!userExist) {
                res.status(404).json({error: 'The user does not exist'});
                return;
            }
            
            const passwordValid = await bcrypt.compare(password, userExist.password);
            
            if(!passwordValid){
                res.status(401).json({ error: 'Password incorrect' });
            }
            
            const token = jwt.sign(
                { userId: userExist.id },
                process.env.JWT_SECRET as string,
                { expiresIn: '30d' }
            );

            res.status(200).json({ message: 'Login ok', token });
        } catch (error) {
            res.status(500).json({ error: 'Erro login' });
        }
    }
}

export { ControllerLogin }