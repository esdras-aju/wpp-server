import { Socket } from "socket.io";
import { Client } from "whatsapp-web.js";

function setListeners(socket: Socket, whatsAppClient: Client) {
    socket.on("disconnect", () => {
        socket.removeAllListeners()
        whatsAppClient.destroy()
    })

    socket.on("message", (message: {to: string, value: string}) => {
        whatsAppClient.sendMessage(message.to, message.value)
    })

    socket.on("getChatById", async (id: string) => {
        const chat = await whatsAppClient.getChatById(id)
        socket.emit("chat", chat)
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
