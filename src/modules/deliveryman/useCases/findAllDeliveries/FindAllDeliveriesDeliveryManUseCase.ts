import { prisma } from "../../../../database/prismaClient";



export class FindAllDeliveriesDeliveryManUseCase {
  async execute(id_deliveryman: string) {
    const deliveries = await prisma.deliveryMan.findMany({
      where: {
        id: id_deliveryman,
      },
      select: {
        id: true,
        username: true,
        deliveries: true,
      },
    });

    return deliveries;
  }
}