import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx';

/***Owner */

/** Fluxo equipamento e estoque**/
import EquipamentoCadastroPage from './modules/equipamento/pages/EquipamentoCadastroPage.jsx'
import CadastroEstoquePage from './modules/estoque/pages/CadastroEstoquePage.jsx'
import EstoqueOwnerPage from './modules/estoque/pages/EstoqueViewOwner.jsx';
import ExibirEquipamento from './modules/equipamento/pages/ExibirEquipamentos.jsx';

/*** Fazer o pedido*/
import TelaReserva from './modules/reserva/pages/TelaReserva.jsx'
import EnderecoCadastroPage from './modules/endereco/page/EnderecoCadastroPage.jsx';
import CartPage from './modules/carrinho/pages/CartPage.jsx';
import Vitrine from "./pages/public/Vitrine/Vitrine.jsx"
import PedidoPage from "./modules/pedido/pages/PedidoPage.jsx"
import PagamentoPage from './modules/pagamento/page/PagamentoForm.jsx';
import SucessoPage from './modules/pagamento/page/SucessPage.jsx';

/***** Alugueis cliente*/
import DashClientPage from './modules/aluguel/page/DashClientPage.jsx';
import DetalhesAluguelPage from './modules/aluguel/page/DetailhesAluguelPage.jsx';

/*Alugueis Owner**/
import ListaAlugueisPedidoOwner from './modules/aluguel/page/ListaAluguelPedidoOwner.jsx';
import DetalhesAluguelOwnerPage from './modules/aluguel/page/DetalhesAluguelOwnerPage.jsx'

/****Teste */
import TesteService  from './modules/aluguel/service/TesteService.jsx'
import PaginaDiagnostico from './modules/historico/components/PaginaDiagnostico.jsx'

import Login from './pages/Login/LoginPage.jsx'
import DetalhesProdutoPage from './modules/estoque/pages/DetalhesProdutoPage.jsx'
import AlugueisPorPedidoPage from './modules/aluguel/page/AlugueisPorPedido.jsx';
import PedidoOwnerPage from './modules/pedido/pages/PedidoOwnerPage.jsx'

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Vitrine />} />
          <Route path="/cadastrar-estoque" element={< CadastroEstoquePage />} />
          <Route path="/login" element={< Login />} />
          <Route path="/detalhes/:id" element={< DetalhesProdutoPage />} />
          <Route path="/cadastrar-equipamento/:id" element={<EquipamentoCadastroPage />} />
          <Route path="/exibir-estoque" element={<EstoqueOwnerPage />} />
          <Route path="/exibir-equipamento/:id" element={<ExibirEquipamento />} />
          <Route path="/reserva" element={<TelaReserva />} />
          <Route path="/endereco" element={<EnderecoCadastroPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/pedido/:id" element={<PedidoPage />} />
          <Route path="/pagamento/:id" element={<PagamentoPage />} />
          <Route path="/sucesso" element={<SucessoPage />} />
          <Route path="/dash-client" element={<DashClientPage />} />
          <Route path="/lista-alugueis/:id" element={<AlugueisPorPedidoPage />} />
          <Route path="/detalhes-alugueis/:id" element={<DetalhesAluguelPage />} />
          <Route path="/admin/pedidos" element={<PedidoOwnerPage />}/>
          <Route path="/admin/pedidos/:idPedido/detalhes" element={<ListaAlugueisPedidoOwner />} />
          <Route path="/detalhes-aluguel-owner/:id"   element={<DetalhesAluguelOwnerPage/>}/>
          <Route path="/teste/:id"   element={<TesteService/>}/>
          <Route path="/diagnostico" element={<PaginaDiagnostico/>}/>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
