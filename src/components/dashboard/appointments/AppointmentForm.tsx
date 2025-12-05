import { useState, useEffect } from 'react';
import { User, Phone, Calendar, Clock, MessageSquare, Scissors } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { services } from '../../sections/ServicesSection';
import type { 
  Appointment, 
  CreateAppointmentData, 
  AppointmentStatus 
} from '../../../types/appointment';
import { STATUS_LABELS, ALL_STATUSES } from '../../../types/appointment';

interface AppointmentFormProps {
  /** Agendamento existente (para edição) */
  appointment?: Appointment | null;
  /** Callback ao submeter o formulário */
  onSubmit: (data: CreateAppointmentData & { status?: AppointmentStatus }) => void;
  /** Callback ao cancelar */
  onCancel: () => void;
  /** Se é modo edição */
  isEditing?: boolean;
}

interface FormData {
  nomeCliente: string;
  telefone: string;
  servico: string;
  dataPreferencial: string;
  horaPreferencial: string;
  mensagem: string;
  status: AppointmentStatus;
}

/**
 * Classes base compartilhadas entre inputs e selects para garantir consistência visual
 */
const baseFieldClasses = [
  'w-full py-3 rounded-lg',
  'border text-white',
  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
  'transition-all duration-200',
].join(' ');

const inputWithIconClasses = `bg-dark-800 ${baseFieldClasses} pl-11 pr-4`;

const selectWithIconClasses = `bg-dark-800 ${baseFieldClasses} pl-11 pr-10 appearance-none cursor-pointer`;

// Classes para select sem ícone (como Status)
const selectNoIconClasses = `bg-dark-800 ${baseFieldClasses} px-4 appearance-none cursor-pointer`;

// Seta customizada para selects (SVG inline como background-image)
const selectArrowStyles = {
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundSize: '1.5em 1.5em',
  backgroundPosition: 'right 0.5rem center',
  backgroundRepeat: 'no-repeat',
};

/**
 * Formulário reutilizável para criação e edição de agendamentos
 */
