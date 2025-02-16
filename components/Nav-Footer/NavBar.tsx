'use client'
import React, { useState } from 'react'
import { FaBars, FaSearch } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { GrClose } from 'react-icons/gr'

const NavBar = () => {
  // État local pour gérer l'ouverture du modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour ouvrir/fermer le modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <nav className="flex w-full bg-transparent p-4 border-b">
      <div className="flex w-full justify-between items-center">
        
        {/* Section des options pour petits écrans */}
        <div className="flex xl:hidden">
          <FaBars size={25} onClick={toggleModal} /> {/* Ouvre le modal */}
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center font-bold text-xl">
          <span className="font-bold text-xl xl:text-3xl font-serif">K</span>
          <Image
            src="/car-logo.png"
            alt="logo"
            className="object-contain"
            width={75}
            height={18}
          />
          <span className="font-bold text-xl xl:text-3xl font-serif">L-Car</span>
        </Link>

        {/* Navigation pour grands écrans */}
        <div className="hidden xl:flex gap-6">
          <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-blue-500 transition-colors">About</Link>
          <Link href="/collections" className="hover:text-blue-500 transition-colors">Collections</Link>
          <Link href="/contact" className="hover:text-blue-500 transition-colors">Contact Us</Link>
          <Link href="/faq" className="hover:text-blue-500 transition-colors">FAQ</Link>
        </div>

        {/* Section de recherche */}
        <Link href='/search' className="flex">
          <FaSearch size={25} />
        </Link>
      </div>

      {/* Modal pour les petits écrans */}
      {isModalOpen && (
        <div className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-10 w-3/5">

          <div className="flex justify-center items-center h-full">
            {/* Modal animé */}
            <div className={`p-6 bg-gray-50  shadow-lg w-full absolute left-0 h-full top-0 transition-transform transform ${isModalOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="flex justify-end p-4">
                <button onClick={toggleModal} className=" text-xl"><GrClose/></button>
               </div>
              <ul className="flex flex-col gap-4">
                <li><Link href="/" className="text-lg text-gray-800" onClick={toggleModal}>Home</Link></li>
                <li><Link href="/about" className="text-lg text-gray-800" onClick={toggleModal}>About</Link></li>
                <li><Link href="/collections" className="text-lg text-gray-800" onClick={toggleModal}>Collections</Link></li>
                <li><Link href="/contact" className="text-lg text-gray-800" onClick={toggleModal}>Contact Us</Link></li>
                <li><Link href="/faq" className="text-lg text-gray-800" onClick={toggleModal}>FAQ</Link></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar;

