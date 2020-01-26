const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');


// index, show, store, update, destroy

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
    // console.log(request.body);
    const { github_username, techs, latitude, longitude } = request.body;

    let developer = await Dev.findOne({ github_username });

    if (!developer){

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio } = apiResponse.data;

        const techsArrays = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        developer = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArrays,
            location,
        })

        //Filtrar as conexoes e procurar para aquelas que satisfaçam 
        //10km de distancia e que o novo dev tenha pelo menos uma das tacnologias filtradas.
        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArrays,
        )

        sendMessage(sendSocketMessageTo, 'new-dev', dev);

    }
    return response.json(developer);
}
};