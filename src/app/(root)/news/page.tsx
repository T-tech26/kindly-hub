'use client'

import { useDataContext } from '@/context/DataContext';
import { getSmartDateDisplay } from '@/lib/utils';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'

const Page = () => {

    const params = useSearchParams();

    const newsId = params.get('news');

    const { news } = useDataContext();

    const neededNews = news.find(news => news.$id === newsId);
    
  return (
    <section className="legal-section">
        <div className="container">
            {neededNews !== undefined && (
                <Image
                    src={neededNews?.image}
                    width={1000}
                    height={1000}
                    alt='featured image'
                    className='w-auto h-auto rounded-lg'
                />
            )}

            <h1 className='py-5 mt-10 text-3xl'>{neededNews !== undefined && neededNews.title}</h1>

            <p className='text-xs text-gray-400'>{neededNews !== undefined && getSmartDateDisplay(neededNews.date)}</p>

            <p className='mt-5'>{neededNews !== undefined && neededNews.content}</p>
        </div>
    </section>
  )
}


const Loading = () => {
    return (
        <div className='w-full h-screen flex-1 flex justify-center items-center'>
            <h1 className='text-3xl text-(--primary-blue)'>Loading...</h1>
        </div>
    )
}


const SuspenseWrapper = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Page />
        </Suspense>
    )
}

export default SuspenseWrapper