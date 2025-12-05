import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { dia: 'Seg', agendamentos: 12 },
  { dia: 'Ter', agendamentos: 19 },
  { dia: 'Qua', agendamentos: 15 },
  { dia: 'Qui', agendamentos: 22 },
  { dia: 'Sex', agendamentos: 28 },
  { dia: 'Sáb', agendamentos: 35 },
  { dia: 'Dom', agendamentos: 8 },
];

export function AppointmentsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-dark-900 border border-dark-800 rounded-2xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-1">
          Agendamentos por Dia
        </h3>
        <p className="text-dark-400 text-sm">
          Última semana
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="dia" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '12px',
                color: '#fff',
              }}
              labelStyle={{ color: '#9ca3af' }}
            />
            <Line 
              type="monotone" 
              dataKey="agendamentos" 
              stroke="#d4a017"
              strokeWidth={3}
              dot={{ fill: '#d4a017', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#d4a017' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
