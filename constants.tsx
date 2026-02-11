import { Smile, Zap, Heart, ShieldCheck, User, Sparkles, Clock, MapPin } from 'lucide-react';
import { ServiceItem, TestimonialItem, DoctorItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Clareamento Dental',
    description: 'Tecnologia avançada a laser para um sorriso até 8 tons mais branco em apenas uma sessão.',
    icon: Sparkles,
  },
  {
    id: '2',
    title: 'Implantes Dentários',
    description: 'Reabilitação oral completa com materiais de titânio biocompatíveis e garantia vitalícia.',
    icon: ShieldCheck,
  },
  {
    id: '3',
    title: 'Ortodontia Invisível',
    description: 'Alinhadores transparentes que corrigem seu sorriso sem o desconforto dos aparelhos fixos.',
    icon: Smile,
  },
  {
    id: '4',
    title: 'Harmonização Facial',
    description: 'Procedimentos estéticos para equilibrar os traços do rosto e realçar sua beleza natural.',
    icon: User,
  },
  {
    id: '5',
    title: 'Odontopediatria',
    description: 'Cuidado especializado e lúdico para a saúde bucal das crianças desde o primeiro dente.',
    icon: Heart,
  },
  {
    id: '6',
    title: 'Urgência 24h',
    description: 'Atendimento prioritário para dores agudas e acidentes. Estamos aqui quando você precisa.',
    icon: Zap,
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Mariana Silva',
    role: 'Empresária',
    content: 'O atendimento na Luminous foi impecável. Fiz meu clareamento e o resultado superou todas as expectativas. A equipe é super atenciosa!',
    rating: 5,
    image: 'https://picsum.photos/100/100?random=1',
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    role: 'Advogado',
    content: 'Tinha muito medo de dentista, mas a Dra. Fernanda me deixou super tranquilo. O implante foi indolor e a recuperação muito rápida.',
    rating: 5,
    image: 'https://picsum.photos/100/100?random=2',
  },
  {
    id: '3',
    name: 'Juliana Costa',
    role: 'Arquiteta',
    content: 'Ambiente moderno e tecnologia de ponta. Fiz os alinhadores invisíveis e ninguém percebeu que eu estava usando. Recomendo!',
    rating: 5,
    image: 'https://picsum.photos/100/100?random=3',
  },
];

export const DOCTORS: DoctorItem[] = [
  {
    id: '1',
    name: 'Dra. Fernanda Santos',
    specialty: 'Ortodontista & Estética',
    image: 'https://picsum.photos/400/500?random=4',
    bio: 'Especialista em Invisalign Doctor com mais de 10 anos transformando sorrisos.',
  },
  {
    id: '2',
    name: 'Dr. Roberto Almeida',
    specialty: 'Implantodontia',
    image: 'https://picsum.photos/400/500?random=5',
    bio: 'Mestre em Cirurgia Buco-Maxilo-Facial, focado em reabilitações complexas.',
  },
  {
    id: '3',
    name: 'Dra. Camila Rocha',
    specialty: 'Harmonização Orofacial',
    image: 'https://picsum.photos/400/500?random=6',
    bio: 'Pós-graduada em estética facial, unindo saúde e beleza com naturalidade.',
  },
];

export const NAV_LINKS = [
  { name: 'Início', href: '#home' },
  { name: 'Serviços', href: '#services' },
  { name: 'Equipe', href: '#team' },
  { name: 'Depoimentos', href: '#testimonials' },
  { name: 'Contato', href: '#contact' },
];
