import * as fs from 'fs';
import * as _ from 'lodash';
import * as moment from 'moment-timezone';
import * as path from 'path';
import * as winston from 'winston';

/**
 * Contains the configuration for logging.
 */
class Logger {
  /* Sets the timestamp format of the log files
   */
  private static DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss zz [(GMT]ZZ[)]';

  /**
   * Initializes a new {Logger}.
   */
  constructor () {
    console.log('info: Initializing logger');

    /* Sets the default timezone for moment
     */
    moment.tz.setDefault(moment.tz.guess());

    /* Sets the root directory of the log files
     */
    let rootDir = path.normalize(_.join([__dirname, '/../logs']));
    if (!fs.existsSync(rootDir)) {
      fs.mkdirSync(rootDir);
    }

    winston.configure({
      transports: [
        new (winston.transports.File)({
          name: 'server',
          dirname: `${rootDir}`,
          filename: 'server-info.log',
          level: 'info',
          json: false,
          handleExceptions: true,
          timestamp: () => moment().format(Logger.DATE_FORMAT),
          formatter: (options) => this.format(options)
        }),
        new (winston.transports.File)({
          name: 'server-error',
          dirname: `${rootDir}`,
          filename: 'server-error.log',
          level: 'error',
          json: false,
          handleExceptions: true,
          timestamp: () => moment().format(Logger.DATE_FORMAT),
          formatter: (options) => this.format(options)
        }),
        new (winston.transports.Console)({
          prettyPrint: 'true'
        })
      ]
    });
    
    /* Enables debug logging for the dev environment
    */
    if (_.isEqual(process.env.NODE_ENV, 'dev')) {
      winston.add(winston.transports.File, {
        name: 'server-debug',
        dirname: `${rootDir}`,
        filename: 'server-debug.log',
        level: 'debug',
        json: false,
        handleExceptions: true,
        timestamp: () => moment().format(Logger.DATE_FORMAT),
        formatter: (options) => this.format(options)
      });
    }
  }

  /**
   * Formats a given set of options.
   * @param  {any} options the options to be formatted.
   * @return {string} the formatted options.
   */
  public format(options: any): string {
    return options.timestamp() + ' ' + options.level.toUpperCase() + ' '
        + (_.isNil(options.message) ? '' : options.message)
        + (_.isNil(options.meta) || Object.keys(options.meta).length == 0
            ? '' : ' (' + JSON.stringify(options.meta) + ')');
  }
}

/* Initializes the logger
 */
new Logger();

/* Exports the configured winston instance
 */
export default winston;
