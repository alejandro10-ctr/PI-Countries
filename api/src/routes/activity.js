const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const { getActivity, postAct } = require('../controllers/activity')

const router = Router();

router.get("/activity", getActivity)
router.post("/activities", postAct)






module.exports = router