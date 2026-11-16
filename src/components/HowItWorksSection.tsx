import React from 'react'

const HowItWorksSection = () => {


  return (
    <section id='how-it-works' className="how-it-helps">
        <div className="container">
            <div className="section-header">
                <h2>How the Demo Works</h2>
                <p>The steps a donor would follow on this site. Nothing is charged.</p>
            </div>
            <div className="help-items">
                <div className="help-item">
                    <div className="help-item-icon">1</div>
                    <p>Choose a preset amount or enter your own.</p>
                </div>
                <div className="help-item">
                    <div className="help-item-icon">2</div>
                    <p>Enter your name and email. Every field is validated before it submits.</p>
                </div>
                <div className="help-item">
                    <div className="help-item-icon">3</div>
                    <p>Submit to see a confirmation. No payment is taken.</p>
                </div>
                <div className="help-item">
                    <div className="help-item-icon">4</div>
                    <p>Use the contact form to send a real message to the project inbox.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HowItWorksSection