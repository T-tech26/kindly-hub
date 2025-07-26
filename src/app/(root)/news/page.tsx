'use client'

import { useDataContext } from '@/context/DataContext';
import { getSmartDateDisplay } from '@/lib/utils';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const page = () => {

    const params = useSearchParams();

    const newsId = params.get('news');

    const { news } = useDataContext();

    const neededNews = news.find(news => news.$id === newsId);
    
  return (
    <section className="legal-section">
        <div className="container">
            {neededNews !== undefined && (
                <Image
                    src={neededNews?.image!}
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

export default page