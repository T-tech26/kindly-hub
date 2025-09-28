"use client"; // required for useState and useRef in app dir

import { DonationFormData } from "@/components/DonationSection";
import { deleteOldNews, deleteSuccessStories, getAllNesRelease, getAllPaymentMethods, getAllSuccessStories } from "@/lib/action";
import { addBillingLogo, addNewsFeatureImage } from "@/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react";

type DataContextType = {
    billingData: PaymentMethodType[];
    setBillingData: React.Dispatch<React.SetStateAction<PaymentMethodType[]>>;
    successStories: SuccessStoryType[];
    setSuccessStories: React.Dispatch<React.SetStateAction<SuccessStoryType[]>>;
    news: NewsReleaseType[];
    setNews: React.Dispatch<React.SetStateAction<NewsReleaseType[]>>;
    donation: DonationFormData;
    setDonation: React.Dispatch<React.SetStateAction<DonationFormData>>;
};

const DataContext = createContext<DataContextType | null>(null);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("DataContext is not available");
  return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {

  const [billingData, setBillingData] = useState<PaymentMethodType[] | []>([]);
  const [successStories, setSuccessStories] = useState<SuccessStoryType[] | []>([]);
  const [news, setNews] = useState<NewsReleaseType[] | []>([]);
  const [donation, setDonation] = useState<DonationFormData>({
        frequency: 'one-time',
        amount: '',
        fullName: '',
        email: '',
});

  useEffect(() => {
    const fetchData = async () => {
        const data = await getAllPaymentMethods();

        const editedData = addBillingLogo(data.documents, data.logos);

        setBillingData(editedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        const data = await getAllSuccessStories();

        if(data.length > 3) {
            const deleteOldSuccessStories = data.slice(3);
            await deleteSuccessStories(deleteOldSuccessStories);
        }

        setSuccessStories(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        const data = await getAllNesRelease();

        const newsWithImageUrl = addNewsFeatureImage(data.documents, data.images);

        if(newsWithImageUrl.length > 3) {
            const oldNews = newsWithImageUrl.slice(3);

            await deleteOldNews(oldNews);
        }

        setNews(newsWithImageUrl);
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        billingData,
        setBillingData,
        successStories,
        setSuccessStories,
        news,
        setNews,
        donation, setDonation
      }}
    >
      {children}
    </DataContext.Provider>
  );
};