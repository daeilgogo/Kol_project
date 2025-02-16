'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

type Filters = {
  fabricant: string;
  annee: [number, number];
  kilometrage: [number, number];
  prix: [number, number];
};

type Voiture = {
  id: string;
  fabricant: string;
  annee: number;
  prix: number;
  kilometrage: number;
  images: string[];
};

type ApiCar = {
  _id: string;
  title: string;
  price: string;
  features: {
    mileage: string;
  };
  images: string[];
};

const Search = () => {
  const [filters, setFilters] = useState<Filters>({
    fabricant: '',
    annee: [2000, 2025],
    kilometrage: [0, 300000],
    prix: [0, 100000],
  });

  const [resultats, setResultats] = useState<Voiture[]>([]);
  const [voitures, setVoitures] = useState<Voiture[]>([]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRangeChange = (
    name: keyof Filters,
    values: [number, number]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [name]: values,
    }));
  };

  const handleSearch = () => {
    const filtered = voitures.filter((voiture) => {
      const matchesFabricant = filters.fabricant
        ? voiture.fabricant.toLowerCase().includes(filters.fabricant.toLowerCase())
        : true;

      const matchesAnnee =
        voiture.annee >= filters.annee[0] && voiture.annee <= filters.annee[1];

      const matchesKilometrage =
        voiture.kilometrage >= filters.kilometrage[0] &&
        voiture.kilometrage <= filters.kilometrage[1];

      const matchesPrix =
        voiture.prix >= filters.prix[0] && voiture.prix <= filters.prix[1];

      return matchesFabricant && matchesAnnee && matchesKilometrage && matchesPrix;
    });

    setResultats(filtered);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/Products/get');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();

      // Format the data from the API to match the Voiture type
      const formattedData = data.contents.map((item: ApiCar) => ({
        id: item._id,
        fabricant: item.title.split(' ')[0],
        annee: parseInt(item.title.split(' ')[1]),
        prix: parseFloat(item.price),
        kilometrage: parseFloat(item.features.mileage),
        images: item.images || [],
      }));

      setVoitures(formattedData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Recherche de Voitures</h1>

      {/* Filtres */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Fabricant */}
        <select
          name="fabricant"
          value={filters.fabricant}
          onChange={handleFilterChange}
          className="p-2 border rounded-xl shadow-2xl"
        >
          <option value="">Tous les fabricants</option>
          <option value="Renault">Renault</option>
          <option value="Peugeot">Peugeot</option>
          <option value="Citroën">Citroën</option>
          <option value="Toyota">Toyota</option>
        </select>

        {/* Année */}
        <div>
          <label className="block font-semibold">Année</label>
          <input
            type="range"
            min="2000"
            max="2025"
            value={filters.annee[0]}
            onChange={(e) =>
              handleRangeChange('annee', [Number(e.target.value), filters.annee[1]])
            }
            className="w-full"
          />
          <input
            type="range"
            min="2000"
            max="2025"
            value={filters.annee[1]}
            onChange={(e) =>
              handleRangeChange('annee', [filters.annee[0], Number(e.target.value)])
            }
            className="w-full"
          />
          <p>
            {filters.annee[0]} - {filters.annee[1]}
          </p>
        </div>

        {/* Kilométrage */}
        <div>
          <label className="block font-semibold">Kilométrage (km)</label>
          <input
            type="range"
            min="0"
            max="300000"
            value={filters.kilometrage[0]}
            onChange={(e) =>
              handleRangeChange('kilometrage', [
                Number(e.target.value),
                filters.kilometrage[1],
              ])
            }
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="300000"
            value={filters.kilometrage[1]}
            onChange={(e) =>
              handleRangeChange('kilometrage', [
                filters.kilometrage[0],
                Number(e.target.value),
              ])
            }
            className="w-full"
          />
          <p>
            {filters.kilometrage[0]} km - {filters.kilometrage[1]} km
          </p>
        </div>

        {/* Prix */}
        <div>
          <label className="block font-semibold">Prix (€)</label>
          <input
            type="range"
            min="0"
            max="100000"
            value={filters.prix[0]}
            onChange={(e) =>
              handleRangeChange('prix', [Number(e.target.value), filters.prix[1]])
            }
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="100000"
            value={filters.prix[1]}
            onChange={(e) =>
              handleRangeChange('prix', [filters.prix[0], Number(e.target.value)])
            }
            className="w-full"
          />
          <p>
            {filters.prix[0]} € - {filters.prix[1]} €
          </p>
        </div>
      </div>

      {/* Bouton de recherche */}
      <button
        onClick={handleSearch}
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
      >
        Rechercher
      </button>

      {/* Résultats */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Résultats</h2>
        {resultats.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {resultats.map((voiture) => (
              <div key={voiture.id} className="border rounded p-4 bg-white shadow">
                <h3 className="font-bold">{voiture.fabricant}</h3>
                <p>Année : {voiture.annee}</p>
                <p>Prix : {voiture.prix} €</p>
                <p>Kilométrage : {voiture.kilometrage} km</p>
                <Link href={`/detail/${voiture.id}`} passHref>
                  <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">Aucun résultat trouvé</p>
        )}
      </div>
    </div>
  );
};

export default Search;
