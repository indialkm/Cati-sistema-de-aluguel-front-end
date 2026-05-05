import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, PackagePlus, Boxes, User, LogOut, Menu, X
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false); // Estado para o mobile

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <PackagePlus size={20} />, label: 'Novo Estoque', path: '/cadastrar-estoque' },
        { icon: <Boxes size={20} />, label: 'Ver Estoque', path: '/exibir-estoque' },
        { icon: <Boxes size={20} />, label: 'Ver Pedidos', path: '/admin/pedidos' },
        { icon: <Boxes size={20} />, label: 'Ver Alugueis', path: '' },
        { icon: <User size={20} />, label: 'Perfil', path: '/perfil' },
    ];

    return (
        <>
            {/* BOTÃO HAMBÚRGUER (Aparece apenas no mobile) */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-4 left-4 z-40 p-2 bg-slate-900 text-white rounded-lg shadow-lg"
            >
                <Menu size={24} />
            </button>

            {/* OVERLAY (Fundo escuro quando aberto no mobile) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* ASIDE (A Sidebar em si) */}
            <aside className={`
                w-64 bg-slate-900 min-h-screen flex flex-col text-slate-300 shadow-xl fixed left-0 top-0 z-50
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0
            `}>
                {/* CABEÇALHO COM BOTÃO FECHAR (Mobile) */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <Boxes size={24} />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">CatiEstoques</span>
                    </div>
                    {/* Botão fechar apenas visível no mobile */}
                    <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 p-4 mt-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)} // Fecha ao clicar no link (mobile)
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive(item.path)
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <span className={`${isActive(item.path) ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`}>
                                {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-900/20 hover:text-red-400 transition-all">
                        <LogOut size={20} />
                        <span className="font-medium">Sair do Painel</span>
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;