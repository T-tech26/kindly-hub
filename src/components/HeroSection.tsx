import Link from 'next/link'

const HeroSection = () => {

  return (
    <section id='home' className='w-full hero mt-[92px] sm:mt-[76px] h-[calc(100dvh-92px)] sm:h-[calc(100dvh-76px)] text-center'>
        <div className="hero-content h-full flex flex-col justify-center gap-5">
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