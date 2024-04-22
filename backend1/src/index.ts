//Websocket in node
import { WebSocketServer } from 'ws';
import { ChessManager } from './ChessManager';

const wss = new WebSocketServer({ port: 8080 });

const chessManager = new ChessManager();

wss.on('connection', function connection(ws) {
    chessManager.addUser(ws);
    ws.on('disconnect', () => chessManager.removeUser(ws));
});