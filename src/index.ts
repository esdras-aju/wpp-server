import { Client } from 'whatsapp-web.js'
import { Server } from 'socket.io'
import clientListeners from './listeners/ClientListeners'
import whatsAppListeners from './listeners/WhatsAppListeners'

const io = new Server(5000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }}
)

io.on('connection', (socket) => {
    const whatsAppClient = new Client({})

    clientListeners.setListeners(socket, whatsAppClient)
    whatsAppListeners.setListeners(socket, whatsAppClient)

    whatsAppClient.initialize();
})
