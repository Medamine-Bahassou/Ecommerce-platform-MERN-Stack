import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AllProduct from '../component/AllProduct'
import { addCartItems } from '../redux/productSlice'

const Menu = () => {
  const { filterby } = useParams()
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product.productList)

  const productDisplay = productData.filter((el) => el._id === filterby)[0]
  console.log(productDisplay)

  const handleAddCartProduct = (e) => {
    dispatch(addCartItems(productDisplay))
}

  return (
    <div className='p-2 md:p-4'>
      <div className='w-full max-w-4xl m-auto md:flex bg-white '>
        <div className='max-w-sm overflow-hidden h-full p-5 '>
          <img src={productDisplay.image} className='hover:scale-105 transition-all' />
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='font-semibold text-slate-600  capitalize text-2xl text-4xl '>{productDisplay.name}</h3>
          <p className=' text-slate-400 font-medium text-2xl'>{productDisplay.category}</p>
          <p className=' font-bold text-2xl'><span>{productDisplay.price}</span><span className='text-red-500'> MAD</span></p>
          <div className='flex gap-3'>
            <button className='bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px] '>Buy</button>
            <button onClick={handleAddCartProduct} className='bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px] '>Add Cart</button>
          </div>
          <div >
            <p className='text-slate-600 font-medium'>Description : </p>
            <p>{productDisplay.description} </p>
          </div>
        </div>
      </div>
      
      <AllProduct heading={"Related Product"}/>

    </div>
  )
}

export default Menu
