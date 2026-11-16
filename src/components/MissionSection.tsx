import React from 'react'


const MissionSection = () => {

  return (
    <section id='about' className='mission'>
      <div className="container">
          <div className="section-header">
              <h2>About This Project</h2>
              <p>What this demo includes and how it's built.</p>
          </div>
          <div className="impact-grid">
              <div className="impact-card">
                  <div className="impact-icon">🏠</div>
                  <h3>Donation form</h3>
                  <p>Amount, frequency and donor details are validated with Zod before submitting.</p>
              </div>
              <div className="impact-card">
                  <div className="impact-icon">🍽️</div>
                  <h3>Contact form</h3>
                  <p>Sends a real email through Resend using an handlebars template.</p>
              </div>
              <div className="impact-card">
                  <div className="impact-icon">⚕️</div>
                  <h3>Managed content</h3>
                  <p>News and stories are stored in Appwrite and managed from a separate admin dashboard.</p>
              </div>
              <div className="impact-card">
                  <div className="impact-icon">💪</div>
                  <h3>Responsive layout</h3>
                  <p>Works from phone to desktop, with a slide-in mobile menu.</p>
              </div>
          </div>
        </div>
    </section>
  )
}

export default MissionSection