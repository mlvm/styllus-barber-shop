import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Send, CheckCircle } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { TextInput } from '../ui/TextInput';
import { SelectInput } from '../ui/SelectInput';
import { Textarea } from '../ui/Textarea';
import { PrimaryButton } from '../ui/PrimaryButton';
import { services } from './ServicesSection';

interface FormData {
  nome: string;
  telefone: string;
  servico: string;
  dataHorario: string;
  mensagem: string;
}

const serviceOptions = services.map(service => ({
  value: service.id,
  label: `${service.name} - ${service.price}`,
}));

export function BookingSection() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    telefone: '',
    servico: '',
    dataHorario: '',
    mensagem: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simula envio do formulário
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Dados do agendamento:', formData);
    alert(`Agendamento solicitado com sucesso!\n\nNome: ${formData.nome}\nTelefone: ${formData.telefone}\nServiço: ${services.find(s => s.id === formData.servico)?.name}\nData/Horário: ${formData.dataHorario}`);
    
    setIsSubmitted(true);
    setIsLoading(false);

    // Reset após 5 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        nome: '',
        telefone: '',
        servico: '',
        dataHorario: '',
        mensagem: '',
      });
    }, 5000);
  };

  const handleOpenMaps = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Rua+das+Palmeiras+1234+Centro+Sao+Paulo+SP',
      '_blank'
    );
  };

  return (
    <section id="agendar" className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Efeitos decorativos */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <SectionTitle 
          title="Agende Seu Horário"
          subtitle="Reserve seu horário agora e garanta uma experiência premium de barbearia"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-dark-950 rounded-2xl p-6 md:p-8 border border-dark-800">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Solicitar Agendamento
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    Solicitação Enviada!
                  </h4>
                  <p className="text-dark-400">
                    Entraremos em contato em breve para confirmar seu horário.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <TextInput
                    label="Nome Completo"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Digite seu nome"
                    required
                  />

                  <TextInput
                    label="Telefone / WhatsApp"
                    name="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    required
                  />

                  <SelectInput
                    label="Serviço Desejado"
                    name="servico"
                    value={formData.servico}
                    onChange={handleChange}
                    options={serviceOptions}
                    placeholder="Selecione um serviço"
                    required
                  />

                  <TextInput
                    label="Data e Horário Preferencial"
                    name="dataHorario"
                    type="datetime-local"
                    value={formData.dataHorario}
                    onChange={handleChange}
                    required
                  />

                  <Textarea
                    label="Mensagem (Opcional)"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Alguma observação ou preferência especial?"
                  />

                  <PrimaryButton 
                    type="submit" 
                    size="lg" 
                    fullWidth
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Confirmar Agendamento
                      </span>
                    )}
                  </PrimaryButton>
                </form>
              )}
            </div>
          </motion.div>

          {/* Informações de contato */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                {/* Endereço */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Endereço</h4>
                    <p className="text-dark-400">
                      Rua das Palmeiras, 1234<br />
                      Centro - São Paulo, SP<br />
                      CEP: 01234-567
                    </p>
                    <button
                      onClick={handleOpenMaps}
                      className="text-primary-400 hover:text-primary-300 text-sm mt-2 transition-colors"
                    >
                      Ver no Google Maps →
                    </button>
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Telefone / WhatsApp</h4>
                    <a 
                      href="tel:+5511999999999"
                      className="text-dark-400 hover:text-primary-400 transition-colors"
                    >
                      (11) 99999-9999
                    </a>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Horário de Funcionamento</h4>
                    <div className="text-dark-400 space-y-1">
                      <p>Segunda a Sexta: 09:00 - 20:00</p>
                      <p>Sábado: 09:00 - 18:00</p>
                      <p>Domingo: Fechado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa placeholder */}
            <div className="rounded-2xl overflow-hidden border border-dark-800 h-64 bg-dark-800">
              <iframe
                title="Localização Styllu's Barber Shop"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976951333286!2d-46.65390492374891!3d-23.56399406126396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1701800000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
