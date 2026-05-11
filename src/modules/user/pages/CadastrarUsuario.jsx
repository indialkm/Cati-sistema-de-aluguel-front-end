import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../service/userService';

const CadastrarUsuario = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        password: '',
        cpf: '',
        cnpj: '',
        telefone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Chamando o service que criamos antes
            await userService.criar(formData);
            alert("Cadastro realizado com sucesso!");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao realizar cadastro. Verifique os dados.");
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all";
    const labelStyle = "block text-sm font-semibold text-gray-700 mb-1";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Crie sua conta</h2>

                {error && <p className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">{error}</p>}

                <div>
                    <label className={labelStyle}>Nome Completo</label>
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className={inputStyle} placeholder="Ex: Ingrid Alkmim" />
                </div>

                <div>
                    <label className={labelStyle}>E-mail</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputStyle} placeholder="seu@email.com" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelStyle}>Senha</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required className={inputStyle} placeholder="******" />
                    </div>
                    <div>
                        <label className={labelStyle}>Telefone</label>
                        <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className={inputStyle} placeholder="(11) 99999-9999" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                    <div>
                        <label className={labelStyle}>CPF (Pessoa Física)</label>
                        <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className={inputStyle} placeholder="000.000.000-00" />
                    </div>
                    <div>
                        <label className={labelStyle}>CNPJ (Empresa)</label>
                        <input type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} className={inputStyle} placeholder="00.000.000/0001-00" />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg disabled:bg-blue-300"
                >
                    {isLoading ? "Processando..." : "Finalizar Cadastro"}
                </button>
            </form>
        </div>
    );
};

export default CadastrarUsuario;