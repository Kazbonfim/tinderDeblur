const axios = require("axios");

async function deblur(apiKey) {
    try {
        const response = await axios.get("https://api.gotinder.com/v2/fast-match/teasers", {
            responseType: "json",
            headers: {
                // "X-Auth-Token": localStorage.getItem("TinderWeb/APIToken"), // Testes
                "X-Auth-Token": apiKey,
                "platform": "android", // ou Windows
            }
        });

        //console.log(response) // Log para verificar respostas

        const teasers = response.data.data.results;

        const responseData = [];

        // armazenado dados
        teasers.forEach(teasers => {
            const matches = teasers.user

            //console.log(matches); // Log para verificar respostas

            const matchesData = {
                id: matches._id || null,
                active: matches.recently_active || null,
                name: matches.name || matches.name_length || null,
                birthday: matches.birth_date || null,
                relationship: matches.relationship_intent.body_text || null,
                photos: matches.photos[0].url || null,
            }

            responseData.push(matchesData);
            //console.log(matchesData); // Log para verificar respostas
        });

        // return teasers;
        return responseData;
    } catch (error) {
        console.error("Erro ao buscar teasers:", error);
        throw new Error('Erro em concluir a requisição na API Tinder!')
    }
}

module.exports = deblur;