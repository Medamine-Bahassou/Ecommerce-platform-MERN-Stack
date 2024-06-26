import React, { useState } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";
import { ImagetoBase64 } from '../utility/imagetoBase64';
import toast from 'react-hot-toast';

const Newproduct = () => {

  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: ""
  })

  const handleOnchange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)
    
    const {name, image, category, price} = data 

    if(name && image && category && price ){
      const fetchData = await fetch(`${process.env.REACT_APP_SEREVR_DOMAIN}/uploadProduct`, {
        method : "POST",
        headers : {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
  
      const fetchRes = await fetchData.json()
      
      console.log(fetchRes)  
      toast(fetchRes.message)

      setData(()=>{
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: ""      
        }
      })
    }
    else{
      toast("Enter required fields")
    }

  }

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0])
    // console.log(data)

    setData((preve) => {
      return {
        ...preve,
        image: data
      }
    })


  }



  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type={"text"} id='name' name='name' className='bg-slate-200 p-1 my-1' onChange={handleOnchange} value={data.name} />

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnchange} value={data.category} >
          <option value={"other"} >Select category </option>
          <option value={"Fruits"}>Fruits</option>
          <option value={"Vegetables"}>Vegetables</option>
          <option value={"Icream"}>Icream</option>
          <option value={"Dosa"}>Dosa</option>
          <option value={"Pizza"}>Piza</option>
        </select>

        <label htmlFor='image'>Image
          <div className='h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer '>
            {data.image ? <img src={data.image} className='h-full ' /> :
              <span className='text-5xl'><IoCloudUploadOutline /></span>
            }
            <input type={"file"} id='image' accept='image/*' className='hidden' onChange={uploadImage} />
          </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type={'text'} className='bg-slate-200 p-1 my-1' name='price' onChange={handleOnchange} value={data.price} />

        <label htmlFor='description'>Description</label>
        <textarea rows={2} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnchange} value={data.description} ></textarea>

        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-bold font-medium my-2 drop-shadow '>Save</button>
      </form>
    </div>
  )
}

export default Newproduct
