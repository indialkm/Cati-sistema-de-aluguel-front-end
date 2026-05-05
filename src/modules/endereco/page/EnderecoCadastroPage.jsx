import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar'
import { ArrowRight } from 'lucide-react';
import useEndereco from '../hook/useEndereco';
import ListaEnderecos from '../components/ListaEndereco';
import FormularioEndereco from '../components/FormularioEndereco';
import api from '../../../services/api';

export default function EnderecoCadastroPage() {
  const { enderecos, loading, listarMeusEnderecos, adicionarLogado } = useEndereco();
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [exibirForm, setExibirForm] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { idReserva } = location.state || {};

  // 1. Busca os dados ao montar o componente
  useEffect(() => {
    listarMeusEnderecos();
  }, [listarMeusEnderecos]);

  useEffect(() => {
   
    if (!loading && !enderecoSelecionado) {
      if (enderecos.length === 0) {
        setExibirForm(true);
      } else {
        setExibirForm(false);
      }
    }
  }, [enderecos, loading]); 

  const handleSalvarNovo = async (dados) => {
    const salvo = await adicionarLogado(dados);
    if (salvo) {
      setEnderecoSelecionado(salvo);
      setExibirForm(false);
      listarMeusEnderecos();
    }
  };

  const handleFinalizar = async () => {
    try {
      const res = await api.post('/carrinho/adicionar', { 
        idReserva, 
        idEndereco: enderecoSelecionado.id 
      });
      navigate('/carrinho', { state: { idCarrinho: res.data.id } });
    } catch (err) {
      console.log("Erro ao processar pedido.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      <main className="max-w-5xl mx-auto py-12 px-4">
        <header className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 italic">Onde entregaremos sua tenda?</h2>
        </header>

        {/* 1. Lista de Endereços Existentes */}
        <ListaEnderecos 
          enderecos={enderecos} 
          selecionado={enderecoSelecionado}
          aoSelecionar={(end) => {
            setEnderecoSelecionado(end);
            setExibirForm(false);
          }}
        />

        {/* 2. Alternador para novo endereço */}
        <div className="mb-6 flex justify-center">
          <button 
            onClick={() => {
              setExibirForm(!exibirForm);
              setEnderecoSelecionado(null);
            }}
            className="text-blue-600 font-bold hover:underline"
          >
            {exibirForm ? "← Voltar para meus endereços" : "+ Adicionar novo endereço para entrega"}
          </button>
        </div>

        {/* 3. Formulário (Condicional) */}
        {exibirForm && (
          <FormularioEndereco aoSalvar={handleSalvarNovo} loading={loading} />
        )}

        {/* 4. Botão Final (Sempre visível se houver seleção) */}
        {enderecoSelecionado && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={handleFinalizar}
              className="w-full max-w-md bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl animate-bounce-short"
            >
              Confirmar Endereço e Ir para Pagamento
              <ArrowRight size={22} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}