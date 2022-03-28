import { Cocktail } from "../models/cocktail.js";
import {v2 as cloudinary} from 'cloudinary'

function index (req, res) {
    Cocktail.find({})
    .then(cocktails => {
        res.json(cocktails)
    })
    .catch(err => {
        res.json(err)
    })
}

function create(req, res) {
  req.body.profile = req.user.profile
  if (req.body.photo === 'undefined' || !req.files['image']) {
    delete req.body['image']
    Cocktail.create(req.body)
    .then(cocktail => {
      console.log("NO IMAGE REQ.BODY == ",req.body)
      cocktail.populate('profile')
      .then(populatedCocktail => {
        res.status(201).json(populatedCocktail)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
} else {
    const imageFile = req.files.image.path
    cloudinary.uploader.upload(imageFile, {tags: `${req.body.name}`})
    .then(image => {
      req.body.image = image.url
      console.log("IMAGE EXISTS REQ.BODY == ",req.body)
      Cocktail.create(req.body)
      .then(cocktail => {
        cocktail.populate('profile')
        .then(populatedCocktail => {
          res.status(201).json(populatedCocktail)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  }
}


function deleteCocktail(req, res){
    Cocktail.findByIdAndDelete(req.params.id)
    .then(cocktail => res.json(cocktail))
    .catch(err => res.json(err))
}

function show(req, res){
    Cocktail.findById(req.params.id)
    .then(cocktail => res.json(cocktail))
    .catch(err => res.json(err))
}

function update(req, res){
    Cocktail.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(cocktail => res.json(cocktail))
    .catch(err => res.json(err))
}

export {
    index,
    create,
    deleteCocktail as delete,
    show,
    update
}