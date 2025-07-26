import { format, formatDistanceToNowStrict, differenceInHours, parseISO } from 'date-fns';

export const addBillingLogo = (
    documents: PaymentMethodType[], 
    logos: FileType[]
) => {

    return documents.map(method => {
        const matchingFile = logos.find(file => file.name === method.logo);

        const imageUrl = matchingFile
            ? `${process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_URL}/storage/buckets/${matchingFile.bucketId}/files/${matchingFile.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&mode=admin`
            : method.logo; // fallback if no match

        return {
            ...method,
            logo: imageUrl,
            fileid: matchingFile?.$id
        };
    });
}


export const addNewsFeatureImage = (
    documents: NewsReleaseType[],
    images: FileType[]
) => {
    return documents.map(news => {
        const newsImage = images.find(file => file.name === news.image);

        const imageUrl = newsImage 
            ? `${process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_URL}/storage/buckets/${newsImage.bucketId}/files/${newsImage.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&mode=admin`
            : news.image;

        return {
            ...news,
            image: imageUrl,
            fileId: newsImage?.$id
        }
    });
}


export const getSmartDateDisplay = (dateString: string) => {
  const date = parseISO(dateString);
  const now = new Date();

  const hoursDiff = differenceInHours(now, date);

  if (hoursDiff < 24) {
    // Show "2 hours ago", "5 hours ago"
    return formatDistanceToNowStrict(date, { addSuffix: true });
  } else if (hoursDiff < 72) {
    // Show "2 days ago"
    return formatDistanceToNowStrict(date, { addSuffix: true });
  } else {
    // If it's older than 3 days, show only the date
    return format(date, 'yyyy-MM-dd');
  }
}
