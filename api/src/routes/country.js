const { Router } = require('express');
const { Sequelize } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllCountries, getCountryById, getCountryByName } = require('../controllers/country')


const router = Router();
 
router.get("/", getAllCountries);
router.get("/?name=", getCountryByName)
router.get("/:id", getCountryById);
 






module.exports = router