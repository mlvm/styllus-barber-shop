import { Scissors } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
};

export function Logo({ className, size = 'md', showText = true }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative">
        <div className={cn(
          'bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-full p-2 shadow-lg shadow-primary-500/20',
          sizeClasses[size]
        )}>
          <Scissors className="w-full h-full text-dark-950 transform -rotate-45" />
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full blur opacity-30 -z-10" />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn(
            'font-display font-bold tracking-wider gold-text',
            textSizeClasses[size]
          )}>
            STYLLU'S
          </span>
          <span className={cn(
            'font-display font-medium text-white/90 tracking-widest',
            size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
          )}>
            BARBER SHOP
          </span>
        </div>
      )}
    </div>
  );
}
