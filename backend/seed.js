const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const { books } = require('./seedData');

dotenv.config();

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    const existingCount = await Book.countDocuments();
    if (existingCount > 0) {
      console.log(`Database already has ${existingCount} books. Seed aborted.`);
      process.exit(0);
    }

    await Book.insertMany(books);
    console.log(`Seeded ${books.length} books into the database.`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedBooks();