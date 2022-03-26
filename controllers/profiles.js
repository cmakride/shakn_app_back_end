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
  .then(profile => res.json(profile))
  .catch(err => res.json(err))
}

function update(req, res){
  Profile.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(profile => res.json(profile))
  .catch(err => res.json(err))
}

export {
  index,
  show,
  update
 }
