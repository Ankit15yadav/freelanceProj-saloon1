import { Heart, ShoppingBag, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

type Items = {
    id: number,
    title: string,
    price: string,
    off: string,
    rating: string,
    reviews: string,
    image: string
}

const BestSellerCard = (item: Items) => {
    return (
        <div className="relative h-[550px] w-[409px] bg-white rounded-t-full border-b-2 shadow-lg">
            <div
                className="absolute left-1/2 transform -translate-x-1/2 h-[170px] w-[350px] flex items-center justify-center rounded-t-full bg-[#E5ABAB]"
                style={{ top: "20px" }}
            />
            <div className="absolute left-8 top-[200px] w-[350px]  px-4 flex justify-between items-center">
                <Image src={item.image} alt='image'
                    height={338}
                    width={195}
                    className='absolute left-16 '
                />
                <div className='flex flex-col '>
                    <span>10% </span>
                    <span>off</span>
                </div>

                <div className="h-[50px] w-[50px] border-2 rounded-full flex items-center justify-center">
                    <Heart size={20} />
                </div>
            </div>

            <div className=' absolute bottom-0 w-[350px] left-6'>
                <div className='font-bold'>
                    {item.title}
                </div>
                <div className='flex gap-x-3 mt-3 items-center justify-between'>
                    <div className='flex gap-x-3 items-center justify-center'>
                        <span className='font-bold text-xl'>
                            {item.price}
                        </span>
                        <span className='font-medium line-through text-md'>
                            {item.off}
                        </span>
                    </div>
                    <div className='flex gap-x-2 items-center justify-center'>
                        <div className='flex gap-x-2'>
                            <Star className='text-yellow-400' />
                            {item.rating}
                        </div>
                        <div className='flex gap-x-1 text-sm text-gray-500'>
                            <span>
                                {item.reviews}
                            </span>
                            <span>
                                reviews
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex gap-x-2 mt-4 pb-4'>
                    <Button className='w-full h-[58px] bg-[#FEFEF6] border border-[#ED474A] hover:bg-[#FEFEE7] text-gray-500 rounded-full'>
                        Add to Cart
                    </Button>
                    <div className=' h-[50px] w-[60px] rounded-full bg-black flex items-center justify-center'>
                        <ShoppingBag size={20} className='text-white' />
                    </div>
                </div>
            </div>

        </div>


    )
}

export default BestSellerCard