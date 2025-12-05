import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration?: string;
}

interface ServiceCardProps {
  service: Service;
  className?: string;
  index?: number;
}

export function ServiceCard({ service, className, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-dark-900 border border-dark-800 hover:border-primary-500/50 transition-all duration-300',
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors duration-300">
            {service.name}
          </h3>
          <span className="text-2xl font-bold gold-text">
            {service.price}
          </span>
        </div>
        
        <p className="text-dark-400 mb-4 leading-relaxed">
          {service.description}
        </p>
        
        {service.duration && (
          <div className="flex items-center text-sm text-dark-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {service.duration}
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
