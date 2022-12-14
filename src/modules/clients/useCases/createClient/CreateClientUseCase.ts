import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";


interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {
    async execute({ password, username }: ICreateClient) {
        // validar se o usuário existe
        const clientExists = await prisma.clients.findFirst({
            where: {
                username: {
                    mode: "insensitive"
                }
            },
        });

        if (clientExists) {
            throw new Error("Cliente already exists")
        }
        // criptografar a senha
        const hashPassword = await hash(password, 10);

        // salvar o client
        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword,
            },
        });

        return client;
    }
}