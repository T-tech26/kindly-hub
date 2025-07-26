import { useDataContext } from '@/context/DataContext';
import React, { useRef, useState } from 'react'
import z from 'zod/v4'


const donationSchema = z.object({
    frequency: z.enum(['one-time', 'monthly']),
    amount: z.string().min(1, "Amount must be at least $25").trim(),
    fullName: z.string().min(1, "Full name is required").trim(),
    email: z.email("Invalid email address").trim(),
});


export type DonationFormData = z.infer<typeof donationSchema>;


const DonationSection = () => {

    const amountRef = useRef<HTMLInputElement>(null);

    const { setDonation } = useDataContext();

    const [data, setData] = useState<DonationFormData>({
        frequency: 'one-time',
        amount: '',
        fullName: '',
        email: '',
    });
    const [fieldError, setFieldError] = useState<Record<string, string>>({});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData(prev => ({ ...prev, [name]: value}));
    };


    const addSetAmount = (amount: string) => {
        setData(prev => ({ ...prev, amount: amount}));
    };



    const handleSubmit = (formData: DonationFormData) => {

        const result = donationSchema.safeParse(formData);

        if(!result.success) {
            const errorObject: Record<string, string> = {};

            const errors = result.error.issues;

            errors.forEach(issue => {
                errorObject[String(issue.path[0])] = issue.message;
            });

            setFieldError(errorObject);
            return;
        };

        setFieldError({});

        setDonation(result.data);

        setData({
            frequency: 'one-time',
            amount: '',
            fullName: '',
            email: '',
        });
    }


  return (
    <section id='donation' className="donation-section">
        <div className="container">
            <div className="section-header">
                <h2>Make a Donation</h2>
                <p>Your support directly impacts lives. Choose an amount and donation frequency that works for you.</p>
            </div>

            <form className='donation-form' onSubmit={e => e.preventDefault()}>
                <div className="donation-type">
                    <label>
                        <input type="radio" name="frequency" onChange={handleChange} value="one-time" checked />
                        One-time donation
                    </label>
                    <label>
                        <input type="radio" name="frequency" onChange={handleChange} value="monthly" />
                        Monthly donation
                    </label>
                </div>

                <div className="donation-amounts">
                    <button type="button" className="amount-btn" data-amount="25" onClick={() => addSetAmount('25')}>$25</button>
                    <button type="button" className="amount-btn" data-amount="50" onClick={() => addSetAmount('50')}>$50</button>
                    <button type="button" className="amount-btn" data-amount="100" onClick={() => addSetAmount('100')}>$100</button>
                    <button type="button" className="amount-btn" data-amount="250" onClick={() => addSetAmount('250')}>$250</button>
                    <button type="button" className="amount-btn" data-amount="500" onClick={() => addSetAmount('500')}>$500</button>
                    <button type="button" className="amount-btn" data-amount="custom" onClick={() => amountRef.current?.focus()}>Custom</button>
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Donation Amount ($)</label>
                    <input 
                        ref={amountRef}
                        type="text" 
                        name="amount" 
                        value={data.amount} 
                        placeholder="Enter amount" 
                        onChange={handleChange}
                    />
                    {fieldError.amount && <p className='text-xs text-red-300'>{fieldError.amount}</p>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name="fullName" value={data.fullName} onChange={handleChange} />
                    {fieldError.fullName && <p className='text-xs text-red-300'>{fieldError.fullName}</p>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={data.email} onChange={handleChange} />
                    {fieldError.email && <p className='text-xs text-red-300'>{fieldError.email}</p>}
                </div>
                
                <button type="submit" className="submit-btn" onClick={() => handleSubmit(data)}>Complete Donation</button>
                
                <p className="text-center mt-4 text-sm text-(--form-footer)">
                    Your donation is secure and will be processed immediately. You&apos;ll receive a confirmation email with your tax-deductible receipt.
                </p>
            </form>
        </div>
    </section>
  )
}

export default DonationSection