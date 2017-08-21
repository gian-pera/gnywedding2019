import 'reflect-metadata';
import './utils/Logger';

//import { AuthzPath } from './model/Authz';
import { InversifyExpressServer } from 'inversify-express-utils';
import { APIError, NotFoundError } from './utils/Errors';

import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as logger from 'winston';

import container from './container/Container';

let express = require('express');

/* Initializes the server
 */
require('source-map-support').install();
let server = new InversifyExpressServer(container);

/* Sets the server's configurations
 */
server.setConfig((app) => {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'pug');

  app.use('/', express.static(__dirname + '/resources'));
  app.use('/', express.static('node_modules/font-awesome'));
  app.use('/', express.static('node_modules/materialize-css/dist'));
  app.use('/js', express.static('node_modules/jquery/dist'));

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
});

/* Sets the server's error configurations
 */
 server.setErrorConfig((app) => {
   app.use((err, req, res, next) => {
     logger.error(err.stack);

     if (err instanceof NotFoundError) {
       res.status(404).json({
         status: 404,
         message: err.message
       });
     } else if (err instanceof APIError) {
       res.status(400).json({
         status: 400,
         message: err.message
       });
     } else {
       res.status(500).json({
         status: 500,
         message: 'An unexpected error was encountered!'
       });
     }
   });
 });

 /* Sets the port to be used
 */
const port = 8080;

/* Builds and starts the server
 */
let app = server.build();
app.listen(port);
logger.info(`Server started on port ${port}.`);
