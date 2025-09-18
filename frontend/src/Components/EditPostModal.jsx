import React, { useState, useEffect } from 'react';

const EditPostModal = ({ isOpen, onClose, onSave, postContent, isPublic }) => {
    const [content, setContent] = useState(postContent);
    const [publico, setPublico] = useState(isPublic);

    useEffect(() => {
        setContent(postContent);
        setPublico(isPublic);
    }, [postContent, isPublic, isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleSave = () => {
        onSave(content, publico);
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center h-full justify-center z-50">
            <div className="bg-[#1a382e] p-5 rounded-xl shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-semibold text-white mb-4">Editar Post</h2>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 bg-[#1C3024] border-none focus:ring-0 resize-none placeholder-gray-400 text-[#e0f2e9]"
                    rows="5"
                    maxLength={280}
                ></textarea>

                <div className="flex items-center justify-between pt-4 border-t border-[#2a4a3e]">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>Postagem pública</span>
                        <div onClick={() => setPublico(!publico)} className="w-10 h-5 flex items-center bg-[#2a4a3e] rounded-full p-1 cursor-pointer">
                            <div className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${publico ? 'bg-[#6ee7b7] translate-x-full' : 'bg-gray-400'}`}></div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">{content.length}/280</span>
                        <button
                            onClick={onClose}
                            className="px-5 py-2 font-bold rounded-full transition-colors duration-300 bg-gray-600 text-white hover:bg-gray-700"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={content === ''}
                            className={`px-5 py-2 font-bold rounded-full transition-colors duration-300 ${
                                content === ''
                                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                    : 'bg-[#6ee7b7] text-[#122a21] hover:bg-[#5ce1a7]'
                            }`}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPostModal;