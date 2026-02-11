import React, { useState } from 'react';
import Navbar from './components/Layout/Navbar';
import Button from './components/ui/Button';
import BookingModal from './components/Features/BookingModal';
import AiAssistant from './components/Features/AiAssistant';
import { SERVICES, TESTIMONIALS, DOCTORS } from './constants';
import { Check, Star, MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openBooking = () => setIsModalOpen(true);
  const closeBooking = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenBooking={openBooking} />
      
      {/* HERO SECTION */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2068" 
            alt="Consultório Odontológico Moderno" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-white/60"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6 animate-fade-in-up">
              <Star size={16} className="mr-2 fill-primary-700" />
              Clínica Premiada 2024
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
              Transforme seu sorriso com a <span className="text-primary-600">tecnologia</span> que você merece.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              Na Luminous, unimos excelência técnica com atendimento humanizado. Descubra uma nova experiência em odontologia, sem dor e com resultados surpreendentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={openBooking}>
                Agendar Avaliação
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('services')?.scrollIntoView()}>
                Conhecer Tratamentos
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="text-green-500" size={20} />
                <span>Tecnologia 3D</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-green-500" size={20} />
                <span>Profissionais Especializados</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-green-500" size={20} />
                <span>Ambiente Relaxante</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Tratamentos Completos</h2>
            <p className="text-lg text-gray-600">Cuidamos de todas as etapas da sua saúde bucal, da prevenção à estética avançada.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="group p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                <button className="text-primary-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm" onClick={openBooking}>
                  Saiba mais <Check size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / DOCTORS SECTION */}
      <section id="team" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">Especialistas apaixonados por sorrisos</h2>
              <p className="text-lg text-gray-600 mb-6">
                Nossa equipe é formada por mestres e doutores em suas áreas de atuação. Investimos constantemente em cursos internacionais para trazer o que há de mais moderno para você.
              </p>
              <div className="space-y-4 mb-8">
                {['Mais de 5.000 sorrisos transformados', 'Equipamentos de última geração', 'Atendimento personalizado e humanizado'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center flex-shrink-0">
                      <Check size={14} />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Button onClick={openBooking}>Conheça a Equipe</Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               {DOCTORS.slice(0, 2).map((doctor, idx) => (
                 <div key={doctor.id} className={`rounded-2xl overflow-hidden shadow-lg ${idx === 1 ? 'mt-12' : ''}`}>
                    <img src={doctor.image} alt={doctor.name} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
                    <div className="bg-white p-4">
                      <p className="font-bold text-gray-900">{doctor.name}</p>
                      <p className="text-sm text-primary-600">{doctor.specialty}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-primary-600 text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-500 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-primary-700 rounded-full opacity-50 blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">O que nossos pacientes dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-all">
                <div className="flex gap-1 mb-4 text-accent-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-lg italic mb-6 text-white/90">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-white/50" />
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-primary-200">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & FOOTER */}
      <footer id="contact" className="bg-gray-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white font-bold">L</div>
                 <span className="text-2xl font-bold">Luminous</span>
              </div>
              <p className="text-gray-400 mb-6">Cuidando do seu sorriso com excelência e tecnologia de ponta para que você possa brilhar sempre.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">Links Rápidos</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-400 hover:text-primary-400 transition-colors">Início</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-primary-400 transition-colors">Tratamentos</a></li>
                <li><a href="#team" className="text-gray-400 hover:text-primary-400 transition-colors">Corpo Clínico</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-lg mb-6">Fale Conosco</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400">
                  <MapPin className="text-primary-500 mt-1 flex-shrink-0" size={18} />
                  <span>Rua das Flores, 123 - Centro<br/>São Paulo - SP</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Phone className="text-primary-500 flex-shrink-0" size={18} />
                  <span>(11) 99999-8888</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Mail className="text-primary-500 flex-shrink-0" size={18} />
                  <span>contato@luminous.com.br</span>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h3 className="font-bold text-lg mb-6">Horário de Atendimento</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex justify-between border-b border-gray-800 pb-2">
                  <span>Seg - Sex</span>
                  <span>08:00 - 19:00</span>
                </li>
                <li className="flex justify-between border-b border-gray-800 pb-2">
                  <span>Sábado</span>
                  <span>09:00 - 13:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Domingo</span>
                  <span className="text-secondary-500">Fechado</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Luminous Odontologia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <AiAssistant />
      <BookingModal isOpen={isModalOpen} onClose={closeBooking} />
    </div>
  );
};

export default App;