import { Trash2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { Appointment } from '../../../types/appointment';

interface AppointmentDeleteButtonProps {
  appointment: Appointment;
  onDelete: (appointment: Appointment) => void;
  className?: string;
}

/**
 * Botão de exclusão para agendamentos
 * Exibe um ícone de lixeira que abre o modal de confirmação de exclusão
 */
export function AppointmentDeleteButton({ 
  appointment, 
  onDelete,
  className 
}: AppointmentDeleteButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Impede que o clique propague para a linha (que abriria o modal de edição)
    e.stopPropagation();
    onDelete(appointment);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'p-2 rounded-lg transition-all duration-200',
        'text-dark-400 hover:text-red-400 hover:bg-red-500/10',
        'focus:outline-none focus:ring-2 focus:ring-red-500/50',
        className
      )}
      title="Excluir agendamento"
      aria-label="Excluir agendamento"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
