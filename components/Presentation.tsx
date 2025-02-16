'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { PresentationImage } from '@/types/Collections-data';

const Presentation = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % PresentationImage.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []); // Supprimez `image` des dépendances, car il n'est plus utilisé

  return (
    <div className="w-full flex flex-col xl:flex-row justify-between items-center">
      {/* Texte de présentation */}
      <div className="flex-1 pt-20 xl:pt-36 px-4 xl:px-12 text-center xl:text-left">
        <span className="font-bold text-3xl xl:text-[50px]">
          Find your Dream Car with Us with the Best Services
        </span>
      </div>

      {/* Image avec fond */}
      <div className="flex relative w-full xl:w-[60%] justify-center xl:justify-end items-end min-h-[300px] xl:h-screen">
        {/* Ajout d'une min-height ici */}
        <div className="relative w-[90%] min-h-[250px] xl:h-full z-0">
          <Image
            src={PresentationImage[currentImage]}
            alt="Presentation"
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute xl:-top-24 xl:-right-1/2 -right-1/4 bg-hero-bg bg-repeat-round -z-10 w-full xl:h-screen h-[400px] overflow-hidden">
          <Image
            src="https://img.freepik.com/premium-photo/yellow-white-painting-line-yellow-background_1278706-54801.jpg"
            alt="bg"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default Presentation;