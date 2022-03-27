var eventsRouter = require('express').Router();
var eventsData = require('../data/events-data');
const frete = require('frete');
var _ = require('lodash');

var events = eventsData;
var id = 12;

var updateId = function (req, res, next) {
    console.log(req.body);
    if (!req.body.id) {
        id++;
        req.body.id = id + '';
    }
    next();
};

eventsRouter.param('id', function (req, res, next, id) {
    var event = _.find(events, {id: id});
    if (event) {
        req.event = event;
        next();
    } else {
        res.json({"error": "Id not found"});
    }
});

eventsRouter.get('/test', async function (req, res) {
    const response = await frete()
    .cepOrigem('13467460')
    .peso(1)
    .formato(frete.formatos.caixaPacote)
    .comprimento(16)
    .altura(2)
    .largura(11)
    .diametro(1)
    .valorDeclarado(50)
    // .avisoRecebimento(frete.avisoRecebimento.sim)
    .servico(frete.servicos.sedex)
    .preco('13466321')

    res.json(response);
});


// Error handler
eventsRouter.use(function (err, req, res, next) {

    if (err) {
        res.status(500).send(err);
    }

});

module.exports = eventsRouter;