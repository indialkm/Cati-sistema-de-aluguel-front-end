import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import tendaImg from '../../assets/image/tenda08.jpeg';
import { routesConfig } from '../../routes/routesConfig';

export function LoginForm() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const location = useLocation();
  


    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            const result = await login(credentials.username, credentials.password);

            if (result && result.success) {
                console.log("Login bem-sucedido via AuthContext");


                const origin = location.state?.from?.pathname || '/';
                navigate(origin);
            } else {

                alert(result?.error || "Erro ao realizar login.");
            }
        } catch (error) {
            console.error("Erro técnico no formulário:", error);
            alert("Ocorreu um erro ao processar sua solicitação.");
        }
    };

    return (
        <div className="w-full max-w-[450px]">
            <h2 className="text-[48px] font-bold text-[#001B44] mb-12">Login</h2>

            <form onSubmit={handleLogin} className="space-y-10">
                <div className="relative">
                    <label className="block text-sm font-bold text-[#001B44] mb-1">Email</label>
                    <input
                        type="text"
                        className="w-full border-b-2 border-[#001B44] py-2 outline-none bg-transparent text-lg focus:border-blue-500 transition-colors"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        required
                    />
                </div>

                <div className="relative">
                    <label className="block text-sm font-bold text-[#001B44] mb-1">Senha</label>
                    <input
                        type="password"
                        className="w-full border-b-2 border-[#001B44] py-2 outline-none bg-transparent text-lg focus:border-blue-500 transition-colors"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        required
                    />
                </div>

                <div className="flex items-center justify-between gap-4 pt-6">
                    <button
                        type="button"
                        onClick={() => navigate("/cadastrar")}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Não tem uma conta? Cadastre-se aqui
                    </button>

                    <button
                        type="submit"
                        className="bg-[#001B44] text-white px-12 py-3 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}


export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
            <div className="relative w-full md:w-1/2 h-60 md:h-auto overflow-hidden">
                <img
                    src={tendaImg}
                    alt="Tenda de trabalho"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#162A4F]/60"></div>
            </div>

            <div className="flex-1 flex items-center justify-center p-8 sm:p-12 md:p-16 lg:p-20 bg-white">
                <LoginForm />
            </div>
        </div>
    );
}