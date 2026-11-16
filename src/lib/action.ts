'use server'

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "./appwrite/config";
import * as handlebars from 'handlebars'
import { ContactFormData } from "@/components/ContactSection";
import { ContactEmail } from "./email/template";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY!);


export const getAllSuccessStories = async (): Promise<SuccessStoryType[]> => {
    try {
        const { database } = await createAdminClient();

        const successStories = await database.listDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_SUCCESS_STORY_COLLECTION_ID!,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(3)
            ]
        );

        const stories = successStories.documents as SuccessStoryType[];

        return stories;
    } catch (error) {
        console.error('Error fetching success stories:', error);
        return [];
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


export const contactEmail = async (data: ContactFormData): Promise<ResponseStatus> => {
    const contact = handlebars.compile(ContactEmail);
    try {

        const subject = data.subject === 'donation' ? 'Donation Question'
            : data.subject === 'general' ? 'General Inquiry'
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