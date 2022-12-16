import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateDeliveryMan {
  username: string;
  password: string;
}

export class CreateDeliveryManUseCase {
  async execute({ username, password }: ICreateDeliveryMan) {
    const deliverymanExists = await prisma.deliveryMan.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (deliverymanExists) {
      throw new Error("Deliveryman already exists")
    }
    // criptografar a senha
    const hashPassword = await hash(password, 10);

    // salvar o deliveryman
    const deliveryman = await prisma.deliveryMan.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return deliveryman;
  }
}