const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!!')
    })
    .catch(err => {
        console.log('ERROR, MONGO CONNECTION!!!')
        console.log(err)
    })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
});


const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: "657e3e0584739f32e921c831",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: '  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique impedit blanditiis et nihil quasi aliquid in beatae repellat tempore vero, sunt expedita placeat amet ratione alias eligendi? Vel, quam accusantium.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            image: [
                {
                  url: 'https://res.cloudinary.com/dcrnsjlxv/image/upload/v1702881354/YelpCamp/i27nm77o6xw9wyvhxmna.jpg',
                  filename: 'YelpCamp/i27nm77o6xw9wyvhxmna',
                  _id: '657fe8501d9496419f0eda76'
                },
                {
                  url: 'https://res.cloudinary.com/dcrnsjlxv/image/upload/v1702881359/YelpCamp/lqfivwcddeiya3gtxael.jpg',
                  filename: 'YelpCamp/lqfivwcddeiya3gtxael',
                  _id: '657fe8501d9496419f0eda77'
                }
              ],
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})