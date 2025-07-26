import React from 'react'


const MissionSection = () => {

  return (
    <section id='about' className='mission'>
      <div className="container">
          <div className="section-header">
              <h2>Our Mission</h2>
              <p>We provide humanitarian aid to civilians affected by conflict, offering support without discrimination based on nationality, religion, or political affiliation.</p>
          </div>
          <div className="impact-grid">
              <div className="impact-card">
                  <div className="impact-icon">🏠</div>
                  <h3>Emergency Shelter</h3>
                  <p>Providing safe, temporary housing for displaced families seeking refuge from conflict zones.</p>
              </div>
              <div className="impact-card">
                  <div className="impact-icon">🍽️</div>
                  <h3>Food & Water</h3>
                  <p>Delivering essential nutrition and clean water to communities facing food insecurity.</p>
              </div>
              <div className="impact-card">
                  <div className="impact-icon">⚕️</div>
                  <h3>Medical Care</h3>
                  <p>Offering life-saving medical treatment and healthcare services to those in need.</p>
              </div>
              <div className="impact-card">
                  <div className="impact-icon">💪</div>
                  <h3>Emotional Support</h3>
                  <p>Providing counseling and psychological support to help heal trauma and rebuild lives.</p>
              </div>
          </div>
        </div>
    </section>
  )
}

export default MissionSection