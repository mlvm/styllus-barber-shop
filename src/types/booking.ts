/**
 * Tipos relacionados ao sistema de agendamento da Styllu's Barber Shop
 * 
 * Estes tipos serão utilizados tanto na Home (formulário de agendamento)
 * quanto no painel administrativo (Dashboard) para gerenciamento de agendamentos.
 */

/**
 * Interface que representa a data e horário selecionados pelo cliente
 * Usada no modal de seleção de data/hora
 */
export interface PreferredDateTime {
  /** Data selecionada no formato Date */
  date: Date | null;
  /** Horário selecionado no formato "HH:mm" */
  time: string | null;
}

/**
 * Interface que representa um pré-agendamento completo
 * Estruturado para fácil integração futura com backend e Dashboard
 */
export interface PreBooking {
  /** Identificador único do pré-agendamento (gerado no frontend) */
  id: string;
  /** Nome completo do cliente */
  clientName: string;
  /** Telefone/WhatsApp do cliente */
  clientPhone: string;
  /** ID do serviço selecionado */
  serviceId: string;
  /** Data e horário preferencial */
  preferredDateTime: PreferredDateTime;
  /** Mensagem opcional do cliente */
  message?: string;
  /** Data/hora de criação do pré-agendamento */
  createdAt: Date;
  /** Status do pré-agendamento */
  status: PreBookingStatus;
}

/**
 * Status possíveis de um pré-agendamento
 * Será usado no Dashboard para filtros e gestão
 */
export type PreBookingStatus = 
  | 'pending'     // Aguardando confirmação
  | 'confirmed'   // Confirmado pelo barbeiro
  | 'cancelled'   // Cancelado
  | 'completed';  // Atendimento realizado

/**
 * Interface para os horários disponíveis
 * Será populada com dados do backend futuramente
 */
export interface AvailableTimeSlot {
  /** Horário no formato "HH:mm" */
  time: string;
  /** Indica se o horário está disponível */
  available: boolean;
}

/**
 * Gera um ID único para pré-agendamentos
 */
export function generatePreBookingId(): string {
  return `pb_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Formata a data e horário para exibição
 * @param dateTime Objeto com data e horário
 * @returns String formatada "dd/mm/aaaa · HH:mm" ou placeholder
 */
export function formatPreferredDateTime(dateTime: PreferredDateTime): string {
  if (!dateTime.date || !dateTime.time) {
    return '';
  }

  const day = dateTime.date.getDate().toString().padStart(2, '0');
  const month = (dateTime.date.getMonth() + 1).toString().padStart(2, '0');
  const year = dateTime.date.getFullYear();

  return `${day}/${month}/${year} · ${dateTime.time}`;
}
