import { contactEmail } from '@/lib/action';
import { ContactSchema } from '@/lib/schemas';
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';
import z from 'zod';

export type ContactFormData = z.infer<typeof ContactSchema>;

const ContactSection = () => {

    const [data, setData] = useState<ContactFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
        privacy: false
    });
    const [loading, setLoading] = useState(false);
    const [fieldError, setFieldError] = useState<Record<string, string>>({});



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if(name === 'privacy') {
            const input = e.target as HTMLInputElement;
            setData(prev => ({ ...prev, [name]: input.checked }));
            return;
        }

        setData(prev => ({ ...prev, [name]: value }));
    };



    const handleSubmit = async (formData: ContactFormData) => {
        setLoading(true);
        const result = ContactSchema.safeParse(formData);

        if(!result.success) {
            const errorObject: Record<string, string> = {};

            const errors = result.error.issues;

            errors.forEach(issue => {
                errorObject[String(issue.path[0])] = issue.message
            });

            setFieldError(errorObject);
            setLoading(false);
            return;
        }

        setFieldError({});

        const data = await contactEmail(result.data);

        if(data.status === 'success') {
            setData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                subject: 'general',
                message: '',
                privacy: false
            });

            toast.success(data.message);
            setLoading(false);
            return;
        }

        if(data.status === 'error') toast.error(data.error);
        setLoading(false);
    };


  return (
    <section id='contact' className="contact-section">
        <div className="container">
            <div className="section-header">
                <h2>Get in Touch</h2>
                <p>Questions about this project? Send a message and it goes to the project inbox.</p>
            </div>
            
            <div className="form-container">
                <h2>Send Us a Message</h2>
                
                <form id="contactForm" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-row md:gap-5">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name <span className="required">*</span></label>
                            <input 
                                type="text"
                                name="firstName" 
                                value={data.firstName}
                                onChange={handleChange}
                            />
                            {fieldError.firstName && <p className='text-xs text-red-300'>{fieldError.firstName}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name <span className="required">*</span></label>
                            <input 
                                type="text" 
                                name="lastName" 
                                value={data.lastName}
                                onChange={handleChange}
                            />
                            {fieldError.lastName && <p className='text-xs text-red-300'>{fieldError.lastName}</p>}
                        </div>
                    </div>
                    
                    <div className="form-row md:gap-5">
                        <div className="form-group">
                            <label htmlFor="email">Email Address <span className="required">*</span></label>
                            <input 
                                type="email"
                                name="email" 
                                value={data.email}
                                onChange={handleChange}
                            />
                            {fieldError.email && <p className='text-xs text-red-300'>{fieldError.email}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                            <input 
                                type="tel"
                                name="phone" 
                                value={data.phone}
                                onChange={handleChange}
                            />
                            {fieldError.phone && <p className='text-xs text-red-300'>{fieldError.phone}</p>}
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="subject">Subject <span className="required">*</span></label>
                        <select 
                            name="subject"
                            value={data.subject}
                            onChange={handleChange}
                        >
                            <option value="">Select a subject</option>
                            <option value="general">General Inquiry</option>
                            <option value="donation">Donation Questions</option>
                            <option value="media">Media & Press</option>
                            <option value="other">Other</option>
                        </select>
                        {fieldError.subject && <p className='text-xs text-red-300'>{fieldError.subject}</p>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="message">Message <span className="required">*</span></label>
                        <textarea 
                            name="message" 
                            placeholder="Tell us how we can help you or how you'd like to get involved..." 
                            value={data.message}
                            onChange={handleChange}
                        ></textarea>
                        {fieldError.message && <p className='text-xs text-red-300'>{fieldError.message}</p>}
                    </div>
                    
                    <div className="checkbox-group">
                        <input type="checkbox" name="privacy" checked={data.privacy} onChange={handleChange} />
                        <label htmlFor="privacy">I understand this is a demo and my message will be emailed to the project inbox. <Link href="/legal-information" className="text-[#4285f4]">Privacy Policy</Link> and <Link href="#" className="text-[#4285f4]">Terms of Service</Link> <span className="required">*</span></label>
                        {fieldError.privacy && <p className='text-xs text-red-300'>{fieldError.privacy}</p>}
                    </div>
                    
                    <button 
                        type="submit" 
                        className="submit-btn"
                        onClick={() => handleSubmit(data)}
                        disabled={loading}
                    >{loading ? 'Sending...' : 'Send Message'}</button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default ContactSection