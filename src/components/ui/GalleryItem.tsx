import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category?: string;
}

interface GalleryItemProps {
  image: GalleryImage;
  className?: string;
  index?: number;
}

export function GalleryItem({ image, className, index = 0 }: GalleryItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={cn(
          'group relative aspect-square overflow-hidden rounded-xl cursor-pointer',
          className
        )}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div>
            <p className="text-white font-medium">{image.alt}</p>
            {image.category && (
              <span className="text-primary-400 text-sm">{image.category}</span>
            )}
          </div>
        </div>
        
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/50 rounded-xl transition-colors duration-300" />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/90 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-primary-400 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain rounded-xl"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-950 to-transparent rounded-b-xl">
                <p className="text-white font-medium text-lg">{image.alt}</p>
                {image.category && (
                  <span className="text-primary-400">{image.category}</span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
