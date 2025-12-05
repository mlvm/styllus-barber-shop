import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { DashboardHeader } from '../DashboardHeader';
import { AppointmentsTable } from './AppointmentsTable';
import { AppointmentFilters } from './AppointmentFilters';
import { AppointmentFormDialog } from './AppointmentFormDialog';
import { AppointmentDeleteDialog } from './AppointmentDeleteDialog';
import { useAppointments } from '../../../contexts/AppointmentsContext';
import type { Appointment, AppointmentStatus } from '../../../types/appointment';

/**
 * Página principal do módulo de Agendamentos
 * Gerencia a visualização, criação, edição e exclusão de agendamentos
 */
export function AppointmentsPage() {
  // Estados para controle dos dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [deletingAppointment, setDeletingAppointment] = useState<Appointment | null>(null);
  
  // Estados para filtros
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'todos'>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const { appointments, filterByStatus, searchAppointments } = useAppointments();

  // Filtra os agendamentos baseado nos filtros aplicados
  const filteredAppointments = useMemo(() => {
    let result = filterByStatus(statusFilter);
    
    if (searchTerm.trim()) {
      const searchResults = searchAppointments(searchTerm);
      result = result.filter(apt => searchResults.some(sr => sr.id === apt.id));
    }

    // Ordena por data mais recente primeiro
    return result.sort((a, b) => 
      new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
    );
  }, [appointments, statusFilter, searchTerm, filterByStatus, searchAppointments]);

  // Handlers
  const handleOpenCreateDialog = () => setIsCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setIsCreateDialogOpen(false);

  const handleOpenEditDialog = (appointment: Appointment) => {
    setEditingAppointment(appointment);
  };
  const handleCloseEditDialog = () => setEditingAppointment(null);

  const handleOpenDeleteDialog = (appointment: Appointment) => {
    setDeletingAppointment(appointment);
  };
  const handleCloseDeleteDialog = () => setDeletingAppointment(null);

  return (
    <>
      <DashboardHeader 
        title="Agendamentos" 
        subtitle="Gerencie os agendamentos feitos pelos clientes na Styllu's Barber Shop"
      />

      {/* Barra de ações */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
      >
        <AppointmentFilters
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <button
          onClick={handleOpenCreateDialog}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-dark-950 font-semibold rounded-xl hover:from-primary-400 hover:to-primary-500 transition-all shadow-lg shadow-primary-500/30 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Novo Agendamento
        </button>
      </motion.div>

      {/* Tabela de agendamentos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <AppointmentsTable
          appointments={filteredAppointments}
          onEdit={handleOpenEditDialog}
          onDelete={handleOpenDeleteDialog}
        />
      </motion.div>

      {/* Dialog de criação */}
      <AppointmentFormDialog
        isOpen={isCreateDialogOpen}
        mode="create"
        onClose={handleCloseCreateDialog}
      />

      {/* Dialog de edição */}
      <AppointmentFormDialog
        isOpen={!!editingAppointment}
        mode="edit"
        appointment={editingAppointment}
        onClose={handleCloseEditDialog}
      />

      {/* Dialog de exclusão */}
      <AppointmentDeleteDialog
        isOpen={!!deletingAppointment}
        appointment={deletingAppointment}
        onClose={handleCloseDeleteDialog}
      />
    </>
  );
}
