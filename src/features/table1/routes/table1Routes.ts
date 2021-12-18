import { Request, Response, Router } from "express";
import { ExempleController } from "../controllers/table1Controller";

const table1Routes = Router();

table1Routes.get("/", async (req: Request, res: Response) => {
    try {
        const result = await new ExempleController().readFunction();
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({
            ok: false,
            error,
        });
    }
});
