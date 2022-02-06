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
    let whatsAppClient = new Client({})

    clientListeners.setListeners(socket, whatsAppClient)
    whatsAppListeners.setListeners(socket, whatsAppClient)

    whatsAppClient.initialize().catch((reason)=>{
        console.warn("whatsAppClient.initialize() > Something went wrong!")
    });
})
