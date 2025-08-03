'use server'

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "./appwrite/config";
import * as handlebars from 'handlebars'
import { ContactFormData } from "@/components/ContactSection";
import { ContactEmail } from "./email/template";
import { BillingDetailType, ScreenShotFormData } from "@/components/PaymentMethod";
import { DonationFormData } from "@/components/DonationSection";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY!);


export const getAllSuccessStories = async (): Promise<SuccessStoryType[]> => {
    try {
        const { database } = await createAdminClient();

        const successStories = await database.listDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_SUCCESS_STORY_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        );

        const stories = successStories.documents as SuccessStoryType[];

        return stories;
    } catch (error) {
        console.error('Error fetching success stories:', error);
        return [];
    }
}


export const deleteSuccessStories = async (data: SuccessStoryType[]) => {
    try {
        const { database } = await createAdminClient();

        const storiesIds: string[] = [];

        data.forEach(story => {
            storiesIds.push(story.$id);
        })

        await database.deleteDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_SUCCESS_STORY_COLLECTION_ID!,
            storiesIds
        );

    } catch (error) {
        console.error('Error deleting old success stories:', error);
    }
}


export const getAllNesRelease = async (): Promise<NewsReturnType> => {
    try {
        const { database, storage } = await createAdminClient();

        const news = await database.listDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_NEWS_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        );

        const images = await storage.listFiles(
            process.env.APPWRITE_IMAGE_BUCKET_ID!,
        );

        const newsType = news.documents as NewsReleaseType[];
        const imageType = images.files as FileType[];

        return {
            documents: newsType,
            images: imageType
        }
        
    } catch (error) {
        console.error('Error fetching all news releases:', error);
        return {
            documents: [],
            images: []
        }
    }
}


export const deleteOldNews = async (data: NewsReleaseType[]) => {
    try {
        const { database, storage } = await createAdminClient();

        const newsIds: string[] = [];
        const imagesIds: { id: string}[] = [];

        data.forEach(news => {
            newsIds.push(news.$id);
            imagesIds.push({ id: news.fileId!});
        });

        await database.deleteDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_NEWS_COLLECTION_ID!,
            newsIds
        );

        for(const file of imagesIds) {
            await storage.deleteFile(
                process.env.APPWRITE_IMAGE_BUCKET_ID!,
                file.id
            );
        };
        
    } catch (error) {
        console.error('Error deleting old news releases:', error);
    }
}


export const getAllPaymentMethods = async (): Promise<BillingReturnType> => {
    try {
        const { database, storage } = await createAdminClient();

        const billingMethods = await database.listDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_PAYMENT_METHOD_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        );

        const billingMethodLogos = await storage.listFiles(
            process.env.APPWRITE_IMAGE_BUCKET_ID!,
            [Query.orderDesc('$createdAt')]
        )

        const methods = billingMethods.documents as PaymentMethodType[];
        const methodLogos = billingMethodLogos.files as FileType[];

        return {
            documents: methods, 
            logos: methodLogos
        }
    } catch (error) {
        console.error('Error fetching billing methods:', error);

        return {
            documents: [],
            logos: []
        };
    }
}


export const contactEmail = async (data: ContactFormData): Promise<ResponseStatus> => {
    const contact = handlebars.compile(ContactEmail);
    try {

        const subject = data.subject === 'donation' ? 'Donation Question'
            : data.subject === 'general' ? 'General Inquiry'
                : data.subject === 'emergency' ? 'Emergency Assistance'
                    : data.subject === 'media' ? 'Media And Press'
                        : 'Other Issues';

        const emailBody = contact({
            subject: subject,
            username: `${data.firstName} ${data.lastName}`,
            useremail: data.email,
            phone: data.phone,
            message: data.message,
            organization_name: 'Kindly Hub',
            organization_email: `kindlyhub4@gmail.com`
        });

        const { error } = await resend.emails.send({
            from: 'Kindly Hub <team@email.kindlyhub.org>',
            to: 'kindlyhub4@gmail.com',
            subject: subject,
            html: emailBody
        });


        if (error) {
            console.log(error);
            return {
                status: 'error',
                error: 'An unexpected error occured while sending your message to Kindly Hub.'
            }
        }

        return {
            status: 'success',
            message: 'Contact email sent successfully.'
        }
        
    } catch (error) {
        console.error('Error sending contact email', error);

        return {
            status: 'error',
            error: 'Error sending contact email to Kindly Hub.'
        }
    }
}


export const donationPayment = async (data: DonationFormData, file: ScreenShotFormData, billingMethod: BillingDetailType): Promise<ResponseStatus> => {
    try {
        const { database, storage } = await createAdminClient();

        const imageName = ID.unique();

        const donationData = {
            fullName: data.fullName,
            email: data.email,
            amount: data.amount,
            frequency: data.frequency,
            screenShot: `${imageName}_${file.image.name.replace(' ', '_')}`,
            paymentMethod: billingMethod.type,
            addressType: billingMethod.addressType,
            address: billingMethod.address,
            billingDataID: billingMethod.billingDataID
        };

        const donationDoc = await database.createDocument(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_DONATIONS_COLLECTION_ID!,
            ID.unique(),
            donationData
        );

        if(!donationDoc) {
            return {
                status: 'error',
                error: 'Donation request failed, try again.'
            }
        };

        const editedFileName = new File([file.image], `${imageName}_${file.image.name.replace(' ', '_')}`, { type: file.image.type });

        await storage.createFile(
            process.env.APPWRITE_IMAGE_BUCKET_ID!,
            ID.unique(),
            editedFileName
        );
        
        return {
            status: 'success',
            message: 'Donation request submitted successfully.'
        };
    } catch (error) {
        console.error('Error uploading donation payment details:', error);

        return {
            status: 'error',
            error: 'An unexpected error occured while submitting your donation request. Please try again.'
        };
    }
}