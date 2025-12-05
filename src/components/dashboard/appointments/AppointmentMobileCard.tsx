import { User, Phone } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { services } from '../../sections/ServicesSection';
import { AppointmentDeleteButton } from './AppointmentDeleteButton';
import type { Appointment } from '../../../types/appointment';
import { 
  STATUS_LABELS, 
  STATUS_COLORS, 
  formatDate 
} from '../../../types/appointment';

interface AppointmentMobileCardProps {
  appointment: Appointment;
  onCardClick: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
}

/**
 * Card de agendamento para visualização mobile
 * - Clique no card abre o modal de edição
 * - Botão de excluir separado
 */
export function AppointmentMobileCard({ 
  appointment, 
  onCardClick, 
  onDelete 
}: AppointmentMobileCardProps) {
  // Busca o nome do serviço pelo ID
  const getServiceName = (serviceId: string): string => {
    const service = services.find(s => s.id === serviceId);
    return service?.name || 'Serviço não encontrado';
  };

  const handleCardClick = () => {
    onCardClick(appointment);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="p-4 space-y-3 cursor-pointer hover:bg-dark-800/50 transition-colors"
    >
      {/* Header do card com nome, telefone e botão de excluir */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-primary-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p 
              className="text-white font-medium truncate"
              title={appointment.nomeCliente}
            >
              {appointment.nomeCliente}
            </p>
            <div className="flex items-center gap-1 text-dark-400 text-sm">
              <Phone className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{appointment.telefone}</span>
            </div>
          </div>
        </div>
        {/* Botão de excluir */}
        <AppointmentDeleteButton
          appointment={appointment}
          onDelete={onDelete}
        />
      </div>

      {/* Status badge */}
      <div className="flex flex-wrap gap-2">
        <StatusBadge status={appointment.status} />
      </div>

      {/* Informações do agendamento */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="min-w-0">
          <span className="text-dark-500">Serviço:</span>
          <p 
            className="text-dark-300 truncate"
            title={getServiceName(appointment.servico)}
          >
            {getServiceName(appointment.servico)}
          </p>
        </div>
        <div>
          <span className="text-dark-500">Data/Hora:</span>
          <p className="text-dark-300">
            {formatDate(new Date(appointment.dataPreferencial))} às {appointment.horaPreferencial}
          </p>
        </div>
      </div>

      {/* Mensagem opcional */}
      {appointment.mensagem && (
        <div className="text-sm">
          <span className="text-dark-500">Mensagem:</span>
          <p className="text-dark-400 italic line-clamp-2">"{appointment.mensagem}"</p>
        </div>
      )}
    </div>
  );
}

/**
 * Badge de status do agendamento
 */
function StatusBadge({ status }: { status: Appointment['status'] }) {
  const colors = STATUS_COLORS[status];
  
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border whitespace-nowrap',
      colors.bg,
      colors.text,
      colors.border
    )}>
      {STATUS_LABELS[status]}
    </span>
  );
}
