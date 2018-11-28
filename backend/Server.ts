import * as express from 'express';
import {Express} from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import {GameRouter} from './routes/GameRouter';
import * as http from 'http';
import {Server as HTTPServer} from 'http';
import * as path from 'path';
import {PublicRouter} from './routes/PublicRouter';

export class Server {

  private app: Express;
  private server: HTTPServer;
  private port = 3000;

  constructor() {
    this.init();
  }


  init() {
    this.app = express();


    this.app.use(bodyParser.json());
    this.app.use(morgan('combined'));


    PublicRouter.route(this.app);
    GameRouter.route(this.app);


    // Get PORT from environment and store in Express.
    this.app.set('port', this.port);

    // Create HTTP server.
    this.server = http.createServer(this.app);

    // Listen on provided PORT, on all network interfaces.
    this.server.listen(this.port);
    this.server.on('error', this.onError);
    this.server.on('listening', this.onListening);


  }

  /**
   * Event listener for HTTP server "error" event.
   */
  private onError = (error: any) => {
    if (error.syscall !== 'listen') {
      console.error('Server error', error);
      throw error;
    }

    const bind = 'Port ' + this.port;

    // handle specific listen error with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  /**
   * Event listener for HTTP server "listening" event.
   */
  private onListening = () => {
    const addr = this.server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('Listening on ' + bind);
  };


}
