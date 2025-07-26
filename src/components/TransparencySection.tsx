'use client'

import { useLayoutContext } from '@/context/LayoutContext'
import React from 'react'

const TransparencySection = () => {

    const { setReports } = useLayoutContext();
    
  return (
    <section id='transparency' className="transparency-section">
        <div className="container">
            <div className="section-header">
                <h2>Transparency & Financial Reports</h2>
                <p>We believe in complete transparency. See exactly how your donations are used and the impact they create.</p>
            </div>
            <div className="transparency-grid">
                <div className="transparency-card">
                    <h3>2024 Financial Summary</h3>
                    <div className="financial-stats">
                        <div className="stat-item">
                            <span className="stat-number">87%</span>
                            <span className="stat-label">Program Services</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">8%</span>
                            <span className="stat-label">Administration</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">5%</span>
                            <span className="stat-label">Fundraising</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">$2.4M</span>
                            <span className="stat-label">Total Raised</span>
                        </div>
                    </div>
                    <p>87 cents of every dollar goes directly to helping war-affected civilians.</p>
                </div>
                
                <div className="transparency-card">
                    <h3>Independent Audits</h3>
                    <p>Our finances are independently audited annually by certified public accountants to ensure the highest standards of accountability.</p>
                    <ul className='my-4'>
                        <li>2024 Independent Audit Report</li>
                        <li>2023 Independent Audit Report</li>
                        <li>2022 Independent Audit Report</li>
                    </ul>
                    <button className="download-btn cursor-pointer" onClick={() => setReports('audit report')}>View Audit Reports</button>
                </div>
                
                <div className="transparency-card">
                    <h3>Impact Metrics</h3>
                    <div className="financial-stats">
                        <div className="stat-item">
                            <span className="stat-number">12,450</span>
                            <span className="stat-label">People Helped</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">3,200</span>
                            <span className="stat-label">Families Sheltered</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">890</span>
                            <span className="stat-label">Medical Treatments</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">15</span>
                            <span className="stat-label">Countries Served</span>
                        </div>
                    </div>
                    <button className="download-btn cursor-pointer" onClick={() => setReports('impact report')}>View Impact Report</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default TransparencySection