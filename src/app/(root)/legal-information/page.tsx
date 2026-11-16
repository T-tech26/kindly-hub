const Page = () => {

  return (
    <section className="legal-section">
        <div className="container">

            <div className="section-header">
                <h2>Demo Notice</h2>
            </div>

            <div className="legal-content">
                
                <div className="legal-document">
                    <h3>What this is</h3>
                    <p>Kindly Hub is a portfolio project. The organisation and its content are fictional. Link to the GitHub repo.</p>
                </div>
                
                <div className="legal-document">
                    <h3>Donations</h3>
                    <p>The donation form doesn’t take payments, and doesn’t store or send the details you enter.</p>
                </div>
                
                <div className="legal-document">
                    <h3>Contact form</h3>
                    <p>If you send a message, your name, email, phone number and message are emailed to the project inbox through Resend. This site doesn’t store them in a database. Please don’t send sensitive information.</p>
                </div>

                <div className="legal-document">
                    <h3>Cookies</h3>
                    <p>This site doesn't use analytics or advertising cookies</p>
                </div>
            </div>
          </div>
    </section>
  )
}

export default Page