import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
        const response = await api.post('/auth/login', credentials); 
        
      
        const token = response.data.token; 

        if (token) {
            // 2. SALVAR NO NAVEGADOR
            localStorage.setItem('token', token);
            
           
            localStorage.setItem('login', JSON.stringify(response.data.user));

            console.log("Login realizado e token salvo!");
          
            const origin = location.state?.from?.pathname || '/';
            navigate(origin);
        }
    } catch (error) {
        console.error("Erro na autenticação:", error);
        alert("Falha no login. Verifique suas credenciais.");
    }
};

  return (
    <div className="w-full max-w-[450px]">
      <h2 className="text-[48px] font-bold text-[#001B44] mb-12">Login</h2>
      
      <form onSubmit={handleLogin} className="space-y-10">
        {/* Campo Email/Username */}
        <div className="relative">
          <label className="block text-sm font-bold text-[#001B44] mb-1">Email</label>
          <input 
            type="text" 
            className="w-full border-b-2 border-[#001B44] py-2 outline-none bg-transparent text-lg focus:border-blue-500 transition-colors"
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            required
          />
        </div>

        {/* Campo Senha */}
        <div className="relative">
          <label className="block text-sm font-bold text-[#001B44] mb-1">senha</label>
          <input 
            type="password"
            className="w-full border-b-2 border-[#001B44] py-2 outline-none bg-transparent text-lg focus:border-blue-500 transition-colors"
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
        </div>

        {/* CONTAINER DO BOTÃO + TEXTO (ESTILO FIGMA) */}
        <div className="flex items-center justify-between gap-4 pt-6">
          
          {/* Texto de Registro */}
          <p className="text-[12px] text-[#001B44]/70 leading-tight max-w-[150px]">
            Não tem uma conta, registre se no nosso site
          </p>
          
          {/* O BOTÃO DE LOGIN */}
          <button 
            type="submit" // Importante: type submit para acionar o onSubmit do form
            className="bg-[#001B44] text-white px-12 py-3 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}