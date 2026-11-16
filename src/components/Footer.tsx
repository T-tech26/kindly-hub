import Link from 'next/link';
import React from 'react'
import Image from 'next/image';

const Footer = () => {

  return (
    <footer className="footer">
        <div className="container">
            <div className="footer-content flex flex-col sm:flex-row justify-between">
                <div className="footer-section max-w-xs">
                    <h3>About Kindly Hub</h3>
                    <p>A demo donation site built as a portfolio project with Next.js, TypeScript and Appwrite. The organisation and its content are fictional.</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link href="/#about" className="text-base">About</Link></li>
                        <li><Link href="/#how-it-works" className="text-base">How it works</Link></li>
                        <li><Link href="/#news" className="text-base">Recent News</Link></li>
                        <li><Link href="/#contact" className="text-base">Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Legal</h3>
                    <Link href="/legal-information" className="text-base">Demo Notice</Link>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Kindly Hub. Demo project for portfolio purposes. Not a registered organisation.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer