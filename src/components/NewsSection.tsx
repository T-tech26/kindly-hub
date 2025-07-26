import React from 'react'
import NewsArticle from './NewsArticle'
import { NewsFeeds } from '@/constants/newsFeeds'
import { useDataContext } from '@/context/DataContext'
import { getSmartDateDisplay } from '@/lib/utils'

const NewsSection = () => {

    const { news } = useDataContext();

  return (
    <section id='news' className="news-section">
        <div className="container">
            <div className="section-header">
                <h2>News & Media</h2>
                <p>Stay updated on our humanitarian efforts and the latest developments in our mission</p>
            </div>
            <div className="news-grid">
                {news.length > 0 && news.map(feed => (
                    <NewsArticle 
                        key={feed.$id}
                        img={feed.image}
                        releaseDate={getSmartDateDisplay(feed.date)}
                        heading={feed.title}
                        description={feed.summary}
                        link={`/news?news=${feed.$id}`}
                    />
                ))}
            </div>
        </div>
    </section>
  )
}

export default NewsSection