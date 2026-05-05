import React from 'react';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import { FormularioEquipamentoCadastro } from '../components/FormularioEquipamentoCadastro';

export default function EquipamentoCadastroPage() {
    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                {/* Cabeçalho alinhado ao padrão do Dashboard */}
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Novo Equipamento
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Preencha os dados abaixo para vincular um item ao estoque.
                    </p>
                </header>

                {/* Área do Formulário */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <FormularioEquipamentoCadastro />
                </section>
                
                <footer className="mt-12 text-center text-sm text-gray-400">
                    <p>© 2026 Sistema de Gestão de Equipamentos - TCC</p>
                </footer>
            </div>
        </AdminLayout>
    );
}