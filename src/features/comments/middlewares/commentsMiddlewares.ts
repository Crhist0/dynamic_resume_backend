import { NextFunction, Request, Response } from "express";

let verifyEmptyFields = (req: Request, res: Response, next: NextFunction) => {
    let { name, comment } = req.body;

    if (!name || !comment) {
        return res.status(400).send({
            message: "Insira um nome e um comentário.",
        });
    }

    next();
};

let verifyMaxLength = (req: Request, res: Response, next: NextFunction) => {
    let { name, comment } = req.body;

    if (name.length - 1 > 50) {
        return res.status(400).send({
            message: "O campo 'Nome' possui um limite de 50 caracteres.",
        });
    }
    if (comment.length - 1 > 500) {
        return res.status(400).send({
            message: "O campo 'Comentário' possui um limite de 500 caracteres.",
        });
    }

    next();
};

export { verifyEmptyFields, verifyMaxLength };
