import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS } from '../../constants';
import Button from '../ui/Button';

interface NavbarProps {
  onOpenBooking: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isScrolled ? 'bg-primary-600 text-white' : 'bg-white text-primary-600'}`}>
              <span className="font-bold text-xl">L</span>
            </div>
            <span className={`font-bold text-2xl tracking-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Luminous
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-secondary-500 ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}
              >
                {link.name}
              </a>
            ))}
            <Button 
              variant={isScrolled ? 'primary' : 'white'} 
              size="sm"
              onClick={onOpenBooking}
            >
              Agendar Consulta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute top-full left-0 w-full animate-fade-in-down">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <Button fullWidth onClick={() => { setIsOpen(false); onOpenBooking(); }}>
                Agendar Agora
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 pt-4 text-gray-500 text-sm">
              <Phone size={16} />
              <span>(11) 99999-9999</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;