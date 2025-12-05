import { motion } from 'framer-motion';
import { Clock, User, Scissors } from 'lucide-react';

interface Appointment {
  id: string;
  cliente: string;
  servico: string;
  horario: string;
  status: 'confirmado' | 'pendente' | 'concluido';
}

const recentAppointments: Appointment[] = [
  { id: '1', cliente: 'João Silva', servico: 'Corte + Barba', horario: '10:00', status: 'confirmado' },
  { id: '2', cliente: 'Pedro Santos', servico: 'Corte Masculino', horario: '10:45', status: 'confirmado' },
  { id: '3', cliente: 'Lucas Oliveira', servico: 'Barba Completa', horario: '11:30', status: 'pendente' },
  { id: '4', cliente: 'Carlos Mendes', servico: 'Combo Completo', horario: '12:15', status: 'confirmado' },
  { id: '5', cliente: 'Rafael Costa', servico: 'Sobrancelha', horario: '14:00', status: 'pendente' },
];

const statusColors = {
  confirmado: 'bg-green-500/20 text-green-400',
  pendente: 'bg-yellow-500/20 text-yellow-400',
  concluido: 'bg-dark-700 text-dark-400',
};

const statusLabels = {
  confirmado: 'Confirmado',
  pendente: 'Pendente',
  concluido: 'Concluído',
};

export function RecentAppointments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-dark-900 border border-dark-800 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">
            Próximos Agendamentos
          </h3>
          <p className="text-dark-400 text-sm">
            Hoje
          </p>
        </div>
        <button className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
          Ver todos →
        </button>
      </div>

      <div className="space-y-4">
        {recentAppointments.map((appointment, index) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="flex items-center justify-between p-4 rounded-xl bg-dark-800/50 hover:bg-dark-800 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <p className="text-white font-medium">{appointment.cliente}</p>
                <div className="flex items-center gap-2 text-sm text-dark-400">
                  <Scissors className="w-3 h-3" />
                  <span>{appointment.servico}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-dark-400">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{appointment.horario}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status]}`}>
                {statusLabels[appointment.status]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
