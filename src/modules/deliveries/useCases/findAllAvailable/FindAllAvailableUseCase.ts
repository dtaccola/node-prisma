import { prisma } from "../../../../database/prismaClient";


export class FindAllAvailableUseCase {
  async execute() {
    const deliveries = await prisma.deliveries.findMany({
      where: {
        ended_at: null,
        id_deliveryman: null,
      }
    });

    return deliveries;
  }
}