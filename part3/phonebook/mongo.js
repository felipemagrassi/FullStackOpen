const mongoose = require('mongoose');

if (process.argv.length < 3) {
  // eslint-disable-next-line
  console.log('Please provide the password as an argument: node mongo.js <password> <user> <number> ');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://felipemagrassi:${password}@cluster0.rtxpe.mongodb.net/phonebook-app?retryWrites=true`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length >= 5) {
  const username = process.argv[3];
  const phone = process.argv[4];
  const person = new Person({
    name: username,
    number: phone,
  });

  person.save().then(() => {
    // eslint-disable-next-line
    console.log(`added ${username} number ${phone} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      // eslint-disable-next-line
      console.log(person);
    });
    mongoose.connection.close();
  });
}
