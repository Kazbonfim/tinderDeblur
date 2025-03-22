const express = require('express');
const router = express.Router();
const deblur = require('../application/deblur');

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.send({ message: 'bem-vindo!' });
});

router.post('/deblur', async (req, res, next) => {
  try {
    const apiKey = req.body.apiKey;  // Agora acessando a chave no corpo da requisição
    if (!apiKey) {
      return res.status(400).send({ error: 'API key é necessária!' });
    }

    const teasers = await deblur(apiKey);
    res.json(teasers);  // Retorna os teasers encontrados

  } catch (error) {
    console.error('Erro ao buscar teasers:', error);
    res.status(500).send({ error: 'Erro em concluir sua requisição, verifique novamente sua chave API!' });
  }
});

module.exports = router;
