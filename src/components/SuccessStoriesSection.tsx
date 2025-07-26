import { useDataContext } from '@/context/DataContext'
import React from 'react'


const SuccessStoriesSection = () => {

    const { successStories } = useDataContext();

  return (
    <section id='stories' className="py-20">
        <div className="container">
            <div className="section-header">
                <h2>Stories of Hope</h2>
                <p>Real impact from real people whose lives have been touched by your generosity</p>
            </div>
            <div className="story-grid">
                {successStories.slice(0, 3).map((story, index) => (
                    <div className="story-card" key={index}>
                        <blockquote>{story.testimonial}</blockquote>
                        <p className="story-author">— {story.name} {story.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default SuccessStoriesSection