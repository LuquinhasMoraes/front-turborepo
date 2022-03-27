// --[ IMPORTS ]---------------------------------------------------------------
import { createAPI, dispatchSuccess, dispatchBadRequest } from './api.js'
const frete = require('frete');
// --[ API ]-------------------------------------------------------------------
const api = createAPI()

api.post(async (req, res) => {
    console.log("Dados body", req.body)
    const body = JSON.parse(req.body)
    const sourceCEP = '90440011'

    const response = await frete()
    .cepOrigem(sourceCEP)
    .peso(body.peso)
    .formato(frete.formatos.caixaPacote)
    .comprimento(body.comprimento)
    .altura(body.altura)
    .largura(body.largura)
    .diametro(body.diametro)
    .maoPropria('N')
    .valorDeclarado(50)
    .avisoRecebimento('S')
    .servico(frete.servicos.sedex)
    .preco(body.cep)

    res.json(response);
})

export default api