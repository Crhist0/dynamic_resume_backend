import express from "express";
import cors from "cors";
import { initConnection } from "./database/connections/database-connection";
import { contactsRoutes } from "./features/contacts/routes/contactsRoutes";
import { commentsRoutes } from "./features/comments/routes/commentsRoutes";
import { adminRoutes } from "./features/admin_list/routes/adminRoutes";

const app = express();

app.use(express.json(), cors(), contactsRoutes, commentsRoutes, adminRoutes);

initConnection()
    .then(() => app.listen(process.env.PORT, () => console.log("Server is running")))
    .catch((error) => {
        console.log("Error at creating connection with database");
        console.log(error);
    });
