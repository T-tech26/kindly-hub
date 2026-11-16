type ResponseStatus = {
    status: 'error';
    error: string;
} | {
    status: 'success';
    message: string;
}

type SuccessStoryType = {
    name: string;
    description: string;
    testimonial: string;
    $id: string;
    $permissions: string[];
    $createdAt: string;
    $updatedAt: string;
    $sequence: string;
    $databaseId: string;
    $collectionId: string;
}

type NewsReleaseType = {
    title: string;
    summary: string;
    content: string;
    image: string;
    date: string;
    featured: boolean;
    fileId?: string;
    $id: string;
    $permissions: string[];
    $createdAt: string;
    $updatedAt: string;
    $sequence: string;
    $databaseId: string;
    $collectionId: string;
}

type FileType = {
  $id: string;
  bucketId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  name: string;
  signature: string;
  mimeType: 'image/png';
  sizeOriginal: number;
  chunksTotal: number;
  chunksUploaded: number;
}

type NewsReturnType = {
    documents: NewsReleaseType[];
    images: FileType[];
}

