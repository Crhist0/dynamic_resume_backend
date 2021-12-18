// cada arquivo .ts é uma tabela
import { getConnection } from "../../../database/connections/database-connection";

export class ExempleController {
    async createFunction(x: string, y: number) {
        let query = getConnection().manager.query;
        let insertExemple: string = await query(
            `
            INSERT INTO public.table
            (x, y)
            VALUES
            ($1, $2)
            `,
            [x, y]
        );
    }

    async readFunction() {
        let query = getConnection().manager.query;
        let selectExemple = await query(`
        SELECT * FROM public.table ORDER BY column ASC
        `);
        return selectExemple;
    }

    async updateFunction(uid: string, y: number, z: string) {
        let query = getConnection().manager.query;
        let insertExemple: string = await query(
            `
            UPDATE public.table t SET 
            t.column1 = $2,
            t.column2 = $3
            WHERE uid = $1
            `,
            [uid, y, z]
        );
    }

    async deleteFunction(uid: string) {
        let query = getConnection().manager.query;
        let deleteExemple = await query(
            `
            DELETE * FROM public.table WHERE uid = $1
            `,
            [uid]
        );
    }
}
