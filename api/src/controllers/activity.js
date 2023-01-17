const { Country, Activity } = require('../db');




async function getActivity(req, res){
  const allActivities = await Activity.findAll({include: Country})
  const normalizedAct = allActivities.map(el => el.name.toLowerCase());
  const total = normalizedAct.filter((item, index) => {
    return normalizedAct.indexOf(item) === index
  })
  res.json(total)
}




async function postAct(req, res, next) {

    const { name, difficulty, duration, season, countryId } = req.body;

    console.log(req.body)
    try{
    const newAct = await Activity.create({
        name,
        difficulty,
        duration,
        season,
    })
    await newAct.setCountries(countryId)

    let actCreated = await Activity.findOne({
        where: { name: name },
        attributes: {
            exclude: ['updatedAt', 'createdAt']
        },
        include:{
            model: Country,
            through: {
                attributes: []
            } 
        }
    })
    return res.json(actCreated)
}catch(error){
    next(error)
}


}


module.exports = {
    getActivity,
    postAct
}