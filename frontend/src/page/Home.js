import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../component/HomeCard'
import { useSelector } from 'react-redux'
import CardFeatures from '../component/CardFeatures'
import { GrNext, GrPrevious } from "react-icons/gr";
import FilterProduct from '../component/FilterProduct';
import AllProduct from '../component/AllProduct';

const Home = () => {

  const productData = useSelector((state) => state.product.productList)

  const homeProductCardList = productData.slice(0, 4)
  const homeProductCardListVegetables = productData.filter(el => el.category === "Vegetables", [])

  const loadinArray = new Array(4).fill(null)
  const loadinArrayFeatures = new Array(10).fill(null)

  const slideProductRef = useRef()
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200
  }

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200
  }




  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2 '>

        <div className='md:w-1/2 '>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Bike Deleviry</p>
            <img src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png' className='h-7' />
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>The Fasted Deliver in <span className='text-red-600'>Your Home</span></h2>
          <p className='py3 text-base '>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.</p>
          <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'>Order Now</button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          {
            homeProductCardList[0] ? homeProductCardList.map(el => {
              return (
                <HomeCard
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              )
            })
              : loadinArray.map((el, index) => {
                return (
                  <HomeCard
                    key={index}
                    loading={"Loading ..."}
                  />
                )
              })
          }
        </div>
      </div>
      <div className=''>
        <div className='flex w-full items-center'>
          <h2 className='font-bold text-2xl text-slate-800 mb-4'>
            Frech Vegetables
          </h2>
          <div className='ml-auto flex gap-5'>
            <button className='bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded ' onClick={preveProduct}><GrPrevious /></button>
            <button className='bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded ' onClick={nextProduct}><GrNext /></button>
          </div>
        </div>
        <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
          {
            homeProductCardListVegetables[0] ? homeProductCardListVegetables.map(el => {
              return (
                <CardFeatures
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  category={el.category}
                  image={el.image}
                  price={el.price}
                />
              )
            })
              :
              loadinArrayFeatures.map((el, index) => <CardFeatures loading="Loading ..." key={index}/>)
          }
        </div>
      </div>

      <AllProduct heading={"Your Product"} />

    </div>
  )
}

export default Home
