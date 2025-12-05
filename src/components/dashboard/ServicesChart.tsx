import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  { servico: 'Corte', quantidade: 89, cor: '#d4a017' },
  { servico: 'Barba', quantidade: 52, cor: '#facc15' },
  { servico: 'Combo', quantidade: 67, cor: '#b8860b' },
  { servico: 'Sobrancelha', quantidade: 23, cor: '#a16207' },
  { servico: 'Hidratação', quantidade: 12, cor: '#854d0e' },
  { servico: 'Pigmentação', quantidade: 5, cor: '#713f12' },
];

export function ServicesChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-dark-900 border border-dark-800 rounded-2xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-1">
          Serviços Mais Realizados
        </h3>
        <p className="text-dark-400 text-sm">
          Este mês
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis 
              type="number"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              type="category"
              dataKey="servico"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '12px',
                color: '#fff',
              }}
              labelStyle={{ color: '#9ca3af' }}
              formatter={(value: number) => [`${value} realizados`, 'Quantidade']}
            />
            <Bar 
              dataKey="quantidade" 
              radius={[0, 8, 8, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.cor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
