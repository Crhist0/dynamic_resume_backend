import express from "express";
import cors from "cors";
import { initConnection } from "./database/connections/database-connection";

const app = express();

app.use(express.json(), cors()); // usar rotas aqui

initConnection()
    .then(() => app.listen(process.env.PORT, () => console.log("Server is running")))
    .catch((error) => {
        console.log("Error at creating connection with database");
        console.log(error);
    });
