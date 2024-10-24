const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

console.log(process.env.UNSPLASH_KEY);

app.get('/', (req, res) =>{

    axios.get('https://api.unsplash.com/photos/random/?query=landscape&count=10&client_id=' + process.env.UNSPLASH_KEY)
    .then((response) =>{
        response.data.forEach((value)=> {
            console.log(value.location.position);
        });
        let filteredArr = response.data.filter((value, index) => {
            console.log(value);
            if (value.location.position.latitude || value.location.position.longitude) {
                return true;
            } else {
                return false;
            }
        });
        filteredArr.forEach((value)=> {
            console.log(value.location.position);
        });
       
        var imageData = filteredArr.map((image) => {
            return {
                image_url: image.urls.regular,
                location_name: image.location.name,
                latitude: image.location.position.latitude,
                longitude: image.location.position.longitude
            }
        })

        res.send(imageData);
    }).catch((error)=> {
        console.log('error handled');
        res.send([]);
    });

});

app.listen(3010, ()=>{
    console.log('http://localhost:3010');
})