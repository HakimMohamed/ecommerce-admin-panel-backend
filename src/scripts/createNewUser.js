require('dotenv').config();
const mongoose = require('mongoose');

async function generatePermissions() {
  await mongoose.connect(process.env.MONGODB_URI);
  const connection = mongoose.connection;
  const db = connection.db;

  const bcrypt = require('bcryptjs');

  const user = {
    email: 'iabdelhakimmohamed@gmail.com',
    name: {
      first: 'Abdelhakim',
      last: 'Mohamed',
    },
    password: bcrypt.hash('123456', 10),
  };

  await db.collection('Users').insertOne(user);

  process.exit();
}

generatePermissions();
