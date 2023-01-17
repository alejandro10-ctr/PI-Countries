const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Country, Activity } = require("../db");


async function getAllCountries(req, res) {
    const { name } = req.query;

    try{
        if(!name){
            const allCount = await Country.findAll({
                include: Activity
            })
            res.send(allCount)
        }else{
            const querymatch = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    },
                },
                include: Activity
            });

            if(!querymatch[0]) {
               // console.log("error");

                return res.status(404).json({error: "There's no country with that name"})
            }
            
            return res.send(querymatch)
        }

    }catch(error){
        console.log(error, "There's no country with that name" )
    }
}

async function getCountryByName(req, res) {
    try{
        const {name} = req.query;
        const querymatch = "".includes(name)

        const country = await Country.findAll({
            where: {
                name: {[Op.iLike]: `%${querymatch}%`},
            },
            include: Activity,
        });

        res.json(country)

    }catch(error){
        console.log(error, "There's no country with that name")
    }
}






async function getCountryById(req, res) {
    try{
        const {id} = req.params;

        const country = await Country.findOne({
            where: {
                id: {[Op.iLike]: `%${id}%`},
            },
            include: Activity,
        });

        res.json(country)

    }catch(error){
        console.log(error)
    }
}




module.exports = { 
    getAllCountries,
    getCountryById,
    getCountryByName
}
