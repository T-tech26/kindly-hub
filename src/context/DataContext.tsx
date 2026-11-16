"use client"; // required for useState and useRef in app dir

import { getAllNesRelease, getAllSuccessStories } from "@/lib/action";
import { addNewsFeatureImage } from "@/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react";

type DataContextType = {
    successStories: SuccessStoryType[];
    setSuccessStories: React.Dispatch<React.SetStateAction<SuccessStoryType[]>>;
    news: NewsReleaseType[];
    setNews: React.Dispatch<React.SetStateAction<NewsReleaseType[]>>;
};

const DataContext = createContext<DataContextType | null>(null);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("DataContext is not available");
  return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {

  const [successStories, setSuccessStories] = useState<SuccessStoryType[] | []>([]);
  const [news, setNews] = useState<NewsReleaseType[] | []>([]);
  

  useEffect(() => {
    const fetchData = async () => {
        const data = await getAllSuccessStories();

        setSuccessStories(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        const data = await getAllNesRelease();

        const newsWithImageUrl = addNewsFeatureImage(data.documents, data.images);

        setNews(newsWithImageUrl);
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