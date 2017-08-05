import { injectable } from 'inversify';
import { controller, httpGet, response } from 'inversify-express-utils';

import * as express from 'express';
import * as logger from 'winston';

@injectable()
@controller('/config')
export class ConfigUIController {

  /**
   * Displays the config of the API through the UI.
   */
  @httpGet('/')
  public get(@response() response: express.Response): Promise<void> {
    logger.info('ConfigUIController: Retrieving the application\'s configuration...');

    logger.info('ConfigUIController: Retrieved the application\'s configuration.');

    return new Promise<void>((resolve, reject) => {
      response.render('index');
      resolve();
    });
  }
}
