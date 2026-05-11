import api from '../../../services/api';

export const userService = {

  // Busca todos os usuários (Apenas para OWNER)
  listarTodos: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error("Erro ao listar todos os usuários:", error);
      throw error;
    }
  },

  // Atualiza o perfil do usuário logado (Nome, Senha, etc)
  atualizarPerfil: async (dadosPerfil) => {
    try {
      const response = await api.put('/users/meu-perfil', dadosPerfil);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      throw error;
    }
  },

  // Adiciona um novo endereço para o usuário logado
  adicionarEndereco: async (dadosEndereco) => {
    try {
      // Exemplo de dados: { logradouro, numero, bairro, cidade, cep }
      const response = await api.post('/users/me/endereco', dadosEndereco);
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar endereço:", error);
      throw error;
    }
  },

  // Lista os endereços cadastrados do usuário (ex: Jardim Arapongas)
  listarMeusEnderecos: async () => {
    try {
      const response = await api.get('/users/me/endereco/list');
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar endereços do usuário:", error);
      throw error;
    }
  },

  // Cadastro de novo usuário (Registro público)
  criar: async (dadosRegistro) => {
    try {
      const response = await api.post('/users', dadosRegistro);
      return response.data;
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
      throw error;
    }
  }
};

export default userService;