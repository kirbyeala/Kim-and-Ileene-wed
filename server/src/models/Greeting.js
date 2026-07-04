import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  guestName: { type: String, trim: true, maxlength: 60, default: 'A cherished guest' },
  message: { type: String, required: true, trim: true, maxlength: 300 },
  approved: { type: Boolean, default: true }
}, { timestamps: true })
schema.index({ createdAt: -1 })
export default mongoose.model('Greeting', schema)
