
const mongoose  = require('mongoose');
const listingSchema  = require('../models/listing');
const sampledata = require('./data');

main().
then(()=>{
    console.log('database is connected');
})
.catch((err)=>{
    console.log(err);
})


async function main() {

    await mongoose.connect('mongodb://127.0.0.1:27017/travelstay');
  
  }

  let image  = ['https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600' , 'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' ,'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' , 'https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' , 'https://www.pexels.com/photo/view-of-tourist-resort-338504/' , 'https://www.pexels.com/photo/architectural-photography-of-three-pink-blue-and-yellow-buildings-347141/' , 'https://www.pexels.com/photo/two-brown-wooden-outdoor-chairs-271815/' , 'https://www.pexels.com/photo/two-brown-wooden-outdoor-chairs-271815/' , 'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=600' , 'https://www.pexels.com/photo/photo-of-villa-under-purple-sky-2525899/'];
  console.log(image.length);

  const update = async () => {

    const url = await listingSchema.distinct("image");
   

    for (let i = 0; i < image.length; i++) {
        const result = await listingSchema.updateOne({ image : url[i]}, { image: image[i] });
        console.log('image is updated');
    }
}

update();


