import { Calendar } from 'lucide-react';
import { AppointmentTableRow } from './AppointmentTableRow';
import { AppointmentMobileCard } from './AppointmentMobileCard';
import type { Appointment } from '../../../types/appointment';

interface AppointmentsTableProps {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
}

/**
 * Tabela de agendamentos com visualização responsiva
 * 
 * Comportamento:
 * - Desktop: Tabela com linhas clicáveis para edição
 * - Mobile: Cards clicáveis para edição
 * - Coluna "Ações" exibe apenas o botão de excluir
 * - Clique na linha/card abre o modal de edição
 */
export function AppointmentsTable({ appointments, onEdit, onDelete }: AppointmentsTableProps) {
  if (appointments.length === 0) {
    return (
      <div className="bg-dark-900 border border-dark-800 rounded-2xl p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-dark-500" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Nenhum agendamento encontrado
        </h3>
        <p className="text-dark-400">
          Não há agendamentos com os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-dark-900 border border-dark-800 rounded-2xl overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-dark-800">
              {/* Cliente - 22% */}
              <th className="text-left px-6 py-4 text-dark-400 font-medium text-sm w-[22%] min-w-[180px]">
                Cliente
              </th>
              {/* Telefone - 16% */}
              <th className="text-left px-6 py-4 text-dark-400 font-medium text-sm w-[16%] min-w-[140px]">
                Telefone
              </th>
              {/* Serviço - 22% */}
              <th className="text-left px-6 py-4 text-dark-400 font-medium text-sm w-[22%] min-w-[160px]">
                Serviço
              </th>
              {/* Data - 12% */}
              <th className="text-left px-6 py-4 text-dark-400 font-medium text-sm w-[12%] min-w-[100px]">
                Data
              </th>
              {/* Hora - 8% */}
              <th className="text-left px-6 py-4 text-dark-400 font-medium text-sm w-[8%] min-w-[70px]">
                Hora
              </th>
              {/* Status - 14% */}
              <th className="text-left px-6 py-4 text-dark-400 font-medium text-sm w-[14%] min-w-[130px]">
                Status
              </th>
              {/* Ações - 6% (apenas botão de excluir) */}
              <th className="text-right px-4 py-4 text-dark-400 font-medium text-sm w-[6%] min-w-[50px]">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <AppointmentTableRow
                key={appointment.id}
                appointment={appointment}
                onRowClick={onEdit}
                onDelete={onDelete}
                isLastRow={index === appointments.length - 1}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-dark-800">
        {appointments.map((appointment) => (
          <AppointmentMobileCard
            key={appointment.id}
            appointment={appointment}
            onCardClick={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
