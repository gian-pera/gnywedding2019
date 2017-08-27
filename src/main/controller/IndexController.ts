import { injectable } from 'inversify';
import { controller, httpGet, response } from 'inversify-express-utils';

import * as express from 'express';
import * as logger from 'winston';

@injectable()
@controller('/')
export class IndexController {

  /**
   * Displays the config of the API through the UI.
   */
  @httpGet('/')
  public get(@response() response: express.Response): Promise<void> {
    logger.info('User accessed application.');
    return new Promise<void>((resolve, reject) => {
      response.render('index');
      resolve();
    });
  }
}
