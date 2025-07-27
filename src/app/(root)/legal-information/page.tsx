'use client'

export const dynamic = 'force-dynamic';

import Page from '@/components/NewsPage';
import React, { Suspense } from 'react'

const Loading = () => {
    return (
        <section className="legal-section">
            <div className="container">

                <div className="section-header">
                    <h2>Legal Information</h2>
                    <p>Important legal documents and policies governing our operations and your interaction with our services</p>
                </div>

                <div className="legal-content">
                    <div className="legal-nav">
                        <button 
                            className={
                                `legal-tab text-[.8rem]`
                            } 
                        >Privacy Policy
                        </button>

                        <button 
                            className={
                                `legal-tab text-[.8rem]`
                            }
                        >Terms of Use
                        </button>

                        <button 
                            className={
                                `legal-tab text-[.8rem]`
                            } 
                        >Cookie Policy
                        </button>

                        <button 
                            className={
                                `legal-tab text-[.8rem]`
                            }
                        >Refund Policy
                        </button>
                    </div>

                    <p className='text-3xl'>Loading...</p>
                </div>  
            </div>
        </section>
    )
}


const SuspenseWrapper = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Page />
        </Suspense>
    )
}

export default SuspenseWrapper