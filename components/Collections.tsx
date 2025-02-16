// 'use client'

// import { useState, useEffect } from 'react'
// import React from 'react'
// import Image from 'next/image'
// import { GrNext, GrPrevious, } from "react-icons/gr"
// import Link from 'next/link'


// interface IProduct {
//   _id: string;
//   title: string;
//   description: string;
//   price: string;
//   features: {
//     mileage: string;
//     fuel: string;
//     transmission: string;
//     color: string;
//     horsepower: string;
//   };
//   images: { image: string; description: string }[];
//   createdAt: string; // ou Date
// }


// const Collections = () => {
//   const [Collectionscar, setCollectionsCar] = useState<IProduct[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(true); // État de chargement
//   const itemsPerPage = 4;

//   const indexOfLastItem = currentPage * itemsPerPage
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage

//   // Sort the products by createdAt in descending order (most recent first)
//   const sortedCollections = [...Collectionscar].sort((a, b) => 
//     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//   )
//   const currentItems = sortedCollections.slice(indexOfFirstItem, indexOfLastItem)

//   const [imageIndexes, setImageIndexes] = useState<number[]>([]);

//   const FetchProducts = async () => {
//     try {
//       setIsLoading(true); // Début du chargement
//       console.log("Fetching products from:", '/api/products/get');

//       const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
//       const response = await fetch(`${baseUrl}/api/products/get`);
//       console.log("Response status:", response.status);

//       if (!response.ok) throw new Error("Failed to fetch products");

//       const data = await response.json();
//       console.log("Response data:", data);

//       if (!data.contents) throw new Error("Invalid response format");

//       setCollectionsCar(data.contents || []); // Utilisez un tableau vide comme fallback

//       const initialIndexes = data.contents.map(() => 0);
//       setImageIndexes(initialIndexes);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setIsLoading(false); // Fin du chargement (même en cas d'erreur)
//     }
//   };

//   useEffect(() => {
//     FetchProducts()
//   }, [])

//   const nextPage = () => {
//     if (indexOfLastItem < Collectionscar.length) {
//       setCurrentPage(currentPage + 1)
//     }
//   }

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1)
//     }
//   }

//   const nextImage = (index: number) => {
//     const newIndexes = [...imageIndexes]
//     if (newIndexes[index] < currentItems[index].images.length - 1) {
//       newIndexes[index]++
//     }
//     setImageIndexes(newIndexes)
//   }

//   const prevImage = (index: number) => {
//     const newIndexes = [...imageIndexes]
//     if (newIndexes[index] > 0) {
//       newIndexes[index]--
//     }
//     setImageIndexes(newIndexes)
//   }



//   // Function to truncate text after 100 characters
//   const truncateDescription = (text: string) => {
//     if (text.length > 100) {
//       return text.slice(0, 40) + '...' // Truncate and add ellipsis
//     }
//     return text // Return the original text if it's shorter than 100 characters
//   }

//   return (
//     <div className="w-full p-4 mt-10 mx-auto bg-transparent flex flex-col">
//       <div className="text-center mb-10">
//         <h2 className="text-3xl font-bold text-gray-800">All Cars</h2>
//       </div>
      
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//         {
//           currentItems.map((item, index) => (
//             <div key={index} className="border p-4 rounded-lg shadow-lg overflow-hidden relative">
//               <div className="relative">
//                 <div className="flex justify-center items-center overflow-hidden">
//                   <div className="w-full h-[220px] flex-shrink-0">
//                     <Image 
//                       src={item.images[imageIndexes[index]].image} 
//                       alt={`Image of ${item.description}`} 
//                       width={500} 
//                       height={500} 
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   </div>
//                 </div>
//                 <button 
//                   onClick={() => prevImage(index)}
//                   className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-600 p-2 rounded-full hover:bg-gray-800 transition-colors"
//                 >
//                   <GrPrevious />
//                 </button>
                
//                 <button 
//                   onClick={() => nextImage(index)}
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-600 p-2 rounded-full hover:bg-gray-800 transition-colors"
//                 >
//                   <GrNext />
//                 </button>
//               </div>
//               <div className="mt-4 text-center">
//                 <p className="text-xl font-semibold text-gray-800">{item.title}</p>
//                 {/* Truncate the description */}
//                 <p className="text-gray-600 mt-2">{truncateDescription(item.description)}</p>
//                 <p className="text-lg text-gray-900 mt-2 font-semibold">{item.price} FCFA</p>
//                 <div className='flex itmes-center justify-between p-2 gap-2'>


