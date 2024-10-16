import { useState } from 'react'
import { assets } from '../assets/assets'
import './Add.css'
import axios from 'axios'
import { BackendUrl } from '../App'
function Add() {

  const[image1,setImage1]=useState(false)
  const[image2,setImage2]=useState(false)
  const[image3,setImage3]=useState(false)
  const[image4,setImage4]=useState(false)
  const[name,setName]=useState("");
  const[description,setDescription]=useState("");
  const[price,setPrice]=useState("");
  const[category,setCategory]=useState("");
  const[subCategory,setSubCategory]=useState("");
  const[bestseller,setBestseller]=useState("");
  const[sizes,setSizes]=useState("");


  const submitHandler= async (e) =>{

       e.preventDefault();
       try{
        const form =neew formData()
        
        formData.append("name",name)
        formData.append("description",description)
        formData.append("price",price)
        formData.append("category",category)
        formData.append("subCategory",subCategory)
        formData.append("bestseller",bestseller)
        formData.append("sizes",JSON.stringify(sizes))

        image1 && formData.append("image1",image1)
        image2 && formData.append("image2",image2)
        image3 && formData.append("image3",image3)
        image4 && formData.append("image4",image4)


        const response=await axios.post(BackendUrl+ "api/product/add" ,formData,{headers:{token}})

        console.log(response.data)

       }
       catch(error){

       }
  }
  
  

  return (
    <div className="add">
      <form onSubmit={submitHandler} className='form-contain'>
        <p>Upload Image</p>
        <div className='image-collection'>
          <label className='form-collection' htmlFor='image1'>
            <img src={!image1 ? assets.upload_area: URL.createObjectURL(image1)} alt=''/>
            <input onChange={(e)=>setImage1(e.target.files)} type='file' id='image1' hidden/>

          </label>
          <label className='form-collection' htmlFor='image2'>
            <img src={!image2 ? assets.upload_area: URL.createObjectURL(image2)} alt=''/>
            <input onChange={(e)=>setImage2(e.target.files)} 
             type='file' id='image2' hidden/>

          </label>
          <label className='form-collection' htmlFor='image1'>
            <img src={!image3 ? assets.upload_area: URL.createObjectURL(image3)} alt=''/>
            <input onChange={(e)=>setImage3(e.target.value)} type='file' id='image1' hidden/>

          </label>
          <label className='form-collection' htmlFor='image1'>
            <img src={!image4 ? assets.upload_area: URL.createObjectURL(image4)} alt=''/>
            <input onChange={(e)=>setImage4(e.target.files)} type='file' id='image1' hidden/>

          </label>

        </div>
        
        <div className='product name'>
          <p>Product Name</p>
          <input onChange={(e)=>setName(e.target.value)}
          value={name} type='text' placeholder='your text..'/>

        </div>
        <div className='product description'>
          <p>Product Description</p>
          <textarea onChange={(e)=>setDescription(e.target.value)}
          value={description} type='text' placeholder='your text..'/>

        </div>
        <div className='product-category'>

          <div className='category-contain'>
            <p>Product category</p>
            <select onChange={(e)=>setCategory(e.target.value)} className='category-dropdown'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>

          </div>
          
          <div className='subCategory-contain'> 
            <p>Product category</p>
            <select onChange={(e)=>setSubCategory(e.target.value)} className='dropdown-subcategory'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winderwear">Winterwear</option>
            </select>

          </div>
          
       
        </div>
        <div className='product-price'>
            <p>Product Price</p>
            <input onChange={(e)=>setPrice(e.target.value)} value={price} type='Number' placeholder='25' />

          </div>

          <div className='product-size'>
            <p>Poduct Sizes</p>
            <div className='sizes-contain'>
              <div onClick={()=>setSizes(prev=>prev.includes("S") ? prev.filter(item=>item !== "S"):[...prev,"S"])} className='sizes'>
                <p  className={`${sizes.includes("S") ? "bg-pink-100" :"bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
              </div>
              <div onClick={()=>setSizes(prev=>prev.includes("M") ? prev.filter(item=>item !== "M"):[...prev,"M"])} className='sizes'>
                <p className={`${sizes.includes("M") ? "bg-pink-100" :"bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
              </div>
              <div onClick={()=>setSizes(prev=>prev.includes("L") ? prev.filter(item=>item !== "L"):[...prev,"L"])} className='sizes'>
                <p className={`${sizes.includes("L") ? "bg-pink-100" :"bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
              </div>
              <div onClick={()=>setSizes(prev=>prev.includes("XL") ? prev.filter(item=>item !== "XL"):[...prev,"XL"])} className='sizes'>
                <p className={`${sizes.includes("XL") ? "bg-pink-100" :"bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
              </div>
              <div onClick={()=>setSizes(prev=>prev.includes("XXL") ? prev.filter(item=>item !== "XXL"):[...prev,"XXL"])} className='sizes'>
                <p className={`${sizes.includes("XXL") ? "bg-pink-100" :"bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
              </div>
            </div>
          </div>

<div className='bestseller'>
  <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller} type='checkbox' id='bestseller' />
  <label htmlFor='bestseller'>Add to bestseller</label>

</div>

<button className='add-btn'>ADD</button>


      </form>

    </div>
  )
}

export default Add