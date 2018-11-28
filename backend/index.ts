import * as express from 'express';
import * as bodyParser from 'body-parser';
import {NextFunction, Request, Response} from 'express';
import {Game} from './model/Game';
import {CommandDTO} from '../common/CommandDTO';
import * as http from 'http';
import * as path from 'path';
import * as morgan from 'morgan';

const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));

const game = new Game();

app.get('/api/game', (req: Request, res: Response, next: NextFunction) => {
  res.json(game.toJson());
});
app.post('/api/game/command', (req: Request, res: Response, next: NextFunction) => {
  const command = <CommandDTO>req.body;
  game.onBoardClick(command.x, command.y);
  res.sendStatus(200);
});


app.use(express.static(path.resolve(__dirname, './../frontend'), {maxAge: 31536000}));

const port = 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

server.on('error', (error: any) => {
  if (error.syscall !== 'listen') {
    console.error('Server error', error);
    throw error;
  }

  // handle specific listen error with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});


