const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  //select: false - não é exibido no retorno da collection
  password: { type: String, required: true, select: false },
  createdDate: { type: Date, default: Date.now },
});

//Função do moongose, açoes que ocorram antes de salvar
schema.pre("save", async function(next) {
  //10 - número de round
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

//descobrir o que faz isso
schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", schema);
