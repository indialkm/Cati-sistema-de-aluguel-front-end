import { useState } from 'react';
import api from '../../services/api'; // Sua instância centralizada do Axios

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    cpf: '',
    cnpj: '',
    telefone: '',
    roles: ['CLIENT'] // Define o papel padrão para o Spring Security
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Bate no endpoint @PostMapping do seu UserController (/users)
      const response = await api.post('users', formData);
      
      if (response.status === 201) {
        alert("Usuário criado com sucesso!");
        // Aqui você pode redirecionar para o Login
      }
    } catch (error) {
      console.error("Erro na API Java:", error.response?.data);
      alert("Erro ao cadastrar: " + (error.response?.data?.message || "Verifique os dados."));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <h1 className="text-4xl font-bold text-[var(--color-primary-main)] mb-6 text-center">Register</h1>
      
      {/* Grid Responsivo: 1 col no celular, 2 col no desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          name="nome" 
          placeholder="NOME COMPLETO" 
          className="bg-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] transition-all"
          onChange={handleChange} 
        />
        <input 
          name="email" 
          type="email"
          placeholder="EMAIL" 
          className="bg-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] transition-all"
          onChange={handleChange} 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="SENHA" 
          className="bg-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] transition-all"
          onChange={handleChange} 
        />
        <input 
          name="telefone" 
          placeholder="TELEFONE" 
          className="bg-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] transition-all"
          onChange={handleChange} 
        />
        <input 
          name="cpf" 
          placeholder="CPF" 
          className="bg-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] transition-all"
          onChange={handleChange} 
        />
        <input 
          name="cnpj" 
          placeholder="CNPJ (OPCIONAL)" 
          className="bg-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] transition-all"
          onChange={handleChange} 
        />
      </div>

      <button className="bg-[var(--color-accent-orange)] text-white font-bold py-4 rounded-full mt-6 shadow-lg hover:bg-[var(--color-primary-main)] transition-all uppercase tracking-wider">
        Register
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        By Signing up, you agree our <span className="font-bold underline cursor-pointer">Terms and Conditions</span>.
      </p>
    </form>
  );
}