import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface NewsArticleProps {
    img: string;
    releaseDate: string;
    heading: string;
    description: string;
    link: string;
}

const NewsArticle = ({
    img, releaseDate, heading, description, link
}: NewsArticleProps ) => {

  return (
    <article className="news-card">
        <div className="news-image">
          <Image
            src={img}
            width={1000}
            height={1000}
            alt='News featured image'
            className='size-full'
          />
        </div>
        <div className="news-content">
            <div className="news-date">{releaseDate}</div>
            <h3 className="news-title">{heading}</h3>
            <p className="news-excerpt">{description}</p>
            <Link href={link} className="news-link">Read more →</Link>
        </div>
    </article>
  )
}

export default NewsArticle