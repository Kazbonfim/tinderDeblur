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

        //console.log(response) //Log para verificar respostas
        /* 
        Ao buscar os dados de matches, tudo que a API retorna, de útil, acaba sendo somente foto, dade, e id, por conta disso, até o presente momento não encontrei meios de retornar também o nome do outro usuário. Caso encontrem formas de fazer isso, por favor, abra uma PR com indicativos, e farei a inserção dentro desse trecho. Por enquanto, trabalhamos somente com as fotos, e dados relevantes.
        */

        const teasers = response.data?.data?.results || [];

        console.debug(teasers);

        const responseData = teasers.map(teasers => {
            const matches = teasers.user;

            return {
                id: matches._id || null,
                active: matches.recently_active || null,
                name: matches.name || matches.name_length || null,
                birthday: matches.birth_date || null,
                relationship: matches.relationship_intent?.body_text || null,
                photos: matches.photos?.[0]?.url || null,
            };
        });

        // return teasers;
        return responseData;
    } catch (error) {
        console.error("Erro ao buscar teasers:", error);
        throw new Error('Erro em concluir a requisição na API Tinder!')
    }
}

module.exports = deblur;