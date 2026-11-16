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
                {successStories.map((story) => (
                    <div className="story-card" key={story.$id}>
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