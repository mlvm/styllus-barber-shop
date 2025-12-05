import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { PreferredDateTime, AvailableTimeSlot } from '../../types/booking';

interface PreferredDateTimeModalProps {
  /** Estado de abertura do modal */
  isOpen: boolean;
  /** Callback para fechar o modal */
  onClose: () => void;
  /** Callback para confirmar a seleção */
  onConfirm: (dateTime: PreferredDateTime) => void;
  /** Valor inicial (se já existir uma seleção anterior) */
  initialValue?: PreferredDateTime;
}

// Nomes dos dias da semana em português
const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// Nomes dos meses em português
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

/**
 * Horários disponíveis (mockados por enquanto)
 * TODO: Futuramente, esses dados virão do backend baseado na disponibilidade real
 */
const DEFAULT_TIME_SLOTS: AvailableTimeSlot[] = [
  { time: '09:00', available: true },
  { time: '09:30', available: true },
  { time: '10:00', available: true },
  { time: '10:30', available: true },
  { time: '11:00', available: true },
  { time: '11:30', available: true },
  { time: '12:00', available: false }, // Exemplo de horário indisponível
  { time: '12:30', available: false },
  { time: '13:00', available: true },
  { time: '13:30', available: true },
  { time: '14:00', available: true },
  { time: '14:30', available: true },
  { time: '15:00', available: true },
  { time: '15:30', available: true },
  { time: '16:00', available: true },
  { time: '16:30', available: true },
  { time: '17:00', available: true },
  { time: '17:30', available: true },
  { time: '18:00', available: true },
  { time: '18:30', available: true },
  { time: '19:00', available: true },
  { time: '19:30', available: true },
];

export function PreferredDateTimeModal({
  isOpen,
  onClose,
  onConfirm,
  initialValue,
}: PreferredDateTimeModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialValue?.date || null);
  const [selectedTime, setSelectedTime] = useState<string | null>(initialValue?.time || null);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  // Reseta os valores quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setSelectedDate(initialValue?.date || null);
      setSelectedTime(initialValue?.time || null);
      if (initialValue?.date) {
        setCurrentMonth(new Date(initialValue.date.getFullYear(), initialValue.date.getMonth(), 1));
      }
    }
  }, [isOpen, initialValue]);

  // Previne scroll do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Gera os dias do calendário para o mês atual
  const generateCalendarDays = useCallback(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    
    const days: (Date | null)[] = [];
    
    // Dias vazios antes do primeiro dia do mês
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  }, [currentMonth]);

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm({
        date: selectedDate,
        time: selectedTime,
      });
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Desabilita dias passados e domingos
    return date < today || date.getDay() === 0;
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const canGoToPreviousMonth = () => {
    const today = new Date();
    return currentMonth > new Date(today.getFullYear(), today.getMonth(), 1);
  };

  const calendarDays = generateCalendarDays();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-700">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Escolha a data e o horário
                  </h2>
                  <p className="text-sm text-dark-400 mt-1">
                    Selecione o dia e o horário que você prefere ser atendido.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Calendário */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={handlePreviousMonth}
                        disabled={!canGoToPreviousMonth()}
                        className={cn(
                          'p-2 rounded-lg transition-colors',
                          canGoToPreviousMonth()
                            ? 'text-dark-400 hover:text-white hover:bg-dark-800'
                            : 'text-dark-600 cursor-not-allowed'
                        )}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <h3 className="text-white font-medium">
                        {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </h3>
                      <button
                        onClick={handleNextMonth}
                        className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Dias da semana */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {WEEKDAYS.map((day) => (
                        <div
                          key={day}
                          className="text-center text-xs font-medium text-dark-500 py-2"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Grid do calendário */}
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((date, index) => {
                        if (!date) {
                          return <div key={`empty-${index}`} className="aspect-square" />;
                        }

                        const disabled = isDateDisabled(date);
                        const selected = isDateSelected(date);
                        const today = isToday(date);

                        return (
                          <button
                            key={date.toISOString()}
                            onClick={() => !disabled && handleDateSelect(date)}
                            disabled={disabled}
                            className={cn(
                              'aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all',
                              disabled && 'text-dark-600 cursor-not-allowed',
                              !disabled && !selected && 'text-dark-300 hover:bg-dark-800 hover:text-white',
                              selected && 'bg-primary-500 text-dark-950',
                              today && !selected && 'ring-1 ring-primary-500/50'
                            )}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Horários */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-primary-500" />
                      <h3 className="text-white font-medium">Horários Disponíveis</h3>
                    </div>

                    {selectedDate ? (
                      <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-2">
                        {DEFAULT_TIME_SLOTS.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => slot.available && handleTimeSelect(slot.time)}
                            disabled={!slot.available}
                            className={cn(
                              'py-2 px-3 rounded-lg text-sm font-medium transition-all',
                              !slot.available && 'bg-dark-800 text-dark-600 cursor-not-allowed line-through',
                              slot.available && selectedTime !== slot.time && 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white',
                              selectedTime === slot.time && 'bg-primary-500 text-dark-950'
                            )}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-64 text-dark-500 text-sm">
                        Selecione uma data para ver os horários disponíveis
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-dark-700 bg-dark-950/50">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!selectedDate || !selectedTime}
                  className={cn(
                    'px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2',
                    selectedDate && selectedTime
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-dark-950 hover:from-primary-400 hover:to-primary-500 shadow-lg shadow-primary-500/30'
                      : 'bg-dark-700 text-dark-500 cursor-not-allowed'
                  )}
                >
                  <Check className="w-4 h-4" />
                  Confirmar
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
