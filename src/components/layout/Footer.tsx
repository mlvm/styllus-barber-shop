import { Logo } from '../ui/Logo';
import { Instagram, Facebook, Phone, MapPin, Clock } from 'lucide-react';

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/styllusbarber', label: 'Instagram' },
  { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/styllusbarber', label: 'Facebook' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-1">
            <Logo size="md" className="mb-4" />
            <p className="text-dark-400 mt-4 leading-relaxed">
              Tradição e estilo se encontram para oferecer a melhor experiência em barbearia da cidade.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-dark-400 hover:bg-primary-500 hover:text-dark-950 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-3">
              {[
                { label: 'Início', href: '#inicio' },
                { label: 'Sobre Nós', href: '#sobre' },
                { label: 'Serviços', href: '#servicos' },
                { label: 'Galeria', href: '#galeria' },
                { label: 'Agendar', href: '#agendar' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-dark-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Horário de Funcionamento */}
          <div>
            <h4 className="text-white font-semibold mb-4">Horário de Funcionamento</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-dark-400">
                <Clock className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white">Segunda a Sexta</p>
                  <p>09:00 - 20:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-dark-400">
                <Clock className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white">Sábado</p>
                  <p>09:00 - 18:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-dark-400">
                <Clock className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white">Domingo</p>
                  <p>Fechado</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-dark-400">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Rua das Palmeiras, 1234</p>
                  <p>Centro - São Paulo, SP</p>
                  <p>CEP: 01234-567</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-dark-400">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a 
                  href="tel:+5511999999999" 
                  className="hover:text-primary-400 transition-colors"
                >
                  (11) 99999-9999
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-dark-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-500 text-sm">
              © {currentYear} Styllu's Barber Shop. Todos os direitos reservados.
            </p>
            <p className="text-dark-500 text-sm">
              Desenvolvido com <span className="text-primary-500">♥</span> para você
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
