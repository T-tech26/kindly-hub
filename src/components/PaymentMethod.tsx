'use client'

import { useDataContext } from '@/context/DataContext'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import z from 'zod';
import { DonationFormData } from './DonationSection';
import { donationPayment } from '@/lib/action';
import { toast } from 'sonner';


const screenShotSchema = z.object({
    image: z.instanceof(File)
        .refine((file) => file.size > 0, { message: "File is required" })
        .refine((file) => file.size <= 5 * 1024 * 1024, { message: "File must be under 5MB" })
        .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
            message: "Only JPEG or PNG files allowed",
        }),
});


export type ScreenShotFormData = z.infer<typeof screenShotSchema>;
export type BillingDetailType = {
    billingDataID: string,
    type: string,
    address: string,
    addressType: string,
}


const PaymentMethod = () => {

    const imgRef = useRef<HTMLInputElement | null>(null);

    const { billingData, donation } = useDataContext();

    const [donationProcessing, setDonationProcessing] = useState(false);
    const [billingDetail, setBillingDetail] = useState<BillingDetailType>({
        billingDataID: '',
        type: '',
        address: '',
        addressType: '',
    });
    const [screenShot, setScreenShot] = useState<ScreenShotFormData>({
        image: new File([], ''),
    });
    const [previewImg, setPreviewImg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [fieldError, setFieldError] = useState<Record<string, string>>({});

    useEffect(() => {
        if(donation.fullName.length > 0) {
            setDonationProcessing(true);
        }
    }, [donation]);


    const proceedDonation = (data: PaymentMethodType) => {
        setBillingDetail({
            billingDataID: data.$id,
            type: data.type,
            address: data.address,
            addressType: data.addressType
        });
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;

        if(input.files !== null && input.files.length > 0) {
            const file = input.files[0];

            setScreenShot({
                image: file
            })

            if(file) setPreviewImg(URL.createObjectURL(file));
            return;
        }
    }


    const handleSubmit = async (donationData: DonationFormData, file: ScreenShotFormData, billingMethod: BillingDetailType) => {
        setLoading(true);

        const result = screenShotSchema.safeParse(file);

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

        const data = await donationPayment(donationData, file, billingMethod);

        if(data.status === 'success') {
            setScreenShot({
                image: new File([], ''),
            });
            setBillingDetail({
                billingDataID: '',
                type: '',
                address: '',
                addressType: '',
            });
            setPreviewImg(null);
            setLoading(false);
            setDonationProcessing(false);
            toast.success(data.message);
        };

        if(data.status === 'error') {
            toast.error(data.error);
            setLoading(false);
        }
    };


    const handleCopyClick = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
    
            toast.success('Copied successfully');
        } catch (error) {
            console.log(error);
            toast.error('Failed to copy text');
        }
    };


  return (
    <div className={
        `fixed w-full h-screen py-10 grid place-items-center bg-blue-800/30 overflow-y-scroll ${donationProcessing ? '' : 'hidden'}`
    }>
        {!billingDetail.type.length && (
            <div className='p-5 bg-white rounded-lg w-4/5 md:w-3/5 lg:w-1/2'>
                <h2 className='mb-5'>Payment Methods</h2>

                <ul className='list-none text-left font-semibold'>
                    {billingData.length > 0 && billingData.map((details, index) => (
                        <li 
                            key={index} 
                            className='flex items-center gap-3 pr-4 pl-1 py-2 text-left shadow mb-2 rounded-md cursor-pointer'
                            onClick={() => proceedDonation(details)}
                        >
                            <Image
                                src={details.logo}
                                width={1000}
                                height={1000}
                                alt='Payment logo'
                                className='size-8 rounded-full shadow'
                            />

                            <p className='flex-1'>
                            {
                                details.type === 'paypal' ? 'PayPal'
                                    : details.type === 'skrill' ? 'Skrill'
                                        : details.type === 'crypto' && details.addressType === 'btc' ? 'BTC'
                                            : details.type === 'crypto' && ['tron', 'bsc', 'ton'].includes(details.addressType) ? 'USDT' : ''
                            }
                            </p>

                            <Image
                                src='/chevron_right.svg'
                                width={30}
                                height={30}
                                alt='Payment logo'
                                onClick={() => proceedDonation(details)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {billingDetail.type.length > 0 && (
            <div className='p-5 bg-white rounded-lg w-4/5 md:w-3/5 lg:w-1/2'>
                <p className='text-sm font-medium tracking-wide mb-5'>
                    Kindly make your donation using the payment details provided below. Once completed, please upload a screenshot of your payment for confirmation. Thank you for your generous support — your contribution means a lot.
                </p>

                <form className='donation-form' onSubmit={e => e.preventDefault()}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <p className='text-sm'>Amount</p>
                            <p className='text-sm px-2 py-2 rounded-lg border-2 border-zinc-400/30 w-full mt-2 flex justify-between items-center'>
                                ${donation.amount} 

                                <Image
                                    src='/copy_icon.svg'
                                    width={25}
                                    height={25}
                                    alt='copy icon'
                                    className='cursor-pointer'
                                    onClick={() => handleCopyClick(donation.amount)}
                                />
                            </p>
                        </div>

                        <div>
                            {billingDetail.type === 'paypal' && (
                                <p className='text-sm'>
                                    {
                                        billingDetail.addressType === 'p-email' ? 'PayPal Email'
                                            : billingDetail.addressType === 'p-username' ? 'PayPal Username'
                                                : 'PayPal Payment Number' 
                                    }
                                </p>
                            )}

                            {billingDetail.type === 'skrill' && (
                                <p className='text-sm'>
                                    {
                                        billingDetail.addressType === 's-email' ? 'Skrill Email'
                                            : billingDetail.addressType === 's-username' ? 'Skrill ID'
                                                : 'Skrill Payment Number' 
                                    }
                                </p>
                            )}

                            {billingDetail.type === 'crypto' && (
                                <p className='text-sm'>
                                    {
                                        billingDetail.addressType === 'tron' ? 'TRC20 Network'
                                            : billingDetail.addressType === 'bsc' ? 'BEP20 Network'
                                                : billingDetail.addressType === 'btc' ? 'BTC Network'
                                                    : 'Ton Network' 
                                    }
                                </p>
                            )}

                            <p className='text-sm px-2 py-2 rounded-lg border-2 border-zinc-400/30 w-full mt-2 flex justify-between items-center'>
                                {billingDetail.address.length > 20 ? `${billingDetail.address.slice(0, 20)}...` : billingDetail.address}

                                <Image
                                    src='/copy_icon.svg'
                                    width={25}
                                    height={25}
                                    alt='copy icon'
                                    className='cursor-pointer'
                                    onClick={() => handleCopyClick(billingDetail.address)}
                                />
                            </p>
                        </div>

                        <div>
                            <div 
                                className='border-2 border-dashed border-[#e9ecef] rounded-[6px] p-[30px] text-center cursor-pointer transition-all duration-300 bg-[#f8f9fa] hover:border-[#3498db] hover:bg-[#3498db1f]'
                                onClick={() => imgRef.current?.click()}
                            >
                                {previewImg ? (
                                    <Image
                                        src={previewImg}
                                        width={1000}
                                        height={1000}
                                        alt='Payment screenshot'
                                        className='size-full'
                                    />
                                ) : (
                                    <>
                                        <div className="size-12 bg-[#3498db] rounded-full flex items-center justify-center mx-auto mb-[15px] text-white text-xl">📷</div>
                                        <div className="font-medium text-[#2c3e50] mb-[5px]">Click to upload image</div>
                                        <div className="text-[#666] text-sm">PNG, JPG up to 5MB</div>
                                    </>
                                )}

                                <input 
                                    ref={imgRef}
                                    type="file" 
                                    name='image'
                                    accept="image/*" 
                                    className="display: none;" 
                                    onChange={handleChange}
                                />
                                {fieldError.image && <p className='text-xs text-red-300'>{fieldError.image}</p>}
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="submit-btn" 
                            disabled={loading}
                            onClick={() => handleSubmit(donation, screenShot, billingDetail)}
                        >{loading ? 'Processing...' : 'Complete Donation'}</button>
                    </div>
                </form>
            </div>
        )}
    </div>
  )
}

export default PaymentMethod