const { v2: cloudinary } = require('cloudinary');
const productModel = require('../models/productModel');

const addProduct = async (req, res) => {
    try {
      const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

      // Assuming you're using a middleware like multer to handle file uploads
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];

      // Filter undefined images
      const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

      // Upload images to Cloudinary
      const imageUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
          return result.secure_url;
        })
      );

      // Prepare product data
      const productData = {
        name,
        description,
        category,
        price: Number(price),
        subCategory,
        bestseller: bestseller === "true" ? true : false,
        sizes: JSON.parse(sizes),
        image: imageUrl,
        date: Date.now()
      };

      // Debugging logs
      console.log(productData);
      console.log(imageUrl);

      // Save product to database
      const product = new productModel(productData);
      await product.save();

      // Send the success response and return to prevent further code execution
      return res.json({ success: true, message: "Product added successfully" });

    } catch (error) {
      console.error(error);
      
      // Send error response
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};


  

const listProduct=async(req,res)=>{

  try{
    const products=await productModel.find({});
    res.json({success:true,products})

  }
  catch(error){
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
    
}

const removeProduct=async(req,res)=>{

  try{
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"product Removed"})

  }
  catch(error){
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
    
}

const singleProduct=async(req,res)=>{

  try{

    const {productId}=req.body
     const product=await productModel.findById(productId)
     res.json({success:true,product})
  }
  catch(error){
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });


  }
    
}

module.exports = {
    addProduct,
    listProduct,
    removeProduct,
    singleProduct,
};