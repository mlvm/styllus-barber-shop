import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppSidebar } from './AppSidebar';
import { DashboardHeader } from './DashboardHeader';
import { StatsGrid } from './StatsGrid';
import { AppointmentsChart } from './AppointmentsChart';
import { ServicesChart } from './ServicesChart';
import { RecentAppointments } from './RecentAppointments';
import { AppointmentsPage } from './appointments';
import { AppointmentsProvider } from '../../contexts/AppointmentsContext';
import { cn } from '../../lib/utils';

interface DashboardPageProps {
  onLogout: () => void;
}

export function DashboardPage({ onLogout }: DashboardPageProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'agendamentos':
        return <AppointmentsPage />;
      case 'servicos':
        return <PlaceholderPage title="Serviços" description="Configure os serviços oferecidos" />;
      case 'clientes':
        return <PlaceholderPage title="Clientes" description="Visualize e gerencie sua base de clientes" />;
      case 'configuracoes':
        return <PlaceholderPage title="Configurações" description="Ajuste as configurações do sistema" />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <AppointmentsProvider>
      <div className="min-h-screen bg-dark-950">
        <AppSidebar 
          onLogout={onLogout}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        
        {/* Conteúdo Principal */}
        <main className={cn(
          "transition-all duration-300 min-h-screen",
          "lg:ml-[280px]", // Sidebar expandida
          "pt-20 lg:pt-0" // Espaço para botão mobile
        )}>
          <div className="p-6 md:p-8 lg:p-10">
            {renderContent()}
          </div>
        </main>
      </div>
    </AppointmentsProvider>
  );
}

function DashboardContent() {
  return (
    <>
      <DashboardHeader 
        title="Dashboard" 
        subtitle="Bem-vindo ao painel administrativo da Styllu's Barber Shop"
      />
      
      {/* Stats Grid */}
      <section className="mb-8">
        <StatsGrid />
      </section>

      {/* Gráficos */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AppointmentsChart />
        <ServicesChart />
      </section>

      {/* Agendamentos Recentes */}
      <section>
        <RecentAppointments />
      </section>
    </>
  );
}

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <>
      <DashboardHeader 
        title={title} 
        subtitle={description}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-900 border border-dark-800 rounded-2xl p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🚧</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Em Desenvolvimento
        </h3>
        <p className="text-dark-400">
          Esta seção está sendo construída. Em breve estará disponível!
        </p>
      </motion.div>
    </>
  );
}
