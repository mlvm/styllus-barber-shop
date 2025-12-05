import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import { useAppointments } from '../../../contexts/AppointmentsContext';
import { services } from '../../sections/ServicesSection';
import type { Appointment } from '../../../types/appointment';
import { formatDate } from '../../../types/appointment';

interface AppointmentDeleteDialogProps {
  isOpen: boolean;
  appointment: Appointment | null;
  onClose: () => void;
}

/**
 * Modal/Dialog de confirmação para exclusão de agendamento
 */
export function AppointmentDeleteDialog({ 
  isOpen, 
  appointment, 
  onClose 
}: AppointmentDeleteDialogProps) {
  const { deleteAppointment } = useAppointments();

  const handleDelete = () => {
    if (!appointment) return;
    deleteAppointment(appointment.id);
    onClose();
  };

  // Busca o nome do serviço pelo ID
  const getServiceName = (serviceId: string): string => {
    const service = services.find(s => s.id === serviceId);
    return service?.name || 'Serviço não encontrado';
  };

  if (!appointment) return null;

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

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Excluir Agendamento
                    </h2>
                    <p className="text-sm text-dark-400">
                      Esta ação não pode ser desfeita
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-dark-300 mb-4">
                  Tem certeza que deseja excluir o agendamento abaixo?
                </p>

                {/* Info do agendamento */}
                <div className="bg-dark-800 rounded-xl p-4 space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-dark-500">Cliente:</span>
                    <span className="text-white font-medium">{appointment.nomeCliente}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-500">Serviço:</span>
                    <span className="text-dark-300">{getServiceName(appointment.servico)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-500">Data/Hora:</span>
                    <span className="text-dark-300">
                      {formatDate(new Date(appointment.dataPreferencial))} às {appointment.horaPreferencial}
                    </span>
                  </div>
                </div>

                {/* Botões */}
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-6 py-2.5 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-all flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
