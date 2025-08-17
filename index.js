const {initializeDatabase} = require('./db/db.connect');
const Hotel = require('./models/hotel.models');
const express = require('express')
const app = express();
app.use(express.json());


initializeDatabase();

// const newHotel = {
//   name: "Sunset Resort",
//   category: "Resort",
//   location: "12 Main Road, Anytown",
//   rating: 4.0,
//   reviews: [],
//   website: "https://sunset-example.com",
//   phoneNumber: "+1299655890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "11:00 AM",
//   amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
//   priceRange: "$$$$ (61+)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: true,
//   isSpaAvailable: true,
//   isHotelAvailable: true,
//   photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
// };

const createHotel = async(newHotel) =>{
    try{
        const hotel = new Hotel(newHotel);
        const saveHotel = await hotel.save();
        console.log("Hotel has been created successfully", saveHotel);
        return saveHotel;
        
    }
    catch(error){
        console.log("Error creating Hotel:", error);
        throw error; // rethrow the error for further handling if needed
    }
}

app.post('/hotels',async (req,res)=>{
    try{
        const savedHotel = await createHotel(req.body);
        res.status(201).json({message: "Successfully added hotel", hotel: savedHotel});
    }
    catch{
        res.status(400).json({error: "Error creating hotel"})
    }
})

//createHotel(newHotel);


// find a movie with a particular title

const readMovieByTitle = async (movieTitle) =>{
    try{
        const movie = await Movie.findOne({title: movieTitle});
        console.log(movie);
        
    }
    catch(error){
        throw error
    }
}


// readMovieByTitle("Dilwale Dulhania Le Jayenge");


// to get all the hotels in a database

const readAllHotels = async() =>{
    try{
        const allHotels = await Hotel.find();
        console.log(allHotels);
        
    }
    catch(error){
        console.log(error);
        
    }
}

// readAllHotels();



// get Hotel  by name

const readHotelByName = async (HotelName) =>{
    try{
        const HotelByName = await Hotel.findOne({name: HotelName});

        console.log(HotelByName);
        
    }
    catch(error){
        throw error;
    }
}


// readHotelByName("Lake View");



const readHotelByParkingSpace = async (parkingSpaceNeededVal) =>{
    try{
        const hotelByParking = await Hotel.find({isParkingAvailable: parkingSpaceNeededVal});

        console.log(hotelByParking);
        
    }
    catch(error){
        throw error;
    }
}


// readHotelByParkingSpace(true);

// ead all Hotels by cuisine ("Italian"). 

const readHotelsByRestaurantAvailability = async (isRestaurant) =>{
    try{
        const HotelsByRestaurant = await Hotel.find({isRestaurantAvailable: isRestaurant});

        console.log(HotelsByRestaurant);
        
    }
    catch(error){
        throw error;
    }
}


// readHotelsByRestaurantAvailability(true);



// ead all Hotels by category ("Italian"). 

const readHotelsByCat = async (hotelCat) =>{
    try{
        const HotelsByRestaurant = await Hotel.find({category: hotelCat});

        console.log(HotelsByRestaurant);
        
    }
    catch(error){
        throw error;
    }
}


// readHotelsByCat("Mid-Range");


// read all Hotels by price 

const readHotelsByPrice = async (hotelPrice) =>{
    try{
        const HotelsByPrice = await Hotel.find({priceRange: hotelPrice});

        console.log(HotelsByPrice);
        
    }
    catch(error){
        throw error;
    }
}


// readHotelsByPrice("$$$$ (61+");



// ead all Hotels by category ("Italian"). 

const readHotelsByRating = async (hotelRating) =>{
    try{
        const HotelsByRestaurant = await Hotel.find({rating: hotelRating});

        console.log(HotelsByRestaurant);
        
    }
    catch(error){
        throw error;
    }
}


// readHotelsByRating(4.0);


// ead all Hotels by category ("Italian"). 

const readHotelsByPhoneNum = async (hotelNum) =>{
    try{
        const HotelsByPhoneNum = await Hotel.find({phoneNumber: hotelNum});

        console.log(HotelsByPhoneNum);
        
    }
    catch(error){
        throw error;
    }
}

const deleteHotelById = async(hotelId) =>{
    try{
        const deletedRestaurant = await Hotel.findByIdAndDelete(hotelId);
        console.log(deletedRestaurant);
        return deletedRestaurant;
    }
    catch(error){
        console.log("Failed to delete hotel");
        
    }
    
    
}

app.delete('/hotels/:hotelId', async (req, res)=>{
    try{
        const deletedHotel = await deleteHotelById(req.params.hotelId);
        if(deletedHotel){
            res.status(200).json({message: "The hotel has been deleted", hotel: deletedHotel})
        }
    }
    catch(error){
        res.status(500).json({error: 'Failed to delete hotel'});
    }

})

const updateRating = async(id, dataToUpdate) =>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(id, dataToUpdate, {new: true});
    console.log(updatedHotel);
    return updatedHotel;
    }
    catch(error){
        console.log(error);
        
    }
    
}

app.post('/hotels/:hotelId', async(req,res)=>{
    try{
        const updatedHotel = await updateRating(req.params.hotelId, req.body);
        if(updatedHotel){
            res.status(200).json({message: "Hotel has been updated", hotel: updatedHotel})
        }
        else{
            res.status(404).json({error: "An error has occcured"})
        }
    }
    catch(error){
        res.status(500).json({error: "An error has occcured"})
    }
    
})


// readHotelsByPhoneNum("+1299655890");

const PORT = 3000;

app.listen(PORT,()=>{
    console.log("Application is up and running and listening at port", PORT);
    
})
