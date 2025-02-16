import React from 'react'
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-[50px] px-5 py-10 text-gray-700 h-[screen] flex ">
      <div className="flex flex-col xl:flex-row w-full justify-between items-center gap-6">
        {/* Section Copyright */}
        <div className="text-center xl:text-left">
          <p className="text-sm">&copy; {new Date().getFullYear()} KolCar. All Rights Reserved.</p>
        </div>

        {/* Section Navigation Links */}
        <div className="flex flex-col xl:flex-row items-center gap-4">
          <Link href="/about" className="hover:text-blue-500 transition-colors">
            About Us
          </Link>
          <Link href="/collections" className="hover:text-blue-500 transition-colors">
            Our Collections
          </Link>
          <Link href="/contact" className="hover:text-blue-500 transition-colors">
            Contact Us
          </Link>
          <Link href="/faq" className="hover:text-blue-500 transition-colors">
            FAQ
          </Link>
        </div>

        {/* Section Social Media */}
        <div className="flex gap-4">
          <Link
            href="https://www.facebook.com/profile.php?id=61569449547187"
            target="_blank"
            className="hover:text-blue-600 transition-colors"
          >
            <FaFacebookF size={20} />
          </Link>
          <div
            className="hover:text-green-700 transition-colors flex items-center gap-2"
          >
            <FaWhatsapp size={20} /> 
            <span>(+82) 010-****-***</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
