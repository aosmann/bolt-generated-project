import React from 'react';
import ListingCard from './ListingCard';

function FeaturedListings() {
  const listings = [
    {
      id: 1,
      title: 'Modern Apartment in Downtown',
      price: '$1,200,000',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad6d1ba654?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW9kZXJuJTIwYXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
      location: 'Downtown'
    },
    {
      id: 2,
      title: 'Luxury Villa with Pool',
      price: '$3,500,000',
      image: 'https://images.unsplash.com/photo-1568605114967-8dd365f31a2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bHV4dXJ5JTIwdmlsbGF8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60',
      location: 'Beverly Hills'
    },
    {
      id: 3,
      title: 'Cozy House in the Suburbs',
      price: '$850,000',
      image: 'https://images.unsplash.com/photo-1583847268964-b28a1d638565?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
      location: 'Suburbs'
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedListings;
