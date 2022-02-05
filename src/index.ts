import { Client } from 'whatsapp-web.js'
import { Server } from 'socket.io'

const io = new Server(5000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }})

io.on('connection', (socket) => {
    const client = new Client({})

    socket.on("disconnect", () => {
        client.destroy()
        console.log("Client Destroyed")
    })

    try {
        client.on('qr', qr => {
            console.log("QR EMITTED")
            socket.emit("qr", qr)
        })
    
        client.on('ready', () => {
            console.log("Ready")
        })
    
        client.on('message', message => {
            console.log("message")
        })

        client.initialize();
    } catch(e) {
        console.log("Error")
    }    
})