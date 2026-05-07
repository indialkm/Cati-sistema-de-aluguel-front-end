import { useState } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  HeartIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const { estaLogado, loading, hasRole, logout } = useAuth();
  const navigate = useNavigate();
  const signed = estaLogado();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Nossa história', href: '/category' },
    { name: 'Nossas soluções', href: '/collections' },
    { name: 'Nosso contato', href: '/contact' },
  ];


  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  const handleUserClick = () => {
    if (loading === true) return;
    if (signed === false) {
      navigate('/login');
    } else {
      if (hasRole('OWNER')) {
        navigate('/admin/dashboard'); 
      } else {
        navigate('/dash-client');   
      }
    }
  };

  return (
    <nav className="bg-[#0A0F1C] text-white w-full z-50 sticky top-0 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LOGO */}
          <div className="shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              Meta<span className="text-white/80">Lonas</span>
            </Link>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium hover:text-gray-300 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ICONS */}
          <div className="hidden md:flex items-center space-x-5">
            <button className="hover:text-gray-300 transition-colors">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button className="hover:text-gray-300 transition-colors">
              <HeartIcon className="h-6 w-6" />
            </button>
            
            <Link to="/carrinho" className="relative hover:text-gray-300 transition-colors">
              <ShoppingBagIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>

            <button
              onClick={handleUserClick}
              disabled={loading} 
              className={`hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer ${loading ? 'opacity-50' : ''}`}>
              <UserCircleIcon className="h-6 w-6" />
            </button>

            {/* --- BOTÃO DE SAIR (Apenas se estiver logado) --- */}
            {signed === true && (
              <button 
                onClick={handleLogout}
                title="Sair"
                className="hover:text-red-400 transition-colors text-red-500"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-800"
            >
              {isOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-[#0A0F1C] border-t border-gray-800`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex justify-around py-4 border-t border-gray-800 mt-2">
            <MagnifyingGlassIcon className="h-6 w-6" />
            <HeartIcon className="h-6 w-6" />
            <ShoppingBagIcon className="h-6 w-6" />
            <UserCircleIcon className="h-6 w-6" onClick={handleUserClick} />
            
            {/* SAIR NO MOBILE */}
            {signed === true && (
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-500" onClick={handleLogout} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}