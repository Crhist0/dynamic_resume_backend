import { Request, Response, Router } from "express";
import { AdminController } from "../controllers/adminController";
import { verifyAcc } from "../middlewares/adminMiddlewares";

const adminRoutes = Router();

let getMiddlewares = [verifyAcc];

adminRoutes.post(`/admin`, getMiddlewares, async (req: Request, res: Response) => {
    try {
        const response = await new AdminController().read();
        return res.status(200).send({
            title: "Bem-vindo!",
            message: `Você possui: ${response.newContactsCount[0].count} novos contatos e ${response.newCommentsCount[0].count} comentários ainda não autorizados.`,
        });
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao exibir comentários.",
            error,
        });
    }
});

export { adminRoutes };
