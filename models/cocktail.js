import mongoose from "mongoose"

const Schema = mongoose.Schema

const cocktailSchema = new Schema({

  name: { type: String },
  ingredients: [String],
  method: { type: String, default: "Method" },
  garnish: { type: String, default: "Garnish" },
  servedIn: { type: String, default: "Served In" },
  image: { type: String, default: "Image URL" },

  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review', default: null,}],

  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: null,}],

  profile: { type: Schema.Types.ObjectId, ref: 'Profile', default: null,}

},{
  timestamps: true
})

const Cocktail = mongoose.model("Cocktail",cocktailSchema)

export{
  Cocktail
}