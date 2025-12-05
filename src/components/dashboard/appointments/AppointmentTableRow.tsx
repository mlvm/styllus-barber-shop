import { cn } from '../../../lib/utils';
import { services } from '../../sections/ServicesSection';
import { AppointmentDeleteButton } from './AppointmentDeleteButton';
import type { Appointment } from '../../../types/appointment';
import { 
  STATUS_LABELS, 
  STATUS_COLORS, 
  formatDate 
} from '../../../types/appointment';

interface AppointmentTableRowProps {
  appointment: Appointment;
  onRowClick: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
  isLastRow?: boolean;
}

/**
 * Componente de linha da tabela de agendamentos
 * - Clique na linha abre o modal de edição
 * - Botão de excluir na coluna de ações
 */
export function AppointmentTableRow({ 
  appointment, 
  onRowClick, 
  onDelete,
  isLastRow = false 
}: AppointmentTableRowProps) {
  // Busca o nome do serviço pelo ID
  const getServiceName = (serviceId: string): string => {
    const service = services.find(s => s.id === serviceId);
    return service?.name || 'Serviço não encontrado';
  };

  const handleRowClick = () => {
    onRowClick(appointment);
  };

  return (
    <tr 
      onClick={handleRowClick}
      className={cn(
        "border-b border-dark-800 hover:bg-dark-800/50 transition-colors cursor-pointer",
        isLastRow && "border-b-0"
      )}
    >
      {/* Cliente */}
      <td className="px-6 py-4">
        <span 
          className="text-white font-medium truncate block"
          title={appointment.nomeCliente}
        >
          {appointment.nomeCliente}
        </span>
      </td>
      {/* Telefone */}
      <td className="px-6 py-4">
        <span 
          className="text-dark-300 truncate block"
          title={appointment.telefone}
        >
          {appointment.telefone}
        </span>
      </td>
      {/* Serviço */}
      <td className="px-6 py-4">
        <span 
          className="text-dark-300 truncate block"
          title={getServiceName(appointment.servico)}
        >
          {getServiceName(appointment.servico)}
        </span>
      </td>
      {/* Data */}
      <td className="px-6 py-4">
        <span className="text-dark-300">
          {formatDate(new Date(appointment.dataPreferencial))}
        </span>
      </td>
      {/* Hora */}
      <td className="px-6 py-4">
        <span className="text-dark-300">
          {appointment.horaPreferencial}
        </span>
      </td>
      {/* Status */}
      <td className="px-6 py-4">
        <StatusBadge status={appointment.status} />
      </td>
      {/* Ações - Apenas botão de excluir */}
      <td className="px-4 py-4">
        <div className="flex items-center justify-end">
          <AppointmentDeleteButton
            appointment={appointment}
            onDelete={onDelete}
          />
        </div>
      </td>
    </tr>
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
