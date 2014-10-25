/* Mad Models */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemas = {
  'Users': {
    email: { type: String, unique: true, required: true },
    name: { type: { first: {type:String}, last: {type:String} }, required: true },
    hashedPassword: { type: String, required: true },
    passwordResetToken: { type: String, unique: true },
    resetTokenExpires: { type: Date },
    phone: { type: String },
    address: { type: String },
    gender: { type: String },
    farms: { type: [ { type: Schema.Types.ObjectId, rel: 'Farm' } ] }
  },
  'Farms': {
    userId: { type: Schema.Types.ObjectId, rel: 'User' },
    name: { type: String },
    position: { type: { x: { type: Number }, y: { type: Number } } }
  }
};

for (var sname in schemas) {
  mongoose.model(sname, new Schema(schemas[sname]));
}