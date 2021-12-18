import { createConnection, getConnection as getConnectionTypeORM } from "typeorm";

export const initConnection = async () => createConnection();

export const getConnection = () => {
    let conn = getConnectionTypeORM();

    if (!conn) {
        throw new Error("Database is not connected");
    }

    return conn;
};
