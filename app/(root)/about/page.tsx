import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          About Us
        </h1>

        {/* Section de présentation */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-lg leading-relaxed text-justify">
            We are a trusted company based in South Korea, specializing in the
            export of high-quality, pre-owned vehicles to international markets.
            Our primary focus is on delivering reliable cars to countries across
            Africa, where quality, affordability, and trust matter the most.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed text-justify">
            Our mission is to connect buyers in Africa and other international
            markets with top-tier, used vehicles from South Korea. We ensure
            every car meets high standards of performance, safety, and value for
            money. Customer satisfaction is at the heart of our operations.
          </p>
        </section>

        {/* Pourquoi nous choisir */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-lg leading-relaxed text-justify">
            <li>
              <span className="font-medium">Quality Assurance:</span> Each
              vehicle undergoes rigorous inspection and maintenance.
            </li>
            <li>
              <span className="font-medium">Competitive Prices:</span> We offer
              affordable prices without compromising on quality.
            </li>
            <li>
              <span className="font-medium">International Shipping:</span> Fast
              and secure delivery to your preferred location in Africa.
            </li>
            <li>
              <span className="font-medium">Customer Support:</span> We provide
              seamless communication and assistance throughout the buying
              process.
            </li>
          </ul>
        </section>

        {/* Image illustrative */}
          <div className='relative w-full h-[500px]'>
            <Image src='/p2.png' alt='' fill className='object-contain shadow-sm'/>
          </div>

        {/* Contact */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">Get In Touch</h2>
          <p className="text-lg leading-relaxed mb-4 text-justify">
            Interested in purchasing high-quality used cars? Contact us today
            and let us help you find the perfect vehicle for your needs.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Contact Us
          </a>
        </section>
      </div>
      
    </div>
  );
};

export default page;
