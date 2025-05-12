import { Request, Response } from 'express';
import prisma from '../../database';
import bcrypt from 'bcrypt';

class ControllerEditPasswordUser {
    async handle(req: Request, res: Response) {
        const { idUser } = req.params;
        const { passwordOld, passwordNew } = req.body;

        try {
            const user = await prisma.user.findUnique({
                where: { id: idUser },
                select: { password: true }
            });

            if (!user) {
                res.status(404).json({ error: 'Usuário não encontrado' });
                return
            }

            const isMatch = await bcrypt.compare(passwordOld, user.password);

            if (!isMatch) {
                res.status(401).json({ error: 'Senha antiga incorreta' });
                return
            }

            const updatedPassword = await bcrypt.hash(passwordNew, 10);

            const response = await prisma.user.update({
                where: { id: idUser },
                data: { password: updatedPassword }
            });

            res.status(200).json({ message: 'Senha atualizada com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao editar senha do usuário' });
        }
    }
}

export { ControllerEditPasswordUser };
