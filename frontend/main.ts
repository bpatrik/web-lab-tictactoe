import {UI} from './UI';
import {ServerConnector} from './ServerConnector';


const serverConnector = new ServerConnector();
const ui = new UI($('#game'));

serverConnector.onNewState = ui.updateUI;
ui.onCellClick = serverConnector.onNewMove;
