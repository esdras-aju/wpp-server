import { Socket } from "socket.io";
import { Client } from "whatsapp-web.js";

function setListeners(socket: Socket, whatsAppClient: Client) {
    socket.on("disconnect", () => {
        whatsAppClient.removeAllListeners()
    })

    socket.on("message", (to: string, message: string) => {
        whatsAppClient.sendMessage(to, message)
    })

    socket.on("getChats", async () => {
        const chats = await whatsAppClient.getChats()
        socket.emit("chats", chats)
    })
}

const clientListeners = {
    setListeners
}

export default clientListeners
