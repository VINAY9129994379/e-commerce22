const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const connectDB = require('./config/mongodb'); // Import MongoDB connection
const connectCloudinary = require('./config/cloudinary'); // Adjust the path as necessary
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');


const app = express();
const port = process.env.PORT || 4000;   

// Connect to MongoDB
connectDB();

// Connect to Cloudinary
connectCloudinary(); // Call the Cloudinary connection function


app.use(express.json()); // Parse JSON bodies 
app.use(cors()); // Enable CORS


app.use('/api/user',userRouter)
app.use('/api/product', productRouter)

// Basic route
app.get('/', (req, res) => {
    res.send('API working');    
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);  
});


////gUHFCWSVzQBXeGyS
//