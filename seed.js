const faker = require("faker");
const mongoose = require("mongoose");
const _ = require("lodash");
const User = require("./models/User");
const Event = require("./models/Event");
const Artist = require("./models/Artist");

const db = require("./config/keys").mongoURI;
mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch((err) => console.log(err));

function seed() {
  const artists = [];
  
  
  // for (let i = 0; i < 20; i++) {
  //   let username = faker.internet.userName();
  //   let email = faker.internet.email();
  //   let password = faker.internet.password();
  //   const user = new User({
  //     username: `${username}`,
  //     email: `${email}`,
  //     password: `$${password}`,
  //   });
  //   User.collection.insertOne(user);
  // }

  for (let i = 0; i < 6; i++) {
    let imageurl = faker.image.avatar();
    let solo = faker.name.findName();
    let artistname = `${solo}`;
    let email = faker.internet.email();
    let password = faker.internet.password();
    let genres = ['None', 'Custom', 'Alternative Rock', 'Ambient', 'Classical', 'Country', 'Dance & EDM', 'Dancehall', 'Deep House', 'Disco', 'Drum & Bass', 'Dubstep', 'Electronic', 'Folk & Singer-Songwriter', 'Hip-hop & Rap', 'House', 'Indie', 'Jazz & Blues', 'Latin', 'Metal', 'Piano', 'Pop', 'R&B & Soul', 'Reggae', 'Reggaeton', 'Rock', 'Soundtrack', 'Techno', 'Trance', 'Trap', 'Triphop', 'World'];
    let genre = _.sample(genres);
    let bio = `Hello from ${artistname}! Consider this page your portal for some of the best ${genre} music around. We’re super excited to be a part of the DistanSing family, and we’re stoked you can finally experience our live music from the comfort of your own home during this challenging time. Check out our upcoming events!`
    
    let artist = new Artist({
      artistname: `${artistname}`,
      email: `${email}`,
      password: `${password}`,
      bio: `${bio}`,
      imageurl: `${imageurl}`,
      genre: `${genre}`
    });
    artists.push(artist)
    Artist.collection.insertOne(artist)
  }

  const current_date = new Date
  const month = current_date.getMonth() + 1
  const day = current_date.getDate() + 7
  const year = current_date.getFullYear()
  for (let i = 0; i < 6; i++) {
    let artist = _.sample(artists);
    let artistId = artist._id;
    let artistname = artist.artistname;
    let adjectives = ["Awesome", "Insane", "Poppin", "Lit", "Once-In-A-Lifetime"]
    let events = ["Palooza", "Party", "Celebration", "Jamboree", "Festival"]
    let adj = _.sample(adjectives);
    let event_name = _.sample(events);
    let name = `Join ${artistname} at the ${adj} ${event_name}`
    let date = current_date;
    const month_name = date.toString().slice(4, 7);

    let description = `Check out ${artistname} streaming to you live on ${month_name} ${day}th. Get your ticket now and come back to the event page at start time to tune in live!`
    let price = faker.random.number({
      min: 10,
      max: 50,
    });
    // let imageurl = `${faker.image.nightlife()}?random=${Date.now()}`;

    let event = new Event({
      name: `${name}`,
      description: `${description}`,
      date: `$${date}`,
      artist: artistId,
      price: price,
      imageurl: artist.imageurl
    });
    // console.log(event)
    Event.collection.insertOne(event)
  }

  let CXCW = new Event({
    name: "Couch By Couchwest Festival",
    description:
      "Couch by Couchwest is an annual conglomeration of social distancing, human welfare, and music festivals organized jointly by DistanSing Corporation. It launched in 2020 in order to showcase the frontend skills of its organizers.",
    date: faker.date.between(
      `${year}-0${month}-${day}`,
      `${year}-0${month}-${day + 1}`
    ),
    artist: "5ed72c0810435f4933a2a981",
    price: 130,
    imageurl: "https://distansing-dev.s3-us-west-1.amazonaws.com/SXSW.png",
  });
  let EDC = new Event({
    name: "Electric DistanSing Carnival",
    description:
      "Electric DistanSing Carnival, commonly known as EDC, is the largest virtual electronic dance music festival in the world. The annual flagship event is now held weekly, put on by The Demo Artists.",
    date: faker.date.between(
      `${year}-0${month}-${day}`,
      `${year}-0${month}-${day + 1}`
    ),
    artist: "5ed7247de51f52f959016c5e",
    price: 350,
    imageurl:
      "https://distansing-dev.s3-us-west-1.amazonaws.com/ElectricDaisyLogo-1024x463.png",
  });
  let Quaranchella = new Event({
    name: "Quaranchella",
    description:
      "The Quaranchella Valley Music and Arts Festival is an weekly music and arts festival held on the world's greatest virtual concert site based out of San Francisco, California. It was co-founded by Danny Huang, Glen Park, Darrick Yong, and TJ McCabe and has stood a monument to their humble beginnings ever since.",
    date: faker.date.between(
      `${year}-0${month}-${day}`,
      `${year}-0${month}-${day + 1}`
    ),
    artist: "5ed72c0810435f4933a2a981",
    price: 400,
    imageurl:
      "https://distansing-dev.s3-us-west-1.amazonaws.com/Quaranchella.jpg",
  });
  let CageCoach = new Event({
    name: "CageCoach Festival",
    description:
      "The Cagecoach Festival is one of the biggest country music festivals in the world, taking place weekly on the DistanSing webapp. It is both a celebration of country music and software engineering skills.",
    date: faker.date.between(
      `${year}-0${month}-${day}`,
      `${year}-0${month}-${day + 1}`
    ),
    artist: "5ed7247de51f52f959016c5e",
    price: 300,
    imageurl: "https://distansing-dev.s3-us-west-1.amazonaws.com/Cagecoach.png",
  });
  let EZ = new Event({
    name: "Electric Zoom Festival",
    description:
      "Electric Zoom is a weekly electronic music festival held virtually on the DistanSing webapp. The festival represents all genres of electronic music, bringing top international DJs and live acts from multiple countries to four stages.",
    date: faker.date.between(
      `${year}-0${month}-${day}`,
      `${year}-0${month}-${day + 1}`
    ),
    artist: "5ed7247de51f52f959016c5e",
    price: 240,
    imageurl:
      "https://distansing-dev.s3-us-west-1.amazonaws.com/electriczoom.png",
  });
  let splash_seeds = [CXCW, EZ, CageCoach, EDC, Quaranchella]
  Event.collection.insert(splash_seeds)
}

module.exports = seed;
