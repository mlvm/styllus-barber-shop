import { cn } from '../../lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function SectionTitle({ 
  title, 
  subtitle, 
  className,
  align = 'center' 
}: SectionTitleProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('mb-12 md:mb-16', alignClasses[align], className)}>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide mb-4">
        <span className="gold-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-dark-400 text-lg md:text-xl max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={cn(
        'mt-6 h-1 w-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full',
        align === 'center' && 'mx-auto',
        align === 'right' && 'ml-auto'
      )} />
    </div>
  );
}
