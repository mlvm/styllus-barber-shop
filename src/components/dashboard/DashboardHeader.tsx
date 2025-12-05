import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { Logo } from '../ui/Logo';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between mb-8"
    >
      <div>
        <div className="flex items-center gap-3 mb-2 lg:hidden">
          <Logo size="sm" showText={false} />
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-dark-400 mt-1">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Notificações */}
        <button className="relative p-3 rounded-xl bg-dark-900 border border-dark-800 text-dark-400 hover:text-white hover:border-dark-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full" />
        </button>

        {/* Avatar do usuário */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-dark-950 font-bold">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-white font-medium text-sm">Admin</p>
            <p className="text-dark-500 text-xs">Styllu's Barber Shop</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