export function AppointmentForm({ 
  appointment, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}: AppointmentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nomeCliente: '',
    telefone: '',
    servico: '',
    dataPreferencial: '',
    horaPreferencial: '',
    mensagem: '',
    status: 'NAO_CONFIRMADO',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Preenche o formulário com os dados do agendamento existente (modo edição)
  useEffect(() => {
    if (appointment) {
      const date = new Date(appointment.dataPreferencial);
      const formattedDate = date.toISOString().split('T')[0];
      
      setFormData({
        nomeCliente: appointment.nomeCliente,
        telefone: appointment.telefone,
        servico: appointment.servico,
        dataPreferencial: formattedDate,
        horaPreferencial: appointment.horaPreferencial,
        mensagem: appointment.mensagem || '',
        status: appointment.status,
      });
    }
  }, [appointment]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.nomeCliente.trim()) {
      newErrors.nomeCliente = 'Nome é obrigatório';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/.test(formData.telefone.replace(/\s/g, ''))) {
      newErrors.telefone = 'Formato inválido. Use (XX) XXXXX-XXXX';
    }

    if (!formData.servico) {
      newErrors.servico = 'Selecione um serviço';
    }

    if (!formData.dataPreferencial) {
      newErrors.dataPreferencial = 'Data é obrigatória';
    }

    if (!formData.horaPreferencial) {
      newErrors.horaPreferencial = 'Hora é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const submitData: CreateAppointmentData & { status?: AppointmentStatus } = {
      nomeCliente: formData.nomeCliente.trim(),
      telefone: formData.telefone.trim(),
      servico: formData.servico,
      dataPreferencial: new Date(formData.dataPreferencial),
      horaPreferencial: formData.horaPreferencial,
      mensagem: formData.mensagem.trim() || undefined,
      origem: appointment?.origem || 'admin',
    };

    // Inclui status apenas no modo edição
    if (isEditing) {
      submitData.status = formData.status;
    }

    onSubmit(submitData);
  };

  // Formata telefone enquanto digita
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
      if (value.length > 10) {
        value = `${value.slice(0, 10)}-${value.slice(10)}`;
      }
    }
    
    setFormData(prev => ({ ...prev, telefone: value }));
    if (errors.telefone) {
      setErrors(prev => ({ ...prev, telefone: undefined }));
    }
  };

  // Lista de horários disponíveis
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nome do Cliente */}
      <div>
        <label className="block text-sm font-medium text-dark-300 mb-2">
          Nome Completo *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
          <input
            type="text"
            name="nomeCliente"
            value={formData.nomeCliente}
            onChange={handleChange}
            placeholder="Nome do cliente"
            className={cn(
              inputWithIconClasses,
              'placeholder-dark-500',
              errors.nomeCliente ? 'border-red-500' : 'border-dark-700'
            )}
          />
        </div>
        {errors.nomeCliente && (
          <p className="mt-1 text-sm text-red-500">{errors.nomeCliente}</p>
        )}
      </div>

      {/* Telefone */}
      <div>
        <label className="block text-sm font-medium text-dark-300 mb-2">
          Telefone / WhatsApp *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handlePhoneChange}
            placeholder="(11) 99999-9999"
            maxLength={16}
            className={cn(
              inputWithIconClasses,
              'placeholder-dark-500',
              errors.telefone ? 'border-red-500' : 'border-dark-700'
            )}
          />
        </div>
        {errors.telefone && (
          <p className="mt-1 text-sm text-red-500">{errors.telefone}</p>
        )}
      </div>

      {/* Serviço */}
      <div>
        <label className="block text-sm font-medium text-dark-300 mb-2">
          Serviço *
        </label>
        <div className="relative">
          <Scissors className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500 z-10" />
          <select
            name="servico"
            value={formData.servico}
            onChange={handleChange}
            style={selectArrowStyles}
            className={cn(
              selectWithIconClasses,
              errors.servico ? 'border-red-500' : 'border-dark-700',
              !formData.servico && 'text-dark-500'
            )}
          >
            <option value="" disabled className="bg-dark-800 text-dark-500">Selecione um serviço</option>
            {services.map((service) => (
              <option key={service.id} value={service.id} className="bg-dark-800 text-white">
                {service.name} - {service.price}
              </option>
            ))}
          </select>
        </div>
        {errors.servico && (
          <p className="mt-1 text-sm text-red-500">{errors.servico}</p>
        )}
      </div>

      {/* Data e Hora */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Data */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Data *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
            <input
              type="date"
              name="dataPreferencial"
              value={formData.dataPreferencial}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={cn(
                inputWithIconClasses,
                '[color-scheme:dark]',
                errors.dataPreferencial ? 'border-red-500' : 'border-dark-700'
              )}
            />
          </div>
          {errors.dataPreferencial && (
            <p className="mt-1 text-sm text-red-500">{errors.dataPreferencial}</p>
          )}
        </div>

        {/* Hora */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Hora *
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500 z-10" />
            <select
              name="horaPreferencial"
              value={formData.horaPreferencial}
              onChange={handleChange}
              style={selectArrowStyles}
              className={cn(
                selectWithIconClasses,
                errors.horaPreferencial ? 'border-red-500' : 'border-dark-700',
                !formData.horaPreferencial && 'text-dark-500'
              )}
            >
              <option value="" disabled className="bg-dark-800 text-dark-500">Selecione</option>
              {timeSlots.map((time) => (
                <option key={time} value={time} className="bg-dark-800 text-white">{time}</option>
              ))}
            </select>
          </div>
          {errors.horaPreferencial && (
            <p className="mt-1 text-sm text-red-500">{errors.horaPreferencial}</p>
          )}
        </div>
      </div>

      {/* Status (apenas no modo edição) */}
      {isEditing && (
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={selectArrowStyles}
            className={cn(
              selectNoIconClasses,
              'border-dark-700'
            )}
          >
            {ALL_STATUSES.map((status) => (
              <option key={status} value={status} className="bg-dark-800 text-white">
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Mensagem */}
      <div>
        <label className="block text-sm font-medium text-dark-300 mb-2">
          Mensagem (Opcional)
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-dark-500" />
          <textarea
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            placeholder="Observações ou preferências especiais..."
            rows={3}
            className={cn(
              inputWithIconClasses,
              'border-dark-700 placeholder-dark-500 resize-none'
            )}
          />
        </div>
      </div>

      {/* Botões */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800 transition-colors font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-dark-950 font-semibold hover:from-primary-400 hover:to-primary-500 transition-all shadow-lg shadow-primary-500/30"
        >
          {isEditing ? 'Salvar Alterações' : 'Criar Agendamento'}
        </button>
      </div>
    </form>
  );
}
