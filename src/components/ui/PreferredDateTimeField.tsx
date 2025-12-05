import { useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PreferredDateTimeModal } from './PreferredDateTimeModal';
import type { PreferredDateTime } from '../../types/booking';
import { formatPreferredDateTime } from '../../types/booking';

interface PreferredDateTimeFieldProps {
  /** Label do campo */
  label: string;
  /** Valor atual */
  value: PreferredDateTime;
  /** Callback quando o valor muda */
  onChange: (value: PreferredDateTime) => void;
  /** Indica se o campo é obrigatório */
  required?: boolean;
  /** Mensagem de erro */
  error?: string;
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * Campo de seleção de data e horário preferencial
 * 
 * Este componente exibe um campo visual no formulário que, ao ser clicado,
 * abre um modal para seleção de data e horário.
 * 
 * Os dados selecionados são preparados para integração futura com o
 * painel administrativo (Dashboard) da Styllu's Barber Shop.
 */
export function PreferredDateTimeField({
  label,
  value,
  onChange,
  required = false,
  error,
  className,
}: PreferredDateTimeFieldProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedValue = formatPreferredDateTime(value);
  const hasValue = value.date !== null && value.time !== null;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = (dateTime: PreferredDateTime) => {
    onChange(dateTime);
    setIsModalOpen(false);
  };

  return (
    <div className={cn('w-full', className)}>
      <label className="block text-sm font-medium text-dark-300 mb-2">
        {label}
        {required && <span className="text-secondary-500 ml-1">*</span>}
      </label>

      {/* Campo clicável (trigger) */}
      <button
        type="button"
        onClick={handleOpenModal}
        className={cn(
          'w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700',
          'flex items-center gap-3 text-left',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'transition-all duration-200',
          'hover:border-dark-600 hover:bg-dark-800/50',
          'group cursor-pointer',
          error && 'border-red-500 focus:ring-red-500'
        )}
      >
        {/* Ícone */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
          <CalendarClock className="w-5 h-5 text-primary-500" />
        </div>

        {/* Texto */}
        <div className="flex-grow min-w-0">
          {hasValue ? (
            <span className="text-white truncate block">{formattedValue}</span>
          ) : (
            <span className="text-dark-500">Selecione data e horário</span>
          )}
        </div>

        {/* Indicador visual */}
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-dark-500 group-hover:text-dark-400 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Mensagem de erro */}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}

      {/* Modal de seleção */}
      <PreferredDateTimeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        initialValue={value}
      />
    </div>
  );
}
