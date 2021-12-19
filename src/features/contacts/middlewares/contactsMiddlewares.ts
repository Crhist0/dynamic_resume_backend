import { NextFunction, Request, Response } from "express";

let orderBy = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.order_by == undefined) req.query.order_by = "created_at desc";
    next();
};

let verifyEmptyFields = (req: Request, res: Response, next: NextFunction) => {
    let { name, phone, email } = req.body;

    if (req.body.prefers_contact_by == undefined) req.body.prefers_contact_by = "phone";

    if (!name || !phone || !email) {
        return res.status(400).send({
            message: "Insira um nome, telefone e email.",
        });
    }

    next();
};

let verifyMaxLength = (req: Request, res: Response, next: NextFunction) => {
    let { name, phone, email } = req.body;

    if (name.length - 1 > 50) {
        return res.status(400).send({
            message: "O campo 'Nome' possui um limite de 50 caracteres.",
        });
    }
    if (phone.length - 1 > 15) {
        return res.status(400).send({
            message: "O campo 'Telefone' possui um limite de 15 caracteres.",
        });
    }
    if (email.length - 1 > 50) {
        return res.status(400).send({
            message: "O campo 'E-mail' possui um limite de 50 caracteres.",
        });
    }

    next();
};

export { orderBy, verifyEmptyFields, verifyMaxLength };
