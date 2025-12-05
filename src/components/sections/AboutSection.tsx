import { motion } from 'framer-motion';
import { 
  Crown, 
  Sparkles, 
  Users, 
  Snowflake, 
  Award,
  Coffee
} from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { FeatureCard } from '../ui/FeatureCard';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Crown className="w-7 h-7" />,
    title: 'Atendimento VIP',
    description: 'Tratamento exclusivo e personalizado para cada cliente, respeitando seu estilo único.'
  },
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: 'Profissionais Qualificados',
    description: 'Equipe de barbeiros experientes e constantemente atualizados com as últimas tendências.'
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Para Todos os Estilos',
    description: 'Do clássico ao moderno, atendemos a todos os perfis e preferências de cortes.'
  },
  {
    icon: <Snowflake className="w-7 h-7" />,
    title: 'Ambiente Climatizado',
    description: 'Espaço confortável e climatizado para você relaxar enquanto cuida do visual.'
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: 'Produtos Premium',
    description: 'Utilizamos apenas produtos de alta qualidade para cuidar do seu cabelo e barba.'
  },
  {
    icon: <Coffee className="w-7 h-7" />,
    title: 'Experiência Completa',
    description: 'Café, bebidas e ambiente descontraído para tornar sua visita ainda mais agradável.'
  },
];

export function AboutSection() {
  return (
    <section id="sobre" className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Efeitos decorativos */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      
      <div className="container-custom">
        <SectionTitle 
          title="Sobre Nós"
          subtitle="Conheça a barbearia que está transformando o conceito de cuidado masculino em São Paulo"
        />

        {/* Texto sobre a barbearia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-dark-300 text-lg leading-relaxed mb-6">
            A <span className="text-primary-400 font-semibold">Styllu's Barber Shop</span> nasceu 
            da paixão por transformar a tradicional barbearia em uma experiência de luxo acessível. 
            Nosso ambiente combina a elegância clássica das barbearias antigas com o conforto 
            e as técnicas modernas.
          </p>
          <p className="text-dark-300 text-lg leading-relaxed">
            Cada detalhe foi pensado para proporcionar momentos de relaxamento e cuidado, 
            onde você pode escapar da rotina e sair renovado, com a confiança de quem 
            está sempre com a melhor aparência.
          </p>
        </motion.div>

        {/* Grid de diferenciais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
