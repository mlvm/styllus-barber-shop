import { motion, AnimatePresence } from 'framer-motion';
import { X, CalendarPlus, Pencil } from 'lucide-react';
import { AppointmentForm } from './AppointmentForm';
import { useAppointments } from '../../../contexts/AppointmentsContext';
import type { 
  Appointment, 
  CreateAppointmentData, 
  AppointmentStatus,
  UpdateAppointmentData 
} from '../../../types/appointment';

type DialogMode = 'create' | 'edit';

interface AppointmentFormDialogProps {
  /** Controla se o modal está aberto */
  isOpen: boolean;
  /** Modo do modal: 'create' para novo agendamento, 'edit' para edição */
  mode: DialogMode;
  /** Agendamento a ser editado (obrigatório quando mode='edit') */
  appointment?: Appointment | null;
  /** Callback ao fechar o modal */
  onClose: () => void;
}

/**
 * Modal/Dialog unificado para criação e edição de agendamentos.
 * 
 * - Quando mode='create': Abre com campos vazios, status será "NAO_CONFIRMADO".
 * - Quando mode='edit': Abre pré-preenchido com os dados do agendamento.
 */
export function AppointmentFormDialog({ 
  isOpen, 
  mode, 
  appointment, 
  onClose 
}: AppointmentFormDialogProps) {
  const { addAppointment, updateAppointment } = useAppointments();

  const isEditing = mode === 'edit';

  // Configurações de título e ícone baseados no modo
  const dialogConfig = {
    create: {
      title: 'Novo Agendamento',
      subtitle: 'Preencha os dados para criar um agendamento',
      icon: CalendarPlus,
    },
    edit: {
      title: 'Editar Agendamento',
      subtitle: 'Atualize os dados do agendamento',
      icon: Pencil,
    },
  };

  const config = dialogConfig[mode];
  const IconComponent = config.icon;

  const handleSubmit = (data: CreateAppointmentData & { status?: AppointmentStatus }) => {
    if (isEditing && appointment) {
      // Modo edição: atualiza o agendamento existente
      const updateData: UpdateAppointmentData = {
        nomeCliente: data.nomeCliente,
        telefone: data.telefone,
        servico: data.servico,
        dataPreferencial: data.dataPreferencial,
        horaPreferencial: data.horaPreferencial,
        mensagem: data.mensagem,
        status: data.status,
      };
      updateAppointment(appointment.id, updateData);
    } else {
      // Modo criação: adiciona novo agendamento
      addAppointment(data);
    }
    onClose();
  };

  // Se for modo edição sem agendamento, não renderiza
  if (isEditing && !appointment) return null;

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
            <div className="bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {config.title}
                    </h2>
                    <p className="text-sm text-dark-400">
                      {config.subtitle}
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
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                <AppointmentForm
                  appointment={isEditing ? appointment : undefined}
                  onSubmit={handleSubmit}
                  onCancel={onClose}
                  isEditing={isEditing}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
