const express = require('express');
const routes = express.Router();
const controleurs = require('../controleurs/crocs.js');

//définir les routes
routes.get('/crocs', controleurs.getCrocs);
routes.get('/crocs/:id', controleurs.getCrocsById);

module.exports = routes;