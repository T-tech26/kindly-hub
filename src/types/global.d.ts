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
    $tableId: string;
}

type NewsReleaseType = {
    title: string;
    summary: string;
    content: string;
    image: string;
    imageId: string;
    date: string;
    $id: string;
    $permissions: string[];
    $createdAt: string;
    $updatedAt: string;
    $sequence: string;
    $databaseId: string;
    $tableId: string;
}

type NewsItem = Pick<NewsReleaseType, '$id' | 'title' | 'summary' | 'content' | 'image' | 'date'>

type StoryItem = Pick<SuccessStoryType, '$id' | 'name' | 'description' | 'testimonial'>

