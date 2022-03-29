import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
    .then(profiles => res.json(profiles))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}
function show(req, res) {
  Profile.findById(req.params.id)
    .then(profile => {
      console.log(profile)
      res.json(profile)
    })
    .catch(err => res.json(err))
}

//!add cocktail to collection for this profile
function addCocktail(req, res) {
  const cocktailId = req.body._id
  console.log(cocktailId)
  Profile.findById(req.user.profile)
    .then(profile => {
      const tempArray = profile.favoriteCocktails
      let exists = false
      
      
      
      tempArray.forEach(id => {
        let tempId = id.toString()
        if (tempId === cocktailId) {
          exists = true
        }
      })
        if(!exists){
          profile.favoriteCocktails.push(cocktailId)
          console.log("ADDED TO COLLECTION",profile.favoriteCocktails)
          profile.save()
          .then(updatedProfile => {
            res.json(updatedProfile)
          })
        }else{
          console.log("NOT ADDED",profile.favoriteCocktails)
          res.json(profile)
        }

    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}

function update(req, res) {
  Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(profile => res.json(profile))
    .catch(err => res.json(err))
}

export {
  index,
  show,
  update,
  addCocktail
}
