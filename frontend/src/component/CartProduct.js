import React from 'react'
import { LuPlus, LuMinus } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteCartItems, increaseQty, decreaseQty } from '../redux/productSlice'; 

const CartProduct = ({ id, name, image, category, qty, total, price }) => {

    const dispatch = useDispatch()


    return (
        <div className='bg-slate-200 p-2 flex gap-3 rounded border border-slate-300'>
            <div className='p-3 bg-white rounded overflow-hidden '>
                <img src={image} className='h-28 w-40 object-cover ' />
            </div>
            <div className='flex flex-col gap-1 w-full'>
                <div className='flex justify-between'>
                    <h3 className='font-semibold text-slate-600  capitalize text-lg text-xl '>{name}</h3>
                    <div className='cursor-pointer text-slate-700 hover:text-red-500' onClick={()=>dispatch(deleteCartItems(id))}>
                        <MdDelete />
                    </div>
                </div>
                <p className=' text-slate-400 font-medium '>{category}</p>
                <p className=' font-bold text-base'><span>{price}</span><span className='text-red-500'> MAD</span></p>

                <div className='flex justify-between '>
                    <div className='flex gap-3 items-center'>
                        <button className='bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1  ' onClick={()=>dispatch(increaseQty(id))}><LuPlus /></button>
                        <p className='font-semibold'>{qty}</p>
                        <button onClick={()=>dispatch(decreaseQty(id))} className='bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 '><LuMinus /></button>
                    </div>


                    <div className='flex items-center gap-2 font-bold text-slate-700'>
                        <p>Total :</p>
                        <p>{total}</p>
                        <p className='text-red-500'>MAD</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartProduct
