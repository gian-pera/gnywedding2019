import { injectable } from 'inversify';
import { controller, httpGet, response } from 'inversify-express-utils';

import * as express from 'express';

@injectable()
@controller('/')
export class IndexController {

  /**
   * Displays the config of the API through the UI.
   */
  @httpGet('/')
  public get(@response() response: express.Response): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      response.render('index');
      resolve();
    });
  }
}
