import type { WsEvent } from "../types/websocket";

let socket: WebSocket | null = null;

type Listener = (msg: any) => void;

const listeners: Record<string, Listener[]> = {};

let openHandlers: Array<() => void> = [];

export function connectWS(boardId: number) {
    const userId = localStorage.getItem('userId')
    socket = new WebSocket(`ws://localhost:8080/ws?boardId=${boardId}&userId=${userId}`);

    socket.onopen = () => { 
        openHandlers.forEach(h => h());
    };

    socket.onmessage = (ev) => {
        const msg = JSON.parse(ev.data); 
        console.log("Received msg:", msg, "type:", msg.type);
        
        const type = msg.type;
        if (!listeners[type] || listeners[type].length === 0) {
            console.warn(`No listener for type "${type}"`, listeners);
        } else {
            listeners[type].forEach(fn => fn(msg));
        }
    };
}

export function onOpen(handler: () => void) {
    openHandlers.push(handler);
}

export function onEvent(type: string, handler: Listener) {
    if (!listeners[type]) listeners[type] = [];
    listeners[type].push(handler);
}

export function sendEvent(event: WsEvent) {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify(event));
}
