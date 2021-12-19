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

    // lista todos os comentários da database por ordem decrescente de adição
    async readFiltered() {
        let connection = getConnection();
        let contacts = await connection.manager.query(`SELECT * FROM comments WHERE aproved = true ORDER BY created_at DESC;`);
        return contacts;
    }

    // lista todos os comentários da database por ordem decrescente de adição
    async readAll() {
        let connection = getConnection();
        let contacts = await connection.manager.query(`SELECT * FROM comments ORDER BY created_at DESC;`);
        return contacts;
    }

    // atualiza o comentário por uid
    async update(uid: string, name: string, comment: string, aproved: boolean) {
        let connection = getConnection();
        let updateContact = await connection.manager.query(`UPDATE comments SET name = $2, comment = $3, aproved = $4 WHERE uid = $1 `, [uid, name, comment, aproved]);
    }

    // deleta um comentário por uid
    async delete(uid: string) {
        let connection = getConnection();
        let deleteContact = await connection.manager.query(`DELETE FROM comments WHERE uid = $1`, [uid]);
    }
}
