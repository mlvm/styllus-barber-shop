import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Calendar, DollarSign, Percent } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  index?: number;
}

function StatCard({ title, value, change, icon, index = 0 }: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-dark-900 border border-dark-800 rounded-2xl p-6 hover:border-primary-500/30 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-primary-500/10">
          <span className="text-primary-400">{icon}</span>
        </div>
        <div className={cn(
          "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg",
          isPositive ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"
        )}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      </div>
      
      <h3 className="text-dark-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </motion.div>
  );
}

const stats = [
  {
    title: 'Agendamentos do Mês',
    value: '248',
    change: 12.5,
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    title: 'Clientes Ativos',
    value: '1.429',
    change: 8.2,
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: 'Receita Mensal',
    value: 'R$ 18.450',
    change: 15.3,
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    title: 'Taxa de Comparecimento',
    value: '94%',
    change: -2.1,
    icon: <Percent className="w-6 h-6" />,
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          index={index}
        />
      ))}
    </div>
  );
}
