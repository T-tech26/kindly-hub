import { useDataContext } from '@/context/DataContext'
import React from 'react'


const SuccessStoriesSection = () => {

    const { successStories } = useDataContext();

  return (
    <section id='stories' className="py-20">
        <div className="container">
            <div className="section-header">
                <h2>Sample Feedback</h2>
                <p>Fictional sample entries that show how stories are displayed. Not real people.</p>
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