//                 </div>
//               </div>
//               <Link href={`/detail/${item._id}`} passHref className='flex-1 w-full'>
//                   <button className=" bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full ">
//                     View Details
//                   </button>
//                 </Link>
//             </div>
//           ))
//         }
//       </div>
//       <div className="mt-8 flex justify-between items-center w-full max-w-md mx-auto border p-4 rounded-xl shadow-md">
//         <button
//           className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 border-b hover:border-b-gray-800 w-32"
//           onClick={prevPage}
//         >
//           <GrPrevious />
//           <span>Previous</span>
//         </button>
//         <button
//           className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 border-b hover:border-b-gray-800 w-32"
//           onClick={nextPage}
//         >
//           <span>Next</span>
//           <GrNext />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Collections
'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import Image from 'next/image'
import { GrNext, GrPrevious } from "react-icons/gr"
import Link from 'next/link'

interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: string;
  features: {
    mileage: string;
    fuel: string;
    transmission: string;
    color: string;
    horsepower: string;
  };
  images: { image: string; description: string }[];
  createdAt: string; // ou Date
}

const Collections = () => {
  const [Collectionscar, setCollectionsCar] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // État de chargement
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Sort the products by createdAt in descending order (most recent first)
  const sortedCollections = [...Collectionscar].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const currentItems = sortedCollections.slice(indexOfFirstItem, indexOfLastItem);

  const [imageIndexes, setImageIndexes] = useState<number[]>([]);

  const FetchProducts = async () => {
    try {
      setIsLoading(true); // Début du chargement
      console.log("Fetching products from:", '/api/products/get');

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const response = await fetch(`${baseUrl}/api/Products/get`);
      console.log("Response status:", response.status);

      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      console.log("Response data:", data);

      if (!data.contents) throw new Error("Invalid response format");

      setCollectionsCar(data.contents || []); // Utilisez un tableau vide comme fallback

      const initialIndexes = data.contents.map(() => 0);
      setImageIndexes(initialIndexes);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false); // Fin du chargement (même en cas d'erreur)
    }
  };

  useEffect(() => {
    FetchProducts();
  }, []);

  const nextPage = () => {
    if (indexOfLastItem < Collectionscar.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextImage = (index: number) => {
    const newIndexes = [...imageIndexes];
    if (newIndexes[index] < currentItems[index].images.length - 1) {
      newIndexes[index]++;
    }
    setImageIndexes(newIndexes);
  };

  const prevImage = (index: number) => {
    const newIndexes = [...imageIndexes];
    if (newIndexes[index] > 0) {
      newIndexes[index]--;
    }
    setImageIndexes(newIndexes);
  };

  // Function to truncate text after 100 characters
  const truncateDescription = (text: string) => {
    if (text.length > 100) {
      return text.slice(0, 40) + '...'; // Truncate and add ellipsis
    }
    return text; // Return the original text if it's shorter than 100 characters
  };

  return (
    <div className="w-full p-4 mt-10 mx-auto bg-transparent flex flex-col">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">All Cars</h2>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <span className="ml-3 text-gray-700">Loading...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {currentItems.map((item, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-lg overflow-hidden relative">
                <div className="relative">
                  <div className="flex justify-center items-center overflow-hidden">
                    <div className="w-full h-[220px] flex-shrink-0">
                      <Image 
                        src={item.images[imageIndexes[index]].image} 
                        alt={`Image of ${item.description}`} 
                        width={500} 
                        height={500} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => prevImage(index)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-600 p-2 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <GrPrevious />
                  </button>
                  
                  <button 
                    onClick={() => nextImage(index)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-600 p-2 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <GrNext />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xl font-semibold text-gray-800">{item.title}</p>
                  {/* Truncate the description */}
                  <p className="text-gray-600 mt-2">{truncateDescription(item.description)}</p>
                  <p className="text-lg text-gray-900 mt-2 font-semibold">{item.price} FCFA</p>
                  <div className='flex itmes-center justify-between p-2 gap-2'></div>
                </div>
                <Link href={`/detail/${item._id}`} passHref className='flex-1 w-full'>
                  <button className=" bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full ">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center w-full max-w-md mx-auto border p-4 rounded-xl shadow-md">
            <button
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 border-b hover:border-b-gray-800 w-32"
              onClick={prevPage}
            >
              <GrPrevious />
              <span>Previous</span>
            </button>
            <button
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 border-b hover:border-b-gray-800 w-32"
              onClick={nextPage}
            >
              <span>Next</span>
              <GrNext />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Collections;