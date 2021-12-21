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

    // lista todos os novos contatos da database com uma ordem específica como nome ou data de criação
    async read(order_by: string) {
        let connection = getConnection();
        let contacts = await connection.manager.query(`SELECT * FROM contacts WHERE new = true ORDER BY ${order_by};`);
        return contacts;
    }

    // atualiza um contato (new = false) por uid
    async update(uid: string) {
        let connection = getConnection();
        let updateContact = await connection.manager.query(`UPDATE contacts SET new = false WHERE uid = $1 `, [uid]);
    }

    // deleta um contato por uid
    async delete(uid: string) {
        let connection = getConnection();
        let deleteContact = await connection.manager.query(`DELETE FROM contacts WHERE uid = $1`, [uid]);
    }
}
