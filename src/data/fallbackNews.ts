export const newsFeed: NewsItem[] = [
    {
        $id: '1',
        title: 'Kindly Hub is now a clearly labelled demo',
        summary: 'The site now presents itself honestly as a portfolio project: no payments are taken and the organisation is fictional.',
        content: 'Kindly Hub is a portfolio project that demonstrates a donation website built with Next.js and TypeScript. The organisation, its mission and all of its content are fictional. The donation form validates what you enter and then shows a confirmation, but it does not take payment or store your details. A demo banner appears on every page, and a short demo notice explains what the site does and does not do.',
        image: '',
        date: '2026-11-16'
    },
    {
        $id: '2',
        title: 'The contact form sends real messages',
        summary: 'Messages from the contact form are emailed to the project inbox through Resend.',
        content: 'The contact form checks every field with Zod in the browser, then sends your message by email using Resend and an HTML email template. This is the one part of the demo that handles real data, so please avoid sending sensitive information. The site itself does not store messages in a database.',
        image: '',
        date: '2026-11-16'
    },
    {
        $id: '3',
        title: 'News is managed from an admin dashboard',
        summary: 'The news you are reading was added from a separate admin dashboard and stored in Appwrite.',
        content: 'The public site only reads content. News and sample feedback are created and edited in a separate admin dashboard, stored in Appwrite, and the site shows the three newest news items first. If the database is unavailable, the site falls back to built-in sample updates so the page still works.',
        image: '',
        date: '2026-11-16'
    },
]