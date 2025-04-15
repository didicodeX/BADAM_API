import mongoose  from "mongoose";

//Connexion de mon application a ma BD
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connexion reussie😍');
    } catch (error) {
        console.log('Connexion echouee😒');
        
    }
}

export default connectDB();