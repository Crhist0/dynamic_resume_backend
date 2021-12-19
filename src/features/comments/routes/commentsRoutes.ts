import { Request, Response, Router } from "express";
import { CommentsController } from "../controllers/commentsController";
import { verifyEmptyFields, verifyMaxLength } from "../middlewares/commentsMiddlewares";

const commentsRoutes = Router();

let getMiddlewares = [];
let postMiddlewares = [verifyEmptyFields, verifyMaxLength];
let putMiddlewares = [verifyEmptyFields, verifyMaxLength];

commentsRoutes.get(`/comments`, async (req: Request, res: Response) => {
    try {
        const comments = await new CommentsController().readFiltered();
        return res.status(200).send({
            message: "Mostrando comments.",
            data: comments,
        });
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao exibir comentários.",
            error,
        });
    }
});

commentsRoutes.get(`/comments-dev`, async (req: Request, res: Response) => {
    try {
        let query = req.query.approved;
        let approved: boolean;
        (query as string) == "true" ? (approved = true) : (approved = false);

        const comments = await new CommentsController().read(approved);

        return res.status(200).send({
            message: "Mostrando comments.",
            data: comments,
        });
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao exibir comentários.",
            error,
        });
    }
});

commentsRoutes.post(`/comments`, postMiddlewares, async (req: Request, res: Response) => {
    try {
        let { name, comment } = req.body;
        const newComment = await new CommentsController().create(name, comment);
        const comments = await new CommentsController().readFiltered();
        return res.status(201).send({
            message: "Comentário criado.",
            data: comments,
        });
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao criar comentário.",
            error,
        });
    }
});

commentsRoutes.put(`/comments`, putMiddlewares, async (req: Request, res: Response) => {
    try {
        let { uid, name, comment, approved } = req.body;
        const updatedComment = await new CommentsController().update(uid, name, comment, approved);
        const comments = await new CommentsController().readFiltered();
        return res.status(200).send({
            message: "Comentário atualizado.",
            data: comments,
        });
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao atualizar comentário.",
            error,
        });
    }
});

commentsRoutes.delete(`/comments`, async (req: Request, res: Response) => {
    try {
        let { uid } = req.query;
        const deletedComment = await new CommentsController().delete(uid as string);
        return res.status(200).send({
            message: "Comentário deletado.",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao deletar comentário.",
            error,
        });
    }
});

export { commentsRoutes };
