import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'


type Blogs = {
    title: string,
    desc: string,
    image: string,
}[]

const blogsData: Blogs = [
    {
        title: 'Scent of all beginnings - part 1',
        desc: 'Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. ',
        image: '/blog/subimg1.svg'
    },
    {
        title: 'Skin care - Mandatory Touch Up',
        desc: 'Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. ',
        image: '/blog/subimg2.svg'
    },
    {
        title: 'Does Hair trim affects people’s perception',
        desc: 'Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. ',
        image: '/blog/subimg3.svg'
    },
]

const BlogsPage = () => {
    return (
        <main className='min-h-screen  w-full'>
            <div className='w-11/12 mx-auto min-h-screen'>
                {/* image section */}
                <section className='mt-4'>
                    <Image
                        src={'/blog/hero.svg'}
                        alt='hero section image'
                        width={100}
                        height={100}
                        className='w-full h-full rounded-2xl'
                    />
                </section>

                <section>
                    <div className='flex w-11/12 mx-auto gap-x-4 mt-4  justify-between items-center'>
                        <div>
                            <Image
                                src={"/blog/image1.svg"}
                                alt='image 1'
                                width={1}
                                height={1}
                                className='w-full h-full rounded-xl'
                            />
                        </div>
                        <div>
                            <Image
                                src={"/blog/image2.svg"}
                                alt='image 1'
                                width={1}
                                height={1}
                                className='w-full h-full rounded-xl'
                            />
                        </div>
                    </div>
                </section>

                <section className='mt-10'>
                    {
                        blogsData.map((service, index) => (
                            <div key={index} className="border rounded-lg p-4 bg-white">
                                <div className="flex items-center gap-4">
                                    <div className="shrink-0">
                                        <Image
                                            src={service.image || "/placeholder.svg"}
                                            alt={service.title}
                                            width={150}
                                            height={150}
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center gap-y-3 items-start">
                                        <h3 className="font-bold text-lg">{service.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {service.desc}
                                        </p>
                                        <Button className='flex bg-gray-200' variant={'outline'}>
                                            Button
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </section>
            </div>
        </main>
    )
}

export default BlogsPage