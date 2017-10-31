import { injectable } from 'inversify';
import { controller, httpGet, httpPost, response } from 'inversify-express-utils';

import * as express from 'express';
import * as logger from 'winston';

@injectable()
@controller('/')
export class IndexController {

  /**
   * Displays the main page.
   */
  @httpGet('/')
  public get(@response() response: express.Response): Promise<void> {
    logger.info('User accessing application...');
    return new Promise<void>((resolve, reject) => {
      response.render('index');
      logger.info('User accessed application.');
      resolve();
    });
  }

  @httpPost('/')
  public rsvp(): Promise<void> {
    logger.info('User requesting RSVP...');

    return new Promise<void>((resolve, reject) => {
      logger.info('user RSVP\'d');
      resolve();
    });
  }
}
