import { SectionTitle } from '../ui/SectionTitle';
import { ServiceCard } from '../ui/ServiceCard';
import type { Service } from '../ui/ServiceCard';

export const services: Service[] = [
  {
    id: '1',
    name: 'Corte Masculino',
    description: 'Corte personalizado de acordo com seu estilo e tipo de cabelo. Inclui lavagem e finalização.',
    price: 'R$ 45',
    duration: '40 min',
  },
  {
    id: '2',
    name: 'Barba Completa',
    description: 'Aparação e modelagem de barba com navalha, toalha quente e produtos hidratantes.',
    price: 'R$ 35',
    duration: '30 min',
  },
  {
    id: '3',
    name: 'Sobrancelha',
    description: 'Design e limpeza de sobrancelha para um olhar mais expressivo e alinhado.',
    price: 'R$ 20',
    duration: '15 min',
  },
  {
    id: '4',
    name: 'Combo Corte + Barba',
    description: 'O pacote completo: corte masculino + barba completa com desconto especial.',
    price: 'R$ 70',
    duration: '1h 10min',
  },
  {
    id: '5',
    name: 'Hidratação Capilar',
    description: 'Tratamento intensivo para cabelos ressecados, devolvendo brilho e maciez.',
    price: 'R$ 50',
    duration: '45 min',
  },
  {
    id: '6',
    name: 'Pigmentação de Barba',
    description: 'Coloração natural para cobrir falhas e fios brancos da barba.',
    price: 'R$ 60',
    duration: '50 min',
  },
];

export function ServicesSection() {
  return (
    <section id="servicos" className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Efeitos decorativos */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-secondary-500/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <SectionTitle 
          title="Nossos Serviços"
          subtitle="Serviços de alta qualidade para cuidar do seu visual com excelência"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
