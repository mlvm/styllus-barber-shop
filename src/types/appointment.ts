/**
 * Tipos relacionados ao módulo de Agendamentos do Painel Administrativo
 * da Styllu's Barber Shop.
 * 
 * Este módulo integra com os dados vindos da seção "Agende Seu Horário" 
 * da Home, e também permite criação de agendamentos diretamente pelo admin.
 */

/**
 * Status possíveis de um agendamento
 * - NAO_CONFIRMADO: Status inicial ao criar um agendamento (via Home ou Admin)
 * - CONFIRMADO: Agendamento confirmado pelo administrador
 * - CANCELADO: Agendamento cancelado
 * - CONCLUIDO: Atendimento realizado com sucesso
 */
export type AppointmentStatus = 
  | 'NAO_CONFIRMADO'
  | 'CONFIRMADO'
  | 'CANCELADO'
  | 'CONCLUIDO';

/**
 * Origem do agendamento
 * - home: Criado pelo cliente na página "Agende Seu Horário"
 * - admin: Criado manualmente pelo administrador no painel
 */
export type AppointmentOrigin = 'home' | 'admin';

/**
 * Interface principal que representa um Agendamento
 * Usado tanto para agendamentos vindos da Home quanto criados no Admin
 */
export interface Appointment {
  /** Identificador único do agendamento */
  id: string;
  /** Nome completo do cliente */
  nomeCliente: string;
  /** Telefone/WhatsApp do cliente */
  telefone: string;
  /** ID do serviço selecionado (referência aos serviços da ServicesSection) */
  servico: string;
  /** Data preferencial do agendamento */
  dataPreferencial: Date;
  /** Hora preferencial no formato "HH:mm" */
  horaPreferencial: string;
  /** Mensagem opcional do cliente */
  mensagem?: string;
  /** Origem do agendamento (home ou admin) */
  origem: AppointmentOrigin;
  /** Status atual do agendamento */
  status: AppointmentStatus;
  /** Data/hora de criação do registro */
  criadoEm: Date;
  /** Data/hora da última atualização */
  atualizadoEm: Date;
}

/**
 * Interface para criação de um novo agendamento (sem campos automáticos)
 */
export interface CreateAppointmentData {
  nomeCliente: string;
  telefone: string;
  servico: string;
  dataPreferencial: Date;
  horaPreferencial: string;
  mensagem?: string;
  origem: AppointmentOrigin;
}

/**
 * Interface para atualização de um agendamento existente
 */
export interface UpdateAppointmentData extends Partial<CreateAppointmentData> {
  status?: AppointmentStatus;
}

/**
 * Mapeamento de status para labels em português
 */
export const STATUS_LABELS: Record<AppointmentStatus, string> = {
  NAO_CONFIRMADO: 'Não Confirmado',
  CONFIRMADO: 'Confirmado',
  CANCELADO: 'Cancelado',
  CONCLUIDO: 'Concluído',
};

/**
 * Mapeamento de status para cores (classes Tailwind)
 */
export const STATUS_COLORS: Record<AppointmentStatus, { bg: string; text: string; border: string }> = {
  NAO_CONFIRMADO: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
  },
  CONFIRMADO: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    border: 'border-green-500/30',
  },
  CANCELADO: {
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    border: 'border-red-500/30',
  },
  CONCLUIDO: {
    bg: 'bg-primary-500/20',
    text: 'text-primary-400',
    border: 'border-primary-500/30',
  },
};

/**
 * Mapeamento de origem para labels em português
 */
export const ORIGIN_LABELS: Record<AppointmentOrigin, string> = {
  home: 'Site',
  admin: 'Admin',
};

/**
 * Gera um ID único para agendamentos
 */
export function generateAppointmentId(): string {
  return `apt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Formata data para exibição (DD/MM/AAAA)
 */
export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Formata data e hora para exibição (DD/MM/AAAA às HH:mm)
 */
export function formatDateTime(date: Date, time: string): string {
  return `${formatDate(date)} às ${time}`;
}

/**
 * Lista de todos os status disponíveis para filtros
 */
export const ALL_STATUSES: AppointmentStatus[] = [
  'NAO_CONFIRMADO',
  'CONFIRMADO',
  'CANCELADO',
  'CONCLUIDO',
];
