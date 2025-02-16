export interface CarType {
  images: string[];           // List of image URLs
  price: string;           // Price of the car
  kilometre: string;       // Mileage of the car
  type: string;            // Car type (e.g., Sedan, SUV)
  name: string;            // Name/Model of the car
  year: string;            // Year of manufacture
  fuelType: string;        // Fuel type (e.g., Petrol, Diesel)
  color: string;           // Car color
  transmission: string;    // Transmission type (e.g., Automatic, Manual)
  engineSize?: string;     // Engine size (if available)
  horsepower: string;      // Horsepower
  description: string;     // Additional description
  features: string[];      // List of car features (e.g., GPS, AC)
  condition: string;       // Condition of the car (e.g., New, Used)
  location: string;        // Location of the car
  sellerContact?: string;  // Contact info for the seller
  publicationDate: string; // Date of publication
}
