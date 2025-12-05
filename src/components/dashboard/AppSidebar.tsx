import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  Scissors, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { cn } from '../../lib/utils';

interface SidebarProps {
  onLogout: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'agendamentos', label: 'Agendamentos', icon: <Calendar className="w-5 h-5" /> },
  { id: 'servicos', label: 'Serviços', icon: <Scissors className="w-5 h-5" /> },
  { id: 'clientes', label: 'Clientes', icon: <Users className="w-5 h-5" /> },
  { id: 'configuracoes', label: 'Configurações', icon: <Settings className="w-5 h-5" /> },
];

export function AppSidebar({ onLogout, currentPage, onPageChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        "p-4 border-b border-dark-800 flex items-center",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {isCollapsed ? (
          <Logo size="sm" showText={false} />
        ) : (
          <Logo size="sm" />
        )}
        
        {/* Botão de colapsar - apenas desktop */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onPageChange(item.id);
              setIsMobileOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
              currentPage === item.id
                ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                : "text-dark-400 hover:text-white hover:bg-dark-800"
            )}
          >
            <span className={cn(
              "flex-shrink-0",
              currentPage === item.id && "text-primary-400"
            )}>
              {item.icon}
            </span>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-dark-800">
        <button
          onClick={onLogout}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-medium whitespace-nowrap overflow-hidden"
              >
                Sair
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-dark-900 border border-dark-800 text-white shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobile}
            className="lg:hidden fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed top-0 left-0 h-full w-[280px] bg-dark-900 border-r border-dark-800 z-50"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="hidden lg:block fixed top-0 left-0 h-full bg-dark-900 border-r border-dark-800 z-40"
      >
        <SidebarContent />
      </motion.aside>
    </>
  );
}
