const socketio = require('socket.io');
const parseStrinAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => { 
    //console.log('OK')
    io = socketio(server);

    io.on('connection', socket => {
       const { latitude, longitude, techs } = socket.handshake.query;
        
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStrinAsArray(techs),
        });
    });
 };


 exports.findConnections = (coordinates, techs) => {
     return connections.filter(connections => {
         return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.tech.some(item => techs.includes(item))
     })
 }


 exports.sendMessage = (to, message, data) => {
     to.array.forEach(connection => {
        io.to(connection.id).emit(message, data);
         
     });
 }