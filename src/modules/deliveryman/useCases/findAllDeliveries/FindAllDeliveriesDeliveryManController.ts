import { Request, Response } from "express";
import { FindAllDeliveriesDeliveryManUseCase } from "./FIndAllDeliveriesDeliveryManUseCase";



export class FindAllDeliveriesDeliveryManController {
  async handle(request: Request, response: Response) {

    const { id_deliveryman } = request;

    const findAllDeliveriesUseCase = new FindAllDeliveriesDeliveryManUseCase();
    const deliveries = await findAllDeliveriesUseCase.execute(id_deliveryman);

    return response.json(deliveries);
  }
}