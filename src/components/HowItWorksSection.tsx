import React from 'react'

const HowItWorksSection = () => {


  return (
    <section id='how-it-works' className="how-it-helps">
        <div className="container">
            <div className="section-header">
                <h2>How Your Donation Helps</h2>
                <p>Every contribution makes a direct impact on the lives of those affected by conflict</p>
            </div>
            <div className="help-items">
                <div className="help-item">
                    <div className="help-item-icon">$25</div>
                    <p>Provides emergency food supplies for a family for one week</p>
                </div>
                <div className="help-item">
                    <div className="help-item-icon">$50</div>
                    <p>Supplies clean water and sanitation for 10 people for one month</p>
                </div>
                <div className="help-item">
                    <div className="help-item-icon">$100</div>
                    <p>Covers medical treatment and supplies for emergency care</p>
                </div>
                <div className="help-item">
                    <div className="help-item-icon">$250</div>
                    <p>Provides temporary shelter materials for a displaced family</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HowItWorksSection