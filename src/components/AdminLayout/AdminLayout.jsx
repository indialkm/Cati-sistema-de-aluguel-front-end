import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import Sidebar from '../Sidebar/Sidebar';

const AdminLayout = ({ children }) => {
  const { estaLogado, hasRole, loading } = useAuth();
  const navigate = useNavigate();
  const signed = estaLogado();
  
  
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
   
    if (loading === true) return;
    
    if (signed === false || hasRole('ROLE_OWNER') === false) {
      setShowModal(true); 
     
      const timer = setTimeout(() => {
        navigate('/'); 
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [signed, loading, hasRole, navigate]);

  return (
    
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* MODAL DE ÁREA RESTRITA */}
      {showModal === true && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-2xl border-t-4 border-red-600 max-w-sm text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Acesso Negado!</h2>
            <p className="text-gray-600 mb-4">
              Esta é uma área exclusiva para administradores. 
              Você será redirecionado em instantes...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;