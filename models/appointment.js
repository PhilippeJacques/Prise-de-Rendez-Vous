const mongoose = require('mongoose')

const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;
  
const appointmentSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  phone: Number,
  nameAssocs: String,
  slots:{type: ObjectId, ref: 'Slot'},
  created_at: Date
});
module.exports= model('Appointment', appointmentSchema);