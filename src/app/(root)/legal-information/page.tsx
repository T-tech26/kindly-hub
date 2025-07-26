'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'

const Page = () => {

    const params = useSearchParams();
    const router = useRouter();

    const legalDocument = params.get('document');

    const [active, setActive] = useState('');


    useEffect(() => {
        if (legalDocument) {
            setActive(legalDocument);
        }
    }, [legalDocument]);

    const handleUrlChange = (doc: string) => {
        const searchParams = new URLSearchParams(params.toString());
        searchParams.set('document', doc);
        router.replace(`?${searchParams.toString()}`);
    }

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
                            `legal-tab text-[.8rem] ${active === 'privacy-policy' ? 'active' : legalDocument === 'privacy-policy' ? 'active' : ''}`
                        } 
                        onClick={() => handleUrlChange('privacy-policy')}>Privacy Policy
                    </button>

                    <button 
                        className={
                            `legal-tab text-[.8rem] ${active === 'terms-of-use' ? 'active' : legalDocument === 'terms-of-use' ? 'active' : ''}`
                        } 
                        onClick={() => handleUrlChange('terms-of-use')}>Terms of Use
                    </button>

                    <button 
                        className={
                            `legal-tab text-[.8rem] ${active === 'cookie-policy' ? 'active' : legalDocument === 'cookie-policy' ? 'active' : ''}`
                        } 
                        onClick={() => handleUrlChange('cookie-policy')}>Cookie Policy
                    </button>

                    <button 
                        className={
                            `legal-tab text-[.8rem] ${active === 'refund-policy' ? 'active' : legalDocument === 'refund-policy' ? 'active' : ''}`
                        } 
                        onClick={() => handleUrlChange('refund-policy')}>Refund Policy
                    </button>
                </div>
                
                {active === 'privacy-policy' && (
                    <div className="legal-document">
                        <h3>Privacy Policy</h3>
                        <p><strong>Last Updated:</strong> January 1, 2025</p>
                        
                        <h4>1. Information We Collect</h4>
                        <p>Kindly Hub is committed to protecting your privacy. We collect information you provide directly to us, such as when you make a donation, sign up for our newsletter, or contact us.</p>
                        
                        <h4>Types of Information Collected:</h4>
                        <ul>
                            <li>Personal identifiers (name, email address, phone number)</li>
                            <li>Financial information (payment details for donations)</li>
                            <li>Communication preferences</li>
                            <li>Website usage data through cookies and analytics</li>
                        </ul>
                        
                        <h4>2. How We Use Your Information</h4>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Process your donations and provide receipts</li>
                            <li>Send you updates about our humanitarian work</li>
                            <li>Improve our website and services</li>
                            <li>Comply with legal and regulatory requirements</li>
                        </ul>
                        
                        <h4>3. Information Sharing</h4>
                        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with:</p>
                        <ul>
                            <li>Payment processors to handle donations</li>
                            <li>Service providers who help us operate our website</li>
                            <li>Legal authorities when required by law</li>
                        </ul>
                        
                        <h4>4. Data Security</h4>
                        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                        
                        <h4>5. Your Rights</h4>
                        <p>You have the right to access, update, or delete your personal information. Contact us at privacy@hopebridge.org to exercise these rights.</p>
                        
                        <h4>6. Contact Information</h4>
                        <p>
                        For questions about this Privacy Policy, contact us at:<br />
                        Email: privacy@hopebridge.org<br />
                        Address: 123 Humanitarian Way, City, State 12345
                        </p>
                    </div>
                )}
                
                {active === 'terms-of-use' && (
                    <div className="legal-document">
                        <h3>Terms of Use</h3>
                        <p><strong>Last Updated:</strong> January 1, 2025</p>
                        
                        <h4>1. Acceptance of Terms</h4>
                        <p>By accessing and using the Kindly Hub website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                        
                        <h4>2. Use License</h4>
                        <p>Permission is granted to temporarily download one copy of the materials on Kindly Hub&apos;s website for personal, non-commercial transitory viewing only.</p>
                        
                        <h4>3. Donations</h4>
                        <p>All donations made through this website are:</p>
                        <ul>
                            <li>Voluntary contributions to Kindly Hub&apos;s humanitarian mission</li>
                            <li>Tax-deductible to the extent allowed by law</li>
                            <li>Used for general humanitarian purposes unless specified otherwise</li>
                            <li>Final and non-refundable except in cases of error or fraud</li>
                        </ul>
                        
                        <h4>4. Prohibited Uses</h4>
                        <p>You may not use our website:</p>
                        <ul>
                            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                            <li>To transmit or procure the sending of any advertising or promotional material without our prior written consent</li>
                            <li>To impersonate or attempt to impersonate the organization or its employees</li>
                        </ul>
                        
                        <h4>5. Disclaimer</h4>
                        <p>The materials on Kindly Hub&apos;s website are provided on an &apos;as is&apos; basis. Kindly Hub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                        
                        <h4>6. Limitations</h4>
                        <p>In no event shall Kindly Hub or its suppliers be liable for any damages arising out of the use or inability to use the materials on Kindly Hub&apos;s website.</p>
                        
                        <h4>7. Contact Information</h4>
                        <p>Questions about the Terms of Use should be sent to us at legal@hopebridge.org.</p>
                    </div>
                )}
                
                {active === 'cookie-policy' && (
                    <div className="legal-document">
                        <h3>Cookie Policy</h3>
                        <p><strong>Last Updated:</strong> January 1, 2025</p>
                        
                        <h4>What Are Cookies</h4>
                        <p>Cookies are small text files that are stored on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and improving our website&apos;s functionality.</p>
                        
                        <h4>Types of Cookies We Use</h4>
                        <ul>
                            <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                            <li><strong>Marketing Cookies:</strong> Used to deliver relevant content and track advertising effectiveness</li>
                        </ul>
                        
                        <h4>Managing Cookies</h4>
                        <p>You can control and manage cookies in your browser settings. Please note that removing or blocking cookies may impact your user experience and parts of our website may no longer be fully accessible.</p>
                        
                        <h4>Third-Party Cookies</h4>
                        <p>We may use third-party services like Google Analytics that place cookies on your device. These services have their own privacy policies governing their use of cookies.</p>
                    </div>
                )}
                
                {active === 'refund-policy' && (
                    <div className="legal-document">
                        <h3>Refund Policy</h3>
                        <p><strong>Last Updated:</strong> January 1, 2025</p>
                        
                        <h4>General Policy</h4>
                        <p>Kindly Hub is committed to using all donations for humanitarian purposes. Due to the immediate nature of our aid work, donations are generally non-refundable.</p>
                        
                        <h4>Refund Eligibility</h4>
                        <p>Refunds may be considered in the following circumstances:</p>
                        <ul>
                            <li>Technical errors that result in duplicate charges</li>
                            <li>Fraudulent use of your payment method</li>
                            <li>Donations made in error with immediate notification (within 24 hours)</li>
                        </ul>
                        
                        <h4>How to Request a Refund</h4>
                        <p>To request a refund, contact us within 30 days of your donation at:</p>
                        <ul>
                            <li>Email: refunds@hopebridge.org</li>
                            <li>Phone: 1-800-HOPE-123</li>
                            <li>Include your donation confirmation number and reason for the refund request</li>
                        </ul>
                        
                        <h4>Processing Time</h4>
                        <p>Approved refunds will be processed within 5-10 business days to the original payment method.</p>
                        
                        <h4>Recurring Donations</h4>
                        <p>Recurring donations can be cancelled at any time by contacting us or logging into your donor account. Cancellation will prevent future charges but does not refund previous donations.</p>
                    </div>
                )}
            </div>
          </div>
    </section>
  )
}


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