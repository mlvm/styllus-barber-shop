import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  index?: number;
}

export function FeatureCard({ 
  icon, 
  title, 
  description, 
  className,
  index = 0 
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        'group relative p-6 rounded-2xl bg-dark-900/50 border border-dark-800 hover:border-primary-500/50 transition-all duration-300',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      
      <div className="relative z-10">
        <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-dark-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
