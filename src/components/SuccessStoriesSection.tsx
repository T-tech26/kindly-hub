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
                        <blockquote>"The emergency shelter program gave my family safety when we had nowhere else to turn. We're now rebuilding our lives with hope for the future."</blockquote>
                        <p className="story-author">— {story.name} {story.description}</p>
                    </div>
                ))}
                {/* <div className="story-card">
                    <blockquote>"The medical aid I received saved my daughter's life. I can never thank the donors enough for their kindness and generosity."</blockquote>
                    <p className="story-author">— Ahmed, Father of Two</p>
                </div>
                <div className="story-card">
                    <blockquote>"The counseling support helped me process my trauma and find strength to help others in my community who are struggling."</blockquote>
                    <p className="story-author">— Elena, Survivor and Volunteer</p>
                </div> */}
            </div>
        </div>
    </section>
  )
}

export default SuccessStoriesSection