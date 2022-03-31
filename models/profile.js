import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new mongoose.Schema({
  email: {type: String, required: true, lowercase: true, unique: true},
  name: {type: String},
  photo: {type: String, default: "Image URL"},
  bio: {type: String},
  bar: {type: String},
  city: {type: String},
  favoriteCocktails: [{ type: Schema.Types.ObjectId, ref: 'Cocktail', default: null}]
},{
    timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {Profile}
