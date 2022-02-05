import { Client } from 'whatsapp-web.js'
import { Server } from 'socket.io'

const io = new Server(5000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }}
)

io.on('connection', (socket) => {
    const whatsAppClient = new Client({})

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

    whatsAppClient.on('qr', qr => {
        socket.emit("qr", qr)
    })

    whatsAppClient.on('ready', () => {
        socket.emit("ready")
    })

    whatsAppClient.on('message', message => {
        socket.emit("message", message)
    })

    whatsAppClient.initialize();   
})