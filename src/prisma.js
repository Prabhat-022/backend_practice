import dotenv from "dotenv";
import express from "express";
dotenv.config();

import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
// use `prisma` in your application to read and write data in your DB
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

async function main() {
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
}

main()
    .catch((e) => {
        console.error(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })



app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port ${process.env.PORT || 4000}`);
})