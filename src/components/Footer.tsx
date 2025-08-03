import Link from 'next/link';
import React from 'react'
import Image from 'next/image';

const Footer = () => {

  return (
    <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About Kindly Hub</h3>
                    <p>A humanitarian organization dedicated to supporting war-affected civilians worldwide, providing essential aid regardless of nationality or political affiliation.</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link href="/#about" className="text-base">About</Link></li>
                        <li><Link href="/#how-it-works" className="text-base">How it works</Link></li>
                        <li><Link href="/#transparency" className="text-base">Financial Reports</Link></li>
                        <li><Link href="/#news" className="text-base">Recent News</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Socials/Contact</h3>
                    <ul>
                        <li>
                            <Link href="https://threads.com/@kindly_hub" target='_blank' className="text-base">
                                <Image 
                                    src="/threads.svg" 
                                    alt="Threads Logo" 
                                    width={30} 
                                    height={30} 
                                    className="inline-block mr-2" 
                                />
                                Threads
                            </Link>
                        </li>
                        <li>
                            <Link href="https://instagram.com/kindl_yhub/?utm_source=qr&r=nametag" target='_blank' className="text-base">
                                <Image 
                                    src="/instagram.svg" 
                                    alt="Instagram Logo" 
                                    width={30} 
                                    height={30} 
                                    className="inline-block mr-2" 
                                />
                                Instagram
                            </Link>
                        </li>
                        <li>
                            <Link href="https://facebook.com/share/1HxhdsxSvp/?mibextid=wwXIfr" target='_blank' className="text-base">
                                <Image 
                                    src="/facebook.svg" 
                                    alt="Facebook Logo" 
                                    width={30} 
                                    height={30} 
                                    className="inline-block mr-2" 
                                />
                                Facebook
                            </Link>
                        </li>
                        <li><Link href="/#contact" className="text-base">Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Legal</h3>
                    <ul>
                        <li><Link href="/legal-information?document=privacy-policy" className="text-base">Privacy Policy</Link></li>
                        <li><Link href="/legal-information?document=refund-policy" className="text-base">Refund Policy</Link></li>
                        <li><Link href="/legal-information?document=terms-of-use" className="text-base">Terms of Use</Link></li>
                        <li><Link href="/legal-information?document=cookie-policy" className="text-base">Cookie Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Kindly Hub. All rights reserved. | Registered 501(c)(3) Organization</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer