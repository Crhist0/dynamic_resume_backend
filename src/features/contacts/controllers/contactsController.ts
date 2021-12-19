// cada arquivo .ts é uma tabela
import { getConnection } from "../../../database/connections/database-connection";

export class ContactsController {
    // adiciona novo contato com nome, telefone, email e preferência de contato
    async create(name: string, phone: string, email: string, prefers_contact_by: string) {
        let connection = getConnection();
        let insertContact = await connection.manager.query(
            `INSERT INTO contacts
            (name, phone, email, prefers_contact_by)
            VALUES
            ($1, $2, $3, $4)`,
            [name, phone, email, prefers_contact_by]
        );
    }

    // lista todos os contatos da database com uma ordem específica como nome ou data de criação
    async read(order_by: string) {
        let connection = getConnection();
        let contacts = await connection.manager.query(
            `SELECT * FROM contacts ORDER BY ${order_by};` // [order_by] // order_by espera 'name', 'phone', 'email', 'prefers_contact_by', 'created_at' e 'new'
        );
        return contacts;
    }

    // atualiza um contato por uid
    async update(uid: string, name: string, phone: string, email: string, prefers_contact_by: string, newContact: boolean) {
        let connection = getConnection();
        let updateContact = await connection.manager.query(`UPDATE contacts SET name = $2, phone = $3, email = $4, prefers_contact_by = $5, new = $6 WHERE uid = $1 `, [
            uid,
            name,
            phone,
            email,
            prefers_contact_by,
            newContact,
        ]);
    }

    // deleta um contato por uid
    async delete(uid: string) {
        let connection = getConnection();
        let deleteContact = await connection.manager.query(`DELETE FROM contacts WHERE uid = $1`, [uid]);
    }

    // TODO: apagar esta função
    // lista um contatos da database pelo id
    // async readOne(uid: string) {
    //     let connection = getConnection();
    //     let contact = await connection.manager.query(`SELECT * FROM contacts WHERE uid = $1;`, [uid]);
    //     return contact;
    // }
}
