const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

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

    }



    return response.json(developer);
}
};