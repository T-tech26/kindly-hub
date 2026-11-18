import 'server-only';

function required(value: string | undefined, name: string): string {
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}

export const config = {
    appwriteUrl: required(
        process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_URL,
        'NEXT_PUBLIC_APPWRITE_PUBLIC_URL'
    ),
    appwriteProjectId: required(
        process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        'NEXT_PUBLIC_APPWRITE_PROJECT_ID'
    ),
};

export const adminConfig = {
    appwriteUrl: required(
        process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_URL,
        'NEXT_PUBLIC_APPWRITE_PUBLIC_URL'
    ),
    appwriteProjectId: required(
        process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        'NEXT_PUBLIC_APPWRITE_PROJECT_ID'
    ),
    appwriteSecretKey: required(
        process.env.APPWRITE_API_SECRET_KEY,
        'APPWRITE_API_SECRET_KEY'
    ),
};