import { Container } from "inversify";
import { interfaces, TYPE } from 'inversify-express-utils';

import ContainerTags from "./ContainerTags";sss

import  * as logger from 'winston';

/* Initializes the application's container
 */
let container = new Container();

logger.info("Initializing application container...");

/* Binds the API controllers
 */
container.bind<interfaces.Controller>(TYPE.Controller)
  .to(ConfigController).inSingletonScope()
    .whenTargetNamed(ContainerTags.ConfigController);

logger.info("Application container initialized.");

export default container;
