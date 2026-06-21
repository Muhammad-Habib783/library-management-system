const books = [
  {
    title: '1984',
    author: 'George Orwell',
    price: 14.99,
    isbn: '9780451524935',
    publishedDate: '1949-06-08',
    category: 'Dystopian',
    description: 'A haunting vision of totalitarianism, surveillance, and the power of ideology.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 16.5,
    isbn: '9780061120084',
    publishedDate: '1960-07-11',
    category: 'Fiction',
    description: 'A powerful novel about justice, race, and childhood in the American South.',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&auto=format&fit=crop&q=80',
    available: false
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 15,
    isbn: '9780743273565',
    publishedDate: '1925-04-10',
    category: 'Classic',
    description: 'A tragic story of opulence, ambition, and love during the Roaring Twenties.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 13.99,
    isbn: '9780062315007',
    publishedDate: '1988-05-01',
    category: 'Philosophy',
    description: 'A spiritual journey of discovery, destiny, and personal legend.',
    coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 18.99,
    isbn: '9780735211292',
    publishedDate: '2018-10-16',
    category: 'Self Help',
    description: 'A practical guide to building good habits and breaking bad ones through small changes.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=80',
    available: false
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    price: 17.5,
    isbn: '9780399590504',
    publishedDate: '2018-02-20',
    category: 'Memoir',
    description: 'The story of a young woman who leaves her survivalist family to pursue education.',
    coverImage: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'The Night Circus',
    author: 'Erin Morgenstern',
    price: 16.5,
    isbn: '9780307744432',
    publishedDate: '2011-09-13',
    category: 'Fantasy',
    description: 'A magical tale of two young illusionists bound by a mysterious competition.',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    price: 19.99,
    isbn: '9780756404741',
    publishedDate: '2007-03-27',
    category: 'Fantasy',
    description: 'The first book in a fantasy epic narrated by a legendary adventurer.',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    price: 15.5,
    isbn: '9781250301697',
    publishedDate: '2019-02-05',
    category: 'Thriller',
    description: 'A psychological thriller about a woman who stops speaking after a violent act.',
    coverImage: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    price: 22,
    isbn: '9780062316097',
    publishedDate: '2011-09-04',
    category: 'History',
    description: 'A sweeping history of humankind from the Stone Age to the modern age.',
    coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=80',
    available: false
  },
  {
    title: 'Becoming',
    author: 'Michelle Obama',
    price: 24,
    isbn: '9781524763138',
    publishedDate: '2018-11-13',
    category: 'Biography',
    description: 'A memoir by the former first lady on her life, career, and values.',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'The Lean Startup',
    author: 'Eric Ries',
    price: 18,
    isbn: '9780307887894',
    publishedDate: '2011-09-13',
    category: 'Business',
    description: 'A methodology for building effective startups using rapid experimentation.',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&auto=format&fit=crop&q=80',
    available: false
  },
  {
    title: 'The Power of Habit',
    author: 'Charles Duhigg',
    price: 17.5,
    isbn: '9780812981605',
    publishedDate: '2012-02-28',
    category: 'Business',
    description: 'A science-based guide to understanding why habits form and how to change them.',
    coverImage: 'https://images.unsplash.com/photo-1496104679563-338ad4b2371a?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    price: 20,
    isbn: '9780441172719',
    publishedDate: '1965-08-01',
    category: 'Science Fiction',
    description: 'A science fiction epic about politics, power, and the desert planet Arrakis.',
    coverImage: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    price: 18,
    isbn: '9780307454546',
    publishedDate: '2005-08-01',
    category: 'Mystery',
    description: 'A suspenseful thriller about a journalist and a hacker investigating a disappearance.',
    coverImage: 'https://images.unsplash.com/photo-1524982708047-f07ab24b19d3?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'The Road',
    author: 'Cormac McCarthy',
    price: 14.5,
    isbn: '9780307387899',
    publishedDate: '2006-09-26',
    category: 'Post-Apocalyptic',
    description: 'A bleak, beautiful novel following a father and son across a ravaged landscape.',
    coverImage: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=500&auto=format&fit=crop&q=80',
    available: false
  },
  {
    title: 'The Art of War',
    author: 'Sun Tzu',
    price: 12.5,
    isbn: '9781590302255',
    publishedDate: '1910-01-01',
    category: 'Philosophy',
    description: 'An ancient treatise on military strategy and leadership wisdom.',
    coverImage: 'https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    price: 16,
    isbn: '9780062457714',
    publishedDate: '2016-09-13',
    category: 'Self Help',
    description: 'A counterintuitive guide to finding meaning by caring less about more.',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'Lean In',
    author: 'Sheryl Sandberg',
    price: 17.5,
    isbn: '9780385349949',
    publishedDate: '2013-03-11',
    category: 'Business',
    description: 'Advice for women navigating leadership, ambition, and workplace challenges.',
    coverImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    price: 18.5,
    isbn: '9780743269513',
    publishedDate: '1989-08-15',
    category: 'Self Help',
    description: 'A classic guide to personal and professional effectiveness.',
    coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&auto=format&fit=crop&q=80',
    available: false
  },
  {
    title: 'Ready Player One',
    author: 'Ernest Cline',
    price: 16.5,
    isbn: '9780307887444',
    publishedDate: '2011-08-16',
    category: 'Science Fiction',
    description: 'A fast-paced novel about a virtual reality treasure hunt in a dystopian future.',
    coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'The Handmaid\'s Tale',
    author: 'Margaret Atwood',
    price: 17,
    isbn: '9780385490818',
    publishedDate: '1985-08-17',
    category: 'Dystopian',
    description: 'A harrowing story of totalitarian control and the fight for freedom.',
    coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'The Invisible Life of Addie LaRue',
    author: 'V.E. Schwab',
    price: 18.5,
    isbn: '9780765387561',
    publishedDate: '2020-10-06',
    category: 'Fantasy',
    description: 'A haunting novel about a woman who makes a bargain to live forever and be forgotten.',
    coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&auto=format&fit=crop&q=80',
    available: true
  },
  {
    title: 'The Martian',
    author: 'Andy Weir',
    price: 16.99,
    isbn: '9780553418026',
    publishedDate: '2014-02-11',
    category: 'Science Fiction',
    description: 'A gripping survival story of an astronaut stranded on Mars.',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&auto=format&fit=crop&q=80',
    available: false
  }
];

module.exports = { books };