import React, { useRef, useState } from 'react'
import { toast } from 'sonner';
import z from 'zod/v4'


const donationSchema = z.object({
    frequency: z.enum(['one-time', 'monthly']),
    amount: z.string().trim().refine(v => /^\d+(\.\d{1,2})?$/.test(v) && Number(v) >= 25, "Enter an amount of at least $25"),
    fullName: z.string().min(1, "Full name is required").trim(),
    email: z.email("Invalid email address").trim(),
});


export type DonationFormData = z.infer<typeof donationSchema>;


const DonationSection = () => {

    const amountRef = useRef<HTMLInputElement>(null);

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

        toast.info("Demo only: no payment was taken.");

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
                <p>Choose an amount and a donation frequency to try the donation flow. This is a demo: no payment is taken.</p>
            </div>

            <form className='donation-form' onSubmit={e => e.preventDefault()}>
                <div className="donation-type">
                    <label>
                        <input type="radio" name="frequency" onChange={handleChange} value="one-time" checked={data.frequency === 'one-time'} />
                        One-time donation
                    </label>
                    <label>
                        <input type="radio" name="frequency" onChange={handleChange} value="monthly" checked={data.frequency === 'monthly'} />
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
                        id='amount'
                        ref={amountRef}
                        type="text" 
                        name="amount" 
                        value={data.amount} 
                        placeholder="Enter amount" 
                        onChange={handleChange}
                        inputMode='decimal'
                    />
                    {fieldError.amount && <p className='text-xs text-red-300'>{fieldError.amount}</p>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input id='fullName' type="text" name="fullName" value={data.fullName} onChange={handleChange} />
                    {fieldError.fullName && <p className='text-xs text-red-300'>{fieldError.fullName}</p>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input id='email' type="email" name="email" value={data.email} onChange={handleChange} />
                    {fieldError.email && <p className='text-xs text-red-300'>{fieldError.email}</p>}
                </div>
                
                <button type="submit" className="submit-btn" onClick={() => handleSubmit(data)}>Submit demo donation</button>
                
                <p className="text-center mt-4 text-sm text-(--form-footer)">
                    Demo only: no payment is taken and no receipt is sent.
                </p>
            </form>
        </div>
    </section>
  )
}

export default DonationSection