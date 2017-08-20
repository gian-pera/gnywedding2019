import { Container } from "inversify";
import { interfaces, TYPE } from 'inversify-express-utils';

import ContainerTags from "./ContainerTags";

import { IndexController } from "../controller/IndexController";

import  * as logger from 'winston';

/* Initializes the application's container
 */
let container = new Container();

logger.info("Initializing application container...");

/* Binds the API controllers
 */
container.bind<interfaces.Controller>(TYPE.Controller)
  .to(IndexController).inSingletonScope()
    .whenTargetNamed(ContainerTags.IndexController);

logger.info("Application container initialized.");

export default container;
