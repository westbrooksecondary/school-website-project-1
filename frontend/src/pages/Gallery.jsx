import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1758611228434-7b5b697abd0a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBzY2hvb2wlMjBidWlsZGluZyUyMGNhbXB1c3xlbnwwfHx8fDE3NzQ3MjQ0MDl8MA&ixlib=rb-4.1.0&q=85',
      title: 'School Campus',
      category: 'Infrastructure',
      span: 'col-span-2 row-span-2',
    },
    {
      url: 'https://images.pexels.com/photos/5299833/pexels-photo-5299833.jpeg',
      title: 'Classroom Learning',
      category: 'Academics',
      span: 'col-span-1 row-span-1',
    },
    {
      url: 'https://images.pexels.com/photos/247823/pexels-photo-247823.jpeg',
      title: 'Modern Building',
      category: 'Infrastructure',
      span: 'col-span-1 row-span-1',
    },
    {
      url: 'https://images.unsplash.com/photo-1758270704524-596810e891b5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHw0fHxzdHVkZW50cyUyMGluJTIwY2xhc3Nyb29tJTIwbGVhcm5pbmd8ZW58MHx8fHwxNzc0NzI0NDA5fDA&ixlib=rb-4.1.0&q=85',
      title: 'Students Learning',
      category: 'Classroom',
      span: 'col-span-1 row-span-1',
    },
    {
      url: 'https://images.pexels.com/photos/5212321/pexels-photo-5212321.jpeg',
      title: 'Teacher in Class',
      category: 'Teaching',
      span: 'col-span-1 row-span-2',
    },
    {
      url: 'https://static.prod-images.emergentagent.com/jobs/17e4a968-4874-48c0-8afa-781fc5997026/images/0676cbca2094df9c0eab55c7735e96269b97d3738492735fbe7cf9cce3b27e54.png',
      title: 'School Activities',
      category: 'Events',
      span: 'col-span-2 row-span-1',
    },
  ];

  return (
    <div className="min-h-screen" data-testid="gallery-page">
      {/* Header */}
      <section className="bg-indigo-950 text-white py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-bold mb-4">
              Gallery
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl">
              Explore our campus, classrooms, events, and student activities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Gallery */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-[250px]" data-testid="gallery-grid">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`${image.span} relative overflow-hidden rounded-md border border-slate-200 cursor-pointer group`}
                data-testid={`gallery-item-${index}`}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-1">
                      {image.category}
                    </p>
                    <h3 className="text-lg font-semibold text-white">{image.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;