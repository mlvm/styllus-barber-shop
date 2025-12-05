import { SectionTitle } from '../ui/SectionTitle';
import { GalleryItem } from '../ui/GalleryItem';
import type { GalleryImage } from '../ui/GalleryItem';

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=800&fit=crop',
    alt: 'Corte Moderno Degradê',
    category: 'Cortes',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&h=800&fit=crop',
    alt: 'Barba Estilizada',
    category: 'Barbas',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=800&fit=crop',
    alt: 'Ambiente Premium',
    category: 'Ambiente',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=800&fit=crop',
    alt: 'Detalhes de Precisão',
    category: 'Cortes',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=800&fit=crop',
    alt: 'Cadeira de Barbeiro Clássica',
    category: 'Ambiente',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&h=800&fit=crop',
    alt: 'Fade Perfeito',
    category: 'Cortes',
  },
];

export function GallerySection() {
  return (
    <section id="galeria" className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Efeitos decorativos */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      
      <div className="container-custom">
        <SectionTitle 
          title="Nossa Galeria"
          subtitle="Confira alguns dos nossos trabalhos e o ambiente exclusivo da Styllu's"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <GalleryItem
              key={image.id}
              image={image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
