require("dotenv/config");

module.exports = {
    type: "postgres",
    host: "ec2-3-230-219-251.compute-1.amazonaws.com",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "d8o5231pjdofqg",
    schema: "public",
    entities: ["src/models/**/*.ts"],
    synchronize: false,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
};
