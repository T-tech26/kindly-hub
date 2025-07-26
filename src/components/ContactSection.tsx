import { contactEmail } from '@/lib/action';
import React, { useState } from 'react'
import { toast } from 'sonner';
import z from 'zod';

const ContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  subject: z.enum(['general', 'donation', 'media', 'emergency', 'other']),
  message: z.string().min(1, "Message is required"),
  newsletter: z.boolean(),
  privacy: z.boolean(),
});

export type ContactFormData = z.infer<typeof ContactSchema>;

const ContactSection = () => {

    const [data, setData] = useState<ContactFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
        newsletter: false,
        privacy: false
    });
    const [loading, setLoading] = useState(false);
    const [fieldError, setFieldError] = useState<Record<string, string>>({});



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if(name === 'newsletter' || name === 'privacy') {
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
                newsletter: false,
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
                <p>We&apos;re here to help and answer any questions you might have about our humanitarian efforts. Your support makes a real difference in the lives of those who need it most.</p>
            </div>
            
            <div className="form-container">
                <h2>Send Us a Message</h2>
                <p className="subtitle">We&apos;ll respond within 24 hours</p>
                
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
                            <label htmlFor="phone">Phone Number</label>
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
                            <option value="emergency">Emergency Assistance</option>
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
                        <input type="checkbox" name="newsletter" checked={data.newsletter} onChange={handleChange} />
                        <label htmlFor="newsletter">I would like to receive updates about Kindly Hub&apos;s humanitarian work and impact stories.</label>
                    </div>
                    
                    <div className="checkbox-group">
                        <input type="checkbox" name="privacy" checked={data.privacy} onChange={handleChange} />
                        <label htmlFor="privacy">I agree to the <a href="#" className="color: #4285f4;">Privacy Policy</a> and <a href="#" className="color: #4285f4;">Terms of Service</a> <span className="required">*</span></label>
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