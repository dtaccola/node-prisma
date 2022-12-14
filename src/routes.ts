import { Router } from "express";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";

import { CreateDeliveryManController } from "./modules/deliveryman/useCases/CreateDeliveryman/CreateDeliveryManController";
import { AuthenticateDeliveryManController } from "./modules/account/authenticateDeliveryMan/AuthenticateDeliveryManController";

import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";

import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { ensureAuthenticateDeliveryMan } from "./middlewares/ensureAuthenticateDeliveryMan";
import { UpdateDeliveryManController } from "./modules/deliveries/useCases/updateDeliveryMan/useCases/UpdateDeliveryManController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/FindAllDeliveriesController";
import { FindAllDeliveriesDeliveryManController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesDeliveryManController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateEndDateController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

const createDeliveryManController = new CreateDeliveryManController();
const authenticateDeliveryManController = new AuthenticateDeliveryManController();

const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliveryManController = new UpdateDeliveryManController();
const findAllDeliveriesClient = new FindAllDeliveriesController();
const findAllDeliveriesDeliveryMan = new FindAllDeliveriesDeliveryManController();
const updateEndDateController = new UpdateEndDateController();


routes.post("/client/", createClientController.handle);
routes.post("/client/authenticate/", authenticateClientController.handle);

routes.post("/deliveryman/", createDeliveryManController.handle);
routes.post("/deliveryman/authenticate/", authenticateDeliveryManController.handle);

routes.post("/delivery/", ensureAuthenticateClient, createDeliveryController.handle);
routes.get("/delivery/available", ensureAuthenticateDeliveryMan, findAllAvailableController.handle);

routes.put("/delivery/updateDeliveryMan/:id", ensureAuthenticateDeliveryMan, updateDeliveryManController.handle);

routes.get("/client/deliveries", ensureAuthenticateClient, findAllDeliveriesClient.handle);

routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryMan, findAllDeliveriesDeliveryMan.handle);

routes.put("/delivery/updateEndDate/:id", ensureAuthenticateDeliveryMan, updateEndDateController.handle);

export { routes };