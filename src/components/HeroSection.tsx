import Link from 'next/link'
import React from 'react'

const HeroSection = () => {

  return (
    <section id='home' className='w-full hero'>
        <div className="hero-content">
            <h1>Bringing Hope to Those Who Need It Most</h1>
            <p>Supporting war-affected civilians worldwide with essential aid, regardless of nationality or conflict. Every donation brings comfort, safety, and hope to families in crisis.</p>
            <div className="hero-cta">
                <button className="cta-primary">
                  <Link 
                      href="/#donation"
                  >
                      Donate Now
                  </Link>
                </button>
                
                <button className="cta-secondary">
                  <Link 
                      href="/#about" 
                  >
                      Learn More
                  </Link>
                </button>
            </div>
        </div>
    </section>
  )
}

export default HeroSection