// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Initial default property data. This will only be used once if localStorage is empty.
    const initialProperties = [
        { id: 1, price: 9500000, type: "3 BHK Bungalow", location: "Kasba Bawada, Kolhapur", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop", category: "bungalow", status: "For Sale" },
        { id: 2, price: 25000, type: "2 BHK Flat", location: "Rajarampuri, Kolhapur", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop", category: "flat", status: "For Rent" },
        { id: 3, price: 12000000, type: "4 BHK Villa", location: "Shahupuri, Kolhapur", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", category: "villa", status: "For Sale" },
        { id: 4, price: 18000, type: "3 BHK Row House", location: "Morewadi, Kolhapur", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop", category: "row-house", status: "For Rent" },
        { id: 5, price: 6500000, type: "2 BHK Penthouse", location: "Tarabai Park, Kolhapur", image: "https://images.unsplash.com/photo-1600585152225-3579fe9d7ae2?q=80&w=800&auto=format&fit=crop", category: "penthouse", status: "For Sale" },
        { id: 6, price: 12000, type: "1 BHK Apartment", location: "Sane Guruji Vasahat, Kolhapur", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop", category: "flat", status: "For Rent" }
    ];

    // --- Global Property Management Functions ---

    // Initialize properties in localStorage if not already present
    if (!localStorage.getItem('properties')) {
        localStorage.setItem('properties', JSON.stringify(initialProperties));
    }

    // Function to get all properties from localStorage
    window.getProperties = () => {
        return JSON.parse(localStorage.getItem('properties')) || [];
    };

    // Function to save all properties to localStorage
    window.saveProperties = (properties) => {
        localStorage.setItem('properties', JSON.stringify(properties));
    };

    // Function to get a single property by its ID
    window.getPropertyById = (id) => {
        const properties = window.getProperties();
        // Use == because the id from the URL will be a string
        return properties.find(p => p.id == id);
    };
    
    // Function to read an uploaded file and convert it to a Base64 string for storage
    window.readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };
});