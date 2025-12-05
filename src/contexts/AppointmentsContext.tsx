import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { 
  Appointment, 
  CreateAppointmentData, 
  UpdateAppointmentData,
  AppointmentStatus 
} from '../types/appointment';
import { generateAppointmentId } from '../types/appointment';

/**
 * Interface do contexto de Agendamentos
 */
interface AppointmentsContextType {
  /** Lista de todos os agendamentos */
  appointments: Appointment[];
  /** Adiciona um novo agendamento */
  addAppointment: (data: CreateAppointmentData) => Appointment;
  /** Atualiza um agendamento existente */
  updateAppointment: (id: string, data: UpdateAppointmentData) => void;
  /** Remove um agendamento */
  deleteAppointment: (id: string) => void;
  /** Busca um agendamento pelo ID */
  getAppointmentById: (id: string) => Appointment | undefined;
  /** Filtra agendamentos por status */
  filterByStatus: (status: AppointmentStatus | 'todos') => Appointment[];
  /** Busca agendamentos por termo (nome ou telefone) */
  searchAppointments: (term: string) => Appointment[];
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

/**
 * Dados mockados de agendamentos vindos da Home
 * Simula agendamentos que foram feitos através da página "Agende Seu Horário"
 */
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt_mock_001',
    nomeCliente: 'João Silva',
    telefone: '(11) 99999-1234',
    servico: '1', // Corte Masculino
    dataPreferencial: new Date(2025, 11, 10), // 10/12/2025
    horaPreferencial: '10:00',
    mensagem: 'Prefiro o barbeiro Carlos, se possível.',
    origem: 'home',
    status: 'NAO_CONFIRMADO',
    criadoEm: new Date(2025, 11, 5, 14, 30),
    atualizadoEm: new Date(2025, 11, 5, 14, 30),
  },
  {
    id: 'apt_mock_002',
    nomeCliente: 'Pedro Santos',
    telefone: '(11) 98888-5678',
    servico: '4', // Combo Corte + Barba
    dataPreferencial: new Date(2025, 11, 11), // 11/12/2025
    horaPreferencial: '14:30',
    origem: 'home',
    status: 'CONFIRMADO',
    criadoEm: new Date(2025, 11, 4, 9, 15),
    atualizadoEm: new Date(2025, 11, 4, 10, 0),
  },
  {
    id: 'apt_mock_003',
    nomeCliente: 'Carlos Oliveira',
    telefone: '(11) 97777-9012',
    servico: '2', // Barba Completa
    dataPreferencial: new Date(2025, 11, 8), // 08/12/2025
    horaPreferencial: '16:00',
    mensagem: 'Primeira vez na barbearia.',
    origem: 'home',
    status: 'NAO_CONFIRMADO',
    criadoEm: new Date(2025, 11, 3, 18, 45),
    atualizadoEm: new Date(2025, 11, 3, 18, 45),
  },
  {
    id: 'apt_mock_004',
    nomeCliente: 'André Costa',
    telefone: '(11) 96666-3456',
    servico: '5', // Hidratação Capilar
    dataPreferencial: new Date(2025, 11, 12), // 12/12/2025
    horaPreferencial: '11:00',
    origem: 'admin',
    status: 'CONFIRMADO',
    criadoEm: new Date(2025, 11, 2, 11, 30),
    atualizadoEm: new Date(2025, 11, 2, 11, 35),
  },
  {
    id: 'apt_mock_005',
    nomeCliente: 'Lucas Ferreira',
    telefone: '(11) 95555-7890',
    servico: '1', // Corte Masculino
    dataPreferencial: new Date(2025, 11, 6), // 06/12/2025
    horaPreferencial: '09:30',
    origem: 'home',
    status: 'CONCLUIDO',
    criadoEm: new Date(2025, 11, 1, 20, 0),
    atualizadoEm: new Date(2025, 11, 6, 10, 15),
  },
  {
    id: 'apt_mock_006',
    nomeCliente: 'Marcos Almeida',
    telefone: '(11) 94444-1122',
    servico: '6', // Pigmentação de Barba
    dataPreferencial: new Date(2025, 11, 9), // 09/12/2025
    horaPreferencial: '15:00',
    mensagem: 'Quero cobrir alguns fios brancos.',
    origem: 'home',
    status: 'CANCELADO',
    criadoEm: new Date(2025, 11, 2, 8, 20),
    atualizadoEm: new Date(2025, 11, 5, 9, 0),
  },
  {
    id: 'apt_mock_007',
    nomeCliente: 'Ricardo Mendes',
    telefone: '(11) 93333-4455',
    servico: '3', // Sobrancelha
    dataPreferencial: new Date(2025, 11, 13), // 13/12/2025
    horaPreferencial: '17:30',
    origem: 'admin',
    status: 'NAO_CONFIRMADO',
    criadoEm: new Date(2025, 11, 5, 16, 0),
    atualizadoEm: new Date(2025, 11, 5, 16, 0),
  },
];

