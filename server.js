let express = require('express')
let app = express()
let http = require('http').createServer(app)
let io = require('socket.io').listen(http)

app.use('/', express.static(__dirname + '/web'))

http.listen(3000)

let users = []

io.sockets.on('connection', (socket) => {
    socket.on('login', (userName) => {
        socket.userName = userName
        users.push(userName)
        io.sockets.emit('addUser', socket.userName, users.length)
    })
    socket.on('disconnect', () => {
        if (socket.userName) {
            users.splice(users.indexOf(socket.userName), 1)
            io.sockets.emit('leave', socket.userName, users.length)
        }
    })
    socket.on('postMsg', (msg) => {
        socket.broadcast.emit('newMsg', msg, socket.userName)
    })
})
