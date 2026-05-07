import { Navigate } from 'react-router-dom';

import Vitrine from "../pages/public/Vitrine/Vitrine.jsx";
import Login from '../pages/Login/LoginPage.jsx';
import CadastroEstoquePage from '../modules/estoque/pages/CadastroEstoquePage.jsx';
import DetalhesProdutoPage from '../modules/estoque/pages/DetalhesProdutoPage.jsx';
import EquipamentoCadastroPage from '../modules/equipamento/pages/EquipamentoCadastroPage.jsx';
import EstoqueOwnerPage from '../modules/estoque/pages/EstoqueViewOwner.jsx';
import ExibirEquipamento from '../modules/equipamento/pages/ExibirEquipamentos.jsx';
import TelaReserva from '../modules/reserva/pages/TelaReserva.jsx';
import EnderecoCadastroPage from '../modules/endereco/page/EnderecoCadastroPage.jsx';
import CartPage from '../modules/carrinho/pages/CartPage.jsx';
import PedidoPage from '../modules/pedido/pages/PedidoPage.jsx';
import PagamentoPage from '../modules/pagamento/page/PagamentoForm.jsx';
import SucessoPage from '../modules/pagamento/page/SucessPage.jsx';
import DashClientPage from '../modules/aluguel/page/DashClientPage.jsx';
import AlugueisPorPedidoPage from '../modules/aluguel/page/AlugueisPorPedido.jsx';
import DetalhesAluguelPage from '../modules/aluguel/page/DetailhesAluguelPage.jsx';
import PedidoOwnerPage from '../modules/pedido/pages/PedidoOwnerPage.jsx';
import ListaAlugueisPedidoOwner from '../modules/aluguel/page/ListaAluguelPedidoOwner.jsx';
import DetalhesAluguelOwnerPage from '../modules/aluguel/page/DetalhesAluguelOwnerPage.jsx';
import TesteService from '../modules/aluguel/service/TesteService.jsx';
import PaginaDiagnostico from '../modules/historico/components/PaginaDiagnostico.jsx';

export const routesConfig = [
  // --- ROTAS PÚBLICAS ---
  { path: "/", element: <Vitrine /> },
  { path: "/login", element: <Login /> },
  { path: "/detalhes/:id", element: <DetalhesProdutoPage /> },


  // --- FLUXO DE COMPRA/RESERVA ---
  { path: "/carrinho", element: <CartPage /> },
  { path: "/reserva", element: <TelaReserva /> },
  { path: "/endereco", element: <EnderecoCadastroPage /> },
  { path: "/pagamento/:id", element: <PagamentoPage /> },
  { path: "/sucesso", element: <SucessoPage /> },

  // --- ÁREA DO CLIENTE ---
  { path: "/dash-client", element: <DashClientPage /> },
  { path: "/pedido/:id", element: <PedidoPage /> },
  { path: "/lista-alugueis/:id", element: <AlugueisPorPedidoPage /> },
  { path: "/detalhes-alugueis/:id", element: <DetalhesAluguelPage /> },

  // --- ÁREA DO PROPRIETÁRIO (OWNER / ADMIN) ---
  { path: "/admin/pedidos", element: <PedidoOwnerPage /> },
  { path: "/admin/pedidos/:idPedido/detalhes", element: <ListaAlugueisPedidoOwner /> },
  { path: "/cadastrar-estoque", element: <CadastroEstoquePage /> },
  { path: "/exibir-estoque", element: <EstoqueOwnerPage /> },
  { path: "/cadastrar-equipamento/:id", element: <EquipamentoCadastroPage /> },
  { path: "/exibir-equipamento/:id", element: <ExibirEquipamento /> },
  { path: "/detalhes-aluguel-owner/:id", element: <DetalhesAluguelOwnerPage /> },

  // --- UTILITÁRIOS E DESENVOLVIMENTO ---
  { path: "/teste/:id", element: <TesteService /> },
  { path: "/diagnostico", element: <PaginaDiagnostico /> },
  
  // Rota de fallback (404)
  { path: "*", element: <Navigate to="/" /> }
];