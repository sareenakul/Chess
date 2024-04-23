"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Websocket in node
const ws_1 = require("ws");
const ChessManager_1 = require("./ChessManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const chessManager = new ChessManager_1.ChessManager();
wss.on('connection', function connection(ws) {
    chessManager.addUser(ws);
    ws.on('disconnect', () => chessManager.removeUser(ws));
});
