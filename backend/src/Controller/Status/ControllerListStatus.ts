import { Request, Response } from "express";
import prisma from "../../database";

class ControllerListStatus {
    async handle(req: Request, res: Response) {
        try {
            const response = await prisma.status.findMany()
            res.status(201).send(response);
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'error when listing'})
        }
    }
}

export { ControllerListStatus }