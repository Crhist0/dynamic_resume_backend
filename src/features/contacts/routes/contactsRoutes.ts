import { Request, Response, Router } from "express";
import { ContactsController } from "../controllers/contactsController";
import { orderBy, verifyEmptyFields, verifyMaxLength } from "../middlewares/contactsMiddlewares";

const contactsRoutes = Router();

let getMiddlewares = [orderBy];
let postMiddlewares = [orderBy, verifyEmptyFields, verifyMaxLength];
let putMiddlewares = [orderBy, verifyEmptyFields, verifyMaxLength];

contactsRoutes.get(`/contacts`, getMiddlewares, async (req: Request, res: Response) => {
    try {
        let { order_by } = req.query;
        const contactList = await new ContactsController().read(order_by as string);
        return res.status(200).send({
            message: "Mostrando contatos",
            data: contactList,
        });
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao exibir lista de contatos",
            error,
        });
    }
});

contactsRoutes.post(`/contacts`, postMiddlewares, async (req: Request, res: Response) => {
    try {
        let { name, phone, email, prefers_contact_by } = req.body;
        const contact = await new ContactsController().create(name, phone, email, prefers_contact_by);
        const contactList = await new ContactsController().read("created_at desc");
        return res.status(201).send({
            message: "Contato criado",
            data: contactList,
        });
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao criar contato",
            error,
        });
    }
});

contactsRoutes.put(`/contacts`, putMiddlewares, async (req: Request, res: Response) => {
    try {
        let { uid, name, phone, email, prefers_contact_by, newContact } = req.body;
        const contact = await new ContactsController().update(uid, name, phone, email, prefers_contact_by, newContact);
        const contactList = await new ContactsController().read("created_at desc");
        return res.status(200).send({
            message: "Contato atualizado",
            data: contactList,
        });
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao atualizar contato",
            error,
        });
    }
});

contactsRoutes.delete(`/contacts`, async (req: Request, res: Response) => {
    try {
        let { uid } = req.query;
        const contact = await new ContactsController().delete(uid as string);
        return res.status(200).send({
            message: "Contato deletado",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Erro ao deletar contato",
            error,
        });
    }
});

export { contactsRoutes };
