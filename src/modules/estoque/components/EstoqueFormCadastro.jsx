import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, Upload, X, Image as ImageIcon } from 'lucide-react';

const EstoqueFormCadastro = ({ onSubmit, isLoading, itemEditando }) => {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        precoBase: '',
        categoria: '',
        largura: '',
        altura: '',
        tipoEstoque: ''
    });

    const [arquivosSelecionados, setArquivosSelecionados] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [alerta, setAlerta] = useState(null);

    useEffect(() => {
        if (itemEditando) setFormData(itemEditando);
    }, [itemEditando]);

    const handleFiles = (files) => {
        const novosArquivos = Array.from(files).filter(file => file.type.startsWith('image/'));
        setArquivosSelecionados(prev => [...prev, ...novosArquivos]);
        const novasPreviews = novosArquivos.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...novasPreviews]);
    };

    const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const onDragLeave = () => setIsDragging(false);
    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const removerArquivo = (index) => {
        setArquivosSelecionados(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();


        if (!formData.nome || !formData.categoria) {
            setAlerta('Nome e Categoria são obrigatórios.');
            return;
        }

        setAlerta(null);


        const data = new FormData();

        // Criamos o objeto exatamente como o Record/DTO Java espera
        const payloadJava = {
            nome: formData.nome,
            descricao: formData.descricao || null,
            categoria: formData.categoria,
            precoBase: formData.precoBase ? parseFloat(formData.precoBase) : null,
            largura: formData.largura,
            altura: formData.altura,
            tipoEstoque: formData.tipoEstoque

        };


        data.append('request', new Blob([JSON.stringify(payloadJava)], {
            type: "application/json"
        }));

        // Adicionamos os arquivos (o @RequestPart("arquivos") do Java)
        arquivosSelecionados.forEach(file => {
            data.append('arquivos', file);
        });

        // Chama o salvarTenda do seu Hook useEstoque
        onSubmit(data);
    };

    const inputStyle = `block w-full text-lg font-medium text-gray-900 bg-white border border-gray-200 shadow-inner p-4 md:p-5 rounded-2xl transition-all focus:border-blue-300 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100`;
    const labelStyle = "block text-sm font-semibold text-gray-700 mb-2 tracking-wide";

    return (
        <form onSubmit={handleFormSubmit} className="space-y-8">
            {alerta && (
                <div className="flex items-center gap-3 p-4 bg-amber-50 text-amber-800 rounded-xl border border-amber-200">
                    <AlertTriangle size={20} />
                    <span className="text-sm">{alerta}</span>
                </div>
            )}

            {/* NOME */}
            <div>
                <label className={labelStyle}>Nome do Modelo</label>
                <input
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Ex: Tenda Piramidal 4x4"
                    className={inputStyle}
                    disabled={isLoading}
                />
            </div>

            {/* DESCRIÇÃO */}
            <div>
                <label className={labelStyle}>Descrição Detalhada</label>
                <textarea
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    placeholder="Descreva as especificações, material ou detalhes importantes..."
                    className={`${inputStyle} h-32 resize-none leading-relaxed`}
                    disabled={isLoading}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* PREÇO */}
                <div>
                    <label className={labelStyle}>Preço Base de Locação (R$)</label>
                    <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
                        <input
                            type="number"
                            step="0.01"
                            name="precoBase"
                            value={formData.precoBase}
                            onChange={handleChange}
                            placeholder="0,00"
                            className={`${inputStyle} pl-12`}
                            disabled={isLoading}
                        />
                    </div>
                </div>


                {/* CATEGORIA */}
                <div>
                    <label className={labelStyle}>Categoria</label>
                    <select
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        className={inputStyle}
                        disabled={isLoading}
                    >
                        <option value="">Selecione...</option>
                        <option value="Tendas">Tendas</option>
                        <option value="Cadeiras">Cadeiras</option>
                        <option value="Mesas">Mesas</option>
                    </select>
                </div>
            </div>


            <div>
                <label className={labelStyle}>Altura (m)</label>
                <div className="relative">
                    <input
                        type="number"
                        step="0.01"
                        name="altura"
                        value={formData.altura || ''}
                        onChange={handleChange}
                        placeholder="0.00"
                        className={inputStyle}
                        disabled={isLoading}
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">m</span>
                </div>
            </div>


            
            <div>
                <label className={labelStyle}>Largura (m)</label>
                <div className="relative">
                    <input
                        type="number"
                        step="0.01"
                        name="largura"
                        value={formData.largura || ''}
                        onChange={handleChange}
                        placeholder="0.00"
                        className={inputStyle}
                        disabled={isLoading}
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">m</span>
                </div>
            </div>

            {/* TipoEstoque */}
            <div>
                <label className={labelStyle}>Tipo de medida</label>
                <select
                    name="tipoEstoque"
                    value={formData.tipoEstoque}
                    onChange={handleChange}
                    className={inputStyle}
                    disabled={isLoading}
                >
                    <option value="">Selecione...</option>
                    <option value="METRAGEM">Metragem</option>
                    <option value="Unitario">Unitario</option>
                </select>
            </div>


            {/* DRAG & DROP */}
            <div>
                <label className={labelStyle}>Fotos do Modelo</label>
                <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={`relative border-2 border-dashed rounded-[2rem] p-8 transition-all flex flex-col items-center justify-center cursor-pointer
                        ${isDragging ? 'border-blue-500 bg-blue-50 scale-[0.99]' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
                    onClick={() => document.getElementById('fileInput').click()}
                >
                    <input
                        id="fileInput"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFiles(e.target.files)}
                    />
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4 text-blue-500">
                        <Upload size={32} />
                    </div>
                    <p className="text-gray-600 font-medium text-center">Arraste as fotos aqui ou clique para selecionar</p>
                </div>

                {previews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        {previews.map((url, index) => (
                            <div key={index} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-200">
                                <img src={url} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removerArquivo(index); }}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="pt-8 border-t flex justify-end">
                <button
                    type="submit"
                    className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg disabled:opacity-50"
                    disabled={isLoading}
                >
                    <Package size={22} />
                    {isLoading ? 'Enviando...' : 'Confirmar Cadastro'}
                </button>
            </div>
        </form >
    );
};

export default EstoqueFormCadastro;