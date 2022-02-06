import { Socket } from "socket.io";
import { Client } from "whatsapp-web.js";

function setListeners(socket: Socket, whatsAppClient: Client) {
    whatsAppClient.on('qr', qr => {
        socket.emit("qr", qr)
    })

    whatsAppClient.on('ready', () => {
        socket.emit("ready")
    })

    whatsAppClient.on('message', message => {
        socket.emit("message", message)
    })
}

const whatsAppListeners = {
    setListeners
}

export default whatsAppListeners
