import { Router } from "express";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";

import { CreateDeliveryManController } from "./modules/deliveryman/useCases/CreateDeliveryman/CreateDeliveryManController";
import { AuthenticateDeliveryManController } from "./modules/account/authenticateDeliveryMan/AuthenticateDeliveryManController";

import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

const createDeliveryManController = new CreateDeliveryManController();
const authenticateDeliveryManController = new AuthenticateDeliveryManController();

const createDeliveryController = new CreateDeliveryController();


routes.post("/client/", createClientController.handle);
routes.post("/client/authenticate/", authenticateClientController.handle);

routes.post("/deliveryman/", createDeliveryManController.handle);
routes.post("/deliveryman/authenticate/", authenticateDeliveryManController.handle);

routes.post("/delivery/", ensureAuthenticateClient, createDeliveryController.handle);

export { routes };