interface AppointmentsProviderProps {
  children: ReactNode;
}

/**
 * Provider do contexto de Agendamentos
 * Gerencia o estado global dos agendamentos da aplicação
 */
export function AppointmentsProvider({ children }: AppointmentsProviderProps) {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);

  /**
   * Adiciona um novo agendamento
   * Status inicial é sempre "NAO_CONFIRMADO"
   */
  const addAppointment = useCallback((data: CreateAppointmentData): Appointment => {
    const now = new Date();
    const newAppointment: Appointment = {
      ...data,
      id: generateAppointmentId(),
      status: 'NAO_CONFIRMADO', // Status inicial obrigatório
      criadoEm: now,
      atualizadoEm: now,
    };

    setAppointments(prev => [newAppointment, ...prev]);
    
    // Log para debug - será substituído por chamada ao backend
    console.log('[AppointmentsContext] Novo agendamento criado:', newAppointment);
    
    return newAppointment;
  }, []);

  /**
   * Atualiza um agendamento existente
   */
  const updateAppointment = useCallback((id: string, data: UpdateAppointmentData) => {
    setAppointments(prev => 
      prev.map(apt => {
        if (apt.id === id) {
          const updated = {
            ...apt,
            ...data,
            atualizadoEm: new Date(),
          };
          // Log para debug - será substituído por chamada ao backend
          console.log('[AppointmentsContext] Agendamento atualizado:', updated);
          return updated;
        }
        return apt;
      })
    );
  }, []);

  /**
   * Remove um agendamento
   */
  const deleteAppointment = useCallback((id: string) => {
    setAppointments(prev => {
      const toDelete = prev.find(apt => apt.id === id);
      if (toDelete) {
        // Log para debug - será substituído por chamada ao backend
        console.log('[AppointmentsContext] Agendamento removido:', toDelete);
      }
      return prev.filter(apt => apt.id !== id);
    });
  }, []);

  /**
   * Busca um agendamento pelo ID
   */
  const getAppointmentById = useCallback((id: string): Appointment | undefined => {
    return appointments.find(apt => apt.id === id);
  }, [appointments]);

  /**
   * Filtra agendamentos por status
   */
  const filterByStatus = useCallback((status: AppointmentStatus | 'todos'): Appointment[] => {
    if (status === 'todos') {
      return appointments;
    }
    return appointments.filter(apt => apt.status === status);
  }, [appointments]);

  /**
   * Busca agendamentos por termo (nome ou telefone)
   */
  const searchAppointments = useCallback((term: string): Appointment[] => {
    if (!term.trim()) {
      return appointments;
    }
    const lowerTerm = term.toLowerCase();
    return appointments.filter(apt => 
      apt.nomeCliente.toLowerCase().includes(lowerTerm) ||
      apt.telefone.includes(term)
    );
  }, [appointments]);

  const value: AppointmentsContextType = {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentById,
    filterByStatus,
    searchAppointments,
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
}

/**
 * Hook para usar o contexto de Agendamentos
 */
export function useAppointments() {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error('useAppointments deve ser usado dentro de um AppointmentsProvider');
  }
  return context;
}
