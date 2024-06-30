import React, { useEffect, useState } from 'react'
import FilterProduct from './FilterProduct';
import CardFeatures from './CardFeatures';
import { useSelector } from 'react-redux';

const AllProduct = ({ heading }) => {
    const productData = useSelector((state) => state.product.productList)

    const categoryList = [...new Set(productData.map(el => el.category))]

    // filter data display 
    const [filterby, setFilterBy] = useState("")
    const [dataFilter, setDataFilter] = useState([])

    useEffect(() => {
        setDataFilter(productData)
    }, [productData])

    const handleFilterProduct = (category) => {
        setFilterBy(category)
        const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase())
        setDataFilter(() => {
            return [
                ...filter
            ]
        })
    }

    const loadinArrayFeatures = new Array(10).fill(null)

    return (
        <div>
            <div className='my-5'>
                <h2 className='font-bold text-2xl text-slate-800 mb-4'>
                    {heading}
                </h2>

                <div className='flex gap-4 justify-center overflow-scroll scrollbar-none'>
                    {
                        categoryList[0] ? categoryList.map(el => {
                            return (
                                <FilterProduct category={el} key={el} isActive={el.toLowerCase() === filterby.toLowerCase() } onClick={() => handleFilterProduct(el)} />
                            );
                        })
                        :
                        <div className='min-h-[150px] flex justify-center items-center '>
                            <p>Loading ...</p>
                        </div>

                    }
                </div>
            </div>

            <div className='flex flex-wrap justify-center gap-4'>
                {
                    dataFilter[0] ? dataFilter.map(el => {
                        return (
                            <CardFeatures
                                key={el._id+"allProduct"}
                                id={el._id}
                                image={el.image}
                                name={el.name}
                                category={el.category}
                                price={el.price}
                            />
                        )
                    })
                    :
                    loadinArrayFeatures.map((el, index) => <CardFeatures loading="Loading ..." key={index+"Loading"} />)

                }
            </div>

        </div>

    )
}

export default AllProduct
