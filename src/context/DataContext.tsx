"use client"; // required for useState and useRef in app dir

import { newsFeed } from "@/data/fallbackNews";
import { stories } from "@/data/fallbackStories";
import { getAllNesRelease, getAllSuccessStories } from "@/lib/action";
import { addNewsFeatureImage } from "@/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react";

type DataContextType = {
    successStories: StoryItem[];
    setSuccessStories: React.Dispatch<React.SetStateAction<StoryItem[]>>;
    news: NewsItem[];
    setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
};

const DataContext = createContext<DataContextType | null>(null);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("DataContext is not available");
  return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {

  const [successStories, setSuccessStories] = useState<SuccessStoryType[] | StoryItem[]>([]);
  const [news, setNews] = useState<NewsReleaseType[] | NewsItem[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSuccessStories();
        
        setSuccessStories(data.length > 0 ? data : stories);
      } catch {
        setSuccessStories(stories);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await getAllNesRelease();

        if(!data.documents.length || !data.documents) {
          setNews(newsFeed);
          return;
        }
        
        const newsWithImageUrl = addNewsFeatureImage(data.documents, data.images);
  
        setNews(newsWithImageUrl);
      } catch {
        setNews(newsFeed);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        successStories,
        setSuccessStories,
        news,
        setNews,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};