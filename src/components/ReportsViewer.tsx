'use client'

import React from 'react'
import Image from 'next/image';
import { useLayoutContext } from '@/context/LayoutContext';


const ReportsViewer = () => {

    const { reports, setReports } = useLayoutContext();

    if (reports === 'impact report') {
       return (
            <section className='w-full h-screen fixed top-0 left-0'>
                <Image 
                    height={30}
                    width={30}
                    src={'close-icon-blue.svg'}
                    alt='close'
                    className='cursor-pointer absolute top-16 right-6'
                    onClick={() => setReports('')}
                />

                <iframe
                    src="/reports/KindlyHub_2024_Impact_Report.pdf"
                    className='w-full h-screen'
                    title="Impact Report"
                />
            </section>
       )
    }

    return (
        <section className='w-full h-screen fixed top-0 left-0'>
            <Image 
                height={30}
                width={30}
                src={'close-icon-blue.svg'}
                alt='close'
                className='cursor-pointer absolute top-16 right-6'
                onClick={() => setReports('')}
            />

            <iframe
                src="/reports/KindlyHub_Donation_Audit_Report_2022_2024.pdf"
                className='w-full h-screen'
                title="Donation Audit Report"
            />
        </section>
    )
}

export default ReportsViewer