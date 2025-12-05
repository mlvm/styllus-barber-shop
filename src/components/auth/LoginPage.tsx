import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, LogIn } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { PrimaryButton } from '../ui/PrimaryButton';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simula autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Login simulado - aceita qualquer credencial
    if (email && password) {
      onLogin();
    } else {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23d4a017%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      </div>

      {/* Efeitos decorativos */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />

      {/* Card de Login */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-dark-900/80 backdrop-blur-xl rounded-2xl border border-dark-800 p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-white mb-2">
              Painel Administrativo
            </h1>
            <p className="text-dark-400">
              Acesse as análises da Styllu's Barber Shop
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-dark-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="admin@styllus.com"
                  required
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-dark-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Erro */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Botão Login */}
            <PrimaryButton
              type="submit"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Entrar
                </span>
              )}
            </PrimaryButton>
          </form>

          {/* Link para Home */}
          <div className="mt-6 text-center">
            <a 
              href="/" 
              className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
            >
              ← Voltar para o site
            </a>
          </div>
        </div>

        {/* Texto de credenciais demo */}
        <p className="text-center text-dark-500 text-xs mt-4">
          Demo: use qualquer e-mail e senha para acessar
        </p>
      </motion.div>
    </div>
  );
}
