import Link from 'next/link'

const HeroSection = () => {

  return (
    <section id='home' className='w-full hero mt-[92px] sm:mt-[76px] h-[calc(100dvh-92px)] sm:h-[calc(100dvh-76px)] text-center'>
        <div className="hero-content h-full flex flex-col justify-center gap-5">
            <h1>A Demo Donation Platform</h1>
            <p>A portfolio project with a donation flow, a contact form and admin-managed content. The organisation is fictional and no payments are taken.</p>
            <div className="hero-cta">
                <button className="cta-primary">
                  <Link 
                      href="/#donation"
                  >
                      Try the Demo
                  </Link>
                </button>
                
                <button className="cta-secondary">
                  <Link 
                      href="/#about" 
                  >
                      About the Project
                  </Link>
                </button>
            </div>
        </div>
    </section>
  )
}

export default HeroSection