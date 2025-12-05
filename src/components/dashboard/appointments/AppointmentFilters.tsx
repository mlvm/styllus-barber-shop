import { Search, Filter } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { AppointmentStatus } from '../../../types/appointment';
import { STATUS_LABELS, ALL_STATUSES } from '../../../types/appointment';

interface AppointmentFiltersProps {
  statusFilter: AppointmentStatus | 'todos';
  onStatusFilterChange: (status: AppointmentStatus | 'todos') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

/**
 * Componente de filtros para a tabela de agendamentos
 */
export function AppointmentFilters({
  statusFilter,
  onStatusFilterChange,
  searchTerm,
  onSearchChange,
}: AppointmentFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      {/* Busca por nome/telefone */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nome ou telefone..."
          className={cn(
            'w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl',
            'bg-dark-900 border border-dark-700 text-white placeholder-dark-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'transition-all duration-200'
          )}
        />
      </div>

      {/* Filtro por status */}
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as AppointmentStatus | 'todos')}
          className={cn(
            'w-full sm:w-48 pl-10 pr-4 py-2.5 rounded-xl appearance-none cursor-pointer',
            'bg-dark-900 border border-dark-700 text-white',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'transition-all duration-200',
            'bg-[url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")] bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat'
          )}
        >
          <option value="todos">Todos os status</option>
          {ALL_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
