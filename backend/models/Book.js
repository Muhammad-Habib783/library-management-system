const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  isbn: { type: String, required: true, unique: true },
  publishedDate: { type: Date, required: true },
  category: { type: String, default: 'General' },
  description: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);