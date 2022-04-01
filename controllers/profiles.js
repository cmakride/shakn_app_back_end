import { Profile } from '../models/profile.js'
import {v2 as cloudinary} from 'cloudinary'

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
    
      res.json(profile)
    })
    .catch(err => res.json(err))
}

function updateProfile(req, res) {
  console.log("REQ.BODY", req.body)
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
  Profile.findByIdAndUpdate(req.user.profile, req.body )
  .then(profile => {
    profile.populate('photo')
    .then(populatedProfile => {
      res.status(201).json(populatedProfile)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
} else {
  const imageFile = req.files.photo.path
  cloudinary.uploader.upload(imageFile)
  .then(image => {
    req.body.photo = image.url
    console.log(req.body)
    Profile.findByIdAndUpdate(req.user.profile, req.body, {new: true})
    .then(profile => {
      
        res.status(201).json(profile)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}
}

//!add cocktail to collection for this profile
function addCocktail(req, res) {
  const cocktailId = req.body._id
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

function removeCocktail(req,res){
  const cocktailId = req.body._id
  console.log(cocktailId)
  Profile.findById(req.user.profile)
    .then(profile => {
      const tempArray = profile.favoriteCocktails
      let exists = false
      let targetIdx = null
      tempArray.forEach((id,idx) => {
        let tempId = id.toString()
        if (tempId === cocktailId) {
          exists = true
          targetIdx = idx 
        }
      })
        if(exists){
          profile.favoriteCocktails.splice(targetIdx,1)
          console.log("DELETED FROM COLLECTION",profile.favoriteCocktails)
          profile.save()
          .then(updatedProfile => {
            res.json(updatedProfile)
          })
        }else{
          console.log("NOT DELETED",profile.favoriteCocktails)
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
  addCocktail,
  removeCocktail,
  updateProfile
}
