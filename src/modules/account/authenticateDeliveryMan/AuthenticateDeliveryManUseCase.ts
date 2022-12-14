import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryMan {
  username: string;
  password: string;
}

export class AuthenticateDeliveryManUseCase {
  async execute({ username, password }: IAuthenticateDeliveryMan) {
    // receber username e passowrd

    //  verificar se username ja esta cadastrado
    const deliveryman = await prisma.deliveryMan.findFirst({
      where: {
        username
      },
    });

    if (!deliveryman) {
      throw new Error("Invalid Username or password!");
    }
    // verificar se a senha corresponde ao username
    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("Invalid Username or password!");
    }

    // gerar o token
    const token = sign({ username }, "202cb962ac59077b964b07152d234b70", {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return token;
  }
}