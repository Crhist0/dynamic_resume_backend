import { NextFunction, Request, Response } from "express";
import { AdminController } from "../controllers/adminController";

let verifyAcc = async (req: Request, res: Response, next: NextFunction) => {
    let { name, pass } = req.body;

    console.log(name + " : " + pass + " - " + req.ip);

    if (!name || !pass) {
        return res.status(400).send({
            message: "Insira um nome e uma senha.",
        });
    }

    const admList = await (await new AdminController().read()).admins;

    for (const adm of admList) {
        if (adm.name != name || adm.pass != pass) {
            return res.status(404).send({
                message: "Dados não conferem.",
            });
        }
    }

    next();
};

export { verifyAcc };
