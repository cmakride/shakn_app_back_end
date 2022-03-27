import { Cocktail } from "../models/cocktail.js";

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
  console.log("CONTROLLERFUNCTION == ",req.body)
    Cocktail.create(req.body)
    .then(cocktail => {
        res.json(cocktail)
    })
    .catch(err => {
        res.json(err)
    })
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