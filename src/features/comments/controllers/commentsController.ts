// cada arquivo .ts é uma tabela
import { getConnection } from "../../../database/connections/database-connection";

export class CommentsController {
    // adiciona novo comentário com nome e comentário
    async create(name: string, comment: string) {
        let connection = getConnection();
        let insertContact = await connection.manager.query(
            `INSERT INTO comments
            (name, comment)
            VALUES
            ($1, $2)`,
            [name, comment]
        );
    }

    // listar os comentários aprovados ou naoda database por ordem decrescente de criação
    async read(approved: boolean) {
        let connection = getConnection();
        let contacts = await connection.manager.query(`SELECT * FROM comments WHERE approved = $1 ORDER BY created_at DESC;`, [approved]);
        return contacts;
    }

    // lista todos os comentários da database por ordem decrescente de criação
    async readAll() {
        let connection = getConnection();
        let contacts = await connection.manager.query(`SELECT * FROM comments ORDER BY created_at DESC;`);
        return contacts;
    }

    // atualiza o comentário por uid (approved = true)
    async update(uid: string) {
        let connection = getConnection();
        let updateContact = await connection.manager.query(`UPDATE comments SET approved = true WHERE uid = $1 `, [uid]);
    }
    // atualiza o comentário por uid (approved = false)
    async updateToFalse(uid: string) {
        let connection = getConnection();
        let updateContact = await connection.manager.query(`UPDATE comments SET approved = false WHERE uid = $1 `, [uid]);
    }

    // deleta um comentário por uid
    async delete(uid: string) {
        let connection = getConnection();
        let deleteContact = await connection.manager.query(`DELETE FROM comments WHERE uid = $1`, [uid]);
    }
}
