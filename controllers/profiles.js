import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}
function show(req, res){
  Profile.findById(req.params.id)
  .then(profile => {
    console.log(profile)
    res.json(profile)})
  .catch(err => res.json(err))
}

//!add cocktail to collection for this profile
function addCocktail(req,res){
  console.log(req.body._id)
  Profile.findById(req.user.profile)
  .then(profile =>{
    profile.favoriteCocktails.push(req.body._id)
    profile.save()
    .then(updatedProfile => {
      res.json(updatedProfile)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
  //get cocktail id
  //get profile and add cocktail.id to profile favoriteCocktails then send updated profile
}

function update(req, res){
  Profile.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(profile => res.json(profile))
  .catch(err => res.json(err))
}

export {
  index,
  show,
  update,
  addCocktail
 }
