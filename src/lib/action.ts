'use server'

import { Query } from "node-appwrite";
import { createAdminClient } from "./appwrite/config";
import * as handlebars from 'handlebars'
import { ContactFormData } from "@/components/ContactSection";
import { ContactEmail } from "./email/template";
import { Resend } from "resend";
import { parseStringify } from "./utils";
import { ContactSchema } from "./schemas";


const resend = new Resend(process.env.RESEND_API_KEY!);


export const getAllSuccessStories = async (): Promise<SuccessStoryType[]> => {
    try {
        const { tableDB } = await createAdminClient();

        const successStories = await tableDB.listRows({
            databaseId: process.env.APPWRITE_DATABASE_ID!,
            tableId: process.env.APPWRITE_SUCCESS_STORY_COLLECTION_ID!,
            queries: [
                Query.orderDesc('$createdAt'),
                Query.limit(3)
            ]
        });

        return parseStringify(successStories.rows);

    } catch (error) {
        console.error('Error fetching success stories:', error);
        return [];
    }
}


export const getAllNesRelease = async (): Promise<NewsReleaseType[]> => {
    try {
        const { tableDB } = await createAdminClient();

        const news = await tableDB.listRows({
            databaseId: process.env.APPWRITE_DATABASE_ID!,
            tableId: process.env.APPWRITE_NEWS_COLLECTION_ID!,
            queries: [
                Query.orderDesc('$createdAt'),
                Query.limit(3)
            ]
        });

        const newsFeed = news.rows.map(news => ({
            ...news,
            image: `${process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_URL}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_IMAGE_BUCKET_ID}/files/${news.imageId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&mode=admin`
        }))
        
        return parseStringify(newsFeed);
        
    } catch (error) {
        console.error('Error fetching all news releases:', error);
        return [];
    }
}


export const contactEmail = async (data: ContactFormData): Promise<ResponseStatus> => {
    const contact = handlebars.compile(ContactEmail);
    try {

        const parsed = ContactSchema.safeParse(data);

        if (!parsed.success) {
            return {
                status: 'error',
                error: 'Invalid contact data provided.'
            };
        }

        const subject = parsed.data.subject === 'donation' ? 'Donation Question'
            : parsed.data.subject === 'general' ? 'General Inquiry'
                : parsed.data.subject === 'media' ? 'Media And Press'
                        : 'Other Issues';

        const emailSubject = `[Kindly Hub demo] ${subject}`;

        const emailBody = contact({
            subject: emailSubject,
            username: `${parsed.data.firstName} ${parsed.data.lastName}`,
            useremail: parsed.data.email,
            phone: parsed.data.phone,
            message: parsed.data.message,
        });

        const { error } = await resend.emails.send({
            from: 'Kindly Hub <onboarding@resend.dev>',
            to: process.env.CONTACT_TO_EMAIL!,
            subject: subject,
            html: emailBody,
            replyTo: parsed.data.email
        });


        if (error) {
            console.error(error);
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