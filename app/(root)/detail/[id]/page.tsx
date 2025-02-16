'use client'
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { IProduct } from '@/lib/models/car.model';
import Modal from '@/components/Modal';
import { Collections } from '@/components';
import { FaCar } from "react-icons/fa";

type SearchParams = {
  params: Promise<{
    id: string;
  }>;
};

const Page = ({ params }: SearchParams) => {
  const [car, setCar] = useState<IProduct>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [id, setId] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]); // Tableau de références pour les miniatures
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch('/api/Products/get');
      if (!response.ok) throw new Error('Failed to fetch product');
      const data = await response.json();

      const product = data.contents.find((product: IProduct) => product._id === id);
      if (product) {
        setCar(product);
        setActiveImageIndex(0); // Réinitialiser l'index de l'image active
      } else {
        console.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  // Faire défiler la miniature active dans la vue
  useEffect(() => {
    if (thumbnailRefs.current[activeImageIndex]) {
      thumbnailRefs.current[activeImageIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeImageIndex]);


  if (!car) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col">
        <div className="relative w-[200px] h-[200px] "> {/* Container for the image */}
          <Image
            alt="loading"
            src="https://i.pinimg.com/originals/9e/9c/68/9e9c68435731c23c00573a1544d539b3.gif"
            fill
            className="rounded-lg object-contain w-full h-full" // Ensures the image fits within the container
          />
        </div>
        <p className="mt-4 text-lg text-gray-800">Loading...</p> {/* Optional: Add a loading message */}
      </div>
    );
  }
  const handleNextImage = () => {
    if (activeImageIndex < car.images.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    }
  };

  return (
    <div className="mx-auto p-6 flex flex-col justify-center mt-10">
      <Link href="/collections" className="flex items-center gap-2 mb-6">
        <GrPrevious />
        <span className="py-2 text-blue-600 rounded-lg transition">Back to Collections</span>
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image Carousel */}
        <div className="flex flex-col items-center md:w-1/2">
          <div className="w-full h-96 mb-4 relative">
            {car.images && car.images.length > 0 ? (
              <Image
                src={car.images[activeImageIndex].image}
                alt={car.description}
                width={500}
                height={400}
                className="rounded-lg object-contain w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-700 rounded-lg">
                No Image Available
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          {car.images && car.images.length > 0 && (
            <div className="flex space-x-4 overflow-hidden mb-4 w-[400px]" ref={galleryRef}>
              {car.images.map((imgUrl, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    thumbnailRefs.current[index] = el; // Ensure assignment but return nothing
                  }} // Assigner la référence à l'élément
                  className={`flex-shrink-0 w-20 h-20 cursor-pointer ${
                    activeImageIndex === index ? 'border-b-2 border-b-blue-500' : ''
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={imgUrl?.image || '/fallback-image.jpg'}
                    alt={`Image ${index + 1}`}
                    width={80}
                    height={80}
                    className="rounded-lg object-contain w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Next and Previous Image Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handlePrevImage}
              disabled={activeImageIndex === 0}
              className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-800"
            >
              <GrPrevious />
            </button>
            <button
              onClick={handleNextImage}
              disabled={activeImageIndex === car.images.length - 1}
              className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-800"
            >
              <GrNext />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{car.title}</h1>
          <p className="text-xl font-semibold text-gray-800 mb-4">Color: {car.features.color}</p>
          <p className="text-xl font-semibold text-gray-800 mb-4">Fuel: {car.features.fuel}</p>
          <p className="text-xl font-semibold text-gray-800 mb-4">Horsepower: {car.features.horsepower}</p>
          <p className="text-xl font-semibold text-gray-800 mb-4">Mileage: {car.features.mileage}</p>
          <p className="text-xl font-semibold text-gray-800 mb-4">Transmission: {car.features.transmission}</p>
          <p className="text-2xl text-gray-700 mb-4 p-2 border rounded"
               style={{   
                resize:'vertical',        
                overflowY: 'auto',         
                height: `100px`,
                maxHeight:'700px',            
              }}>{car.description}</p>
          <p className="text-3xl font-semibold text-green-600 mb-6">{car.price} Franc Cfa</p>
        </div>
      </div>

      {/* Contact Us Button */}
      <button onClick={() => setIsOpen(true)} className="mt-8 text-center mb-10">
        <a className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-green-700 transition">
          Contact Us by Email
        </a>
      </button>
      <div>
        <div className='w-full border-t p-3 bg-blue-200 rounded text-xl font-bold flex itmes-center gap-3'>
          Other Cars
          <FaCar size={30}/>
          
        </div>
      </div>
      <Collections/>
      {isOpen && car && <Modal car={car} onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default Page;