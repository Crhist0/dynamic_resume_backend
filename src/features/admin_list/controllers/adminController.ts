// cada arquivo .ts é uma tabela
import { getConnection } from "../../../database/connections/database-connection";

export class AdminController {
    async read() {
        let connection = getConnection();
        let admins = await connection.manager.query(`SELECT * FROM admin_list;`);
        let newContactsCount = await connection.manager.query(`SELECT count(*) FROM contacts WHERE new = true;`);
        let newCommentsCount = await connection.manager.query(`SELECT count(*) FROM "comments" c WHERE c.approved = false;`);
        return { admins, newContactsCount, newCommentsCount };
    }
}
