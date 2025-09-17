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
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
            <div className="bg-[#1a382e] p-6 rounded-lg shadow-xl max-w-lg w-full">
                <h2 className="text-xl font-semibold text-white mb-4">Editar Post</h2>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 bg-[#1C3024] border border-[#366347] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#38E07A] resize-none"
                    rows="5"
                ></textarea>
                <div className="flex items-center space-x-2 mt-4">
                    <label className="text-white">Postagem Pública</label>
                    <div onClick={() => setPublico(!publico)} className="w-10 h-5 flex items-center bg-[#2a4a3e] rounded-full p-1 cursor-pointer">
                        <div className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${publico ? 'bg-[#6ee7b7] translate-x-full' : 'bg-gray-400'}`}></div>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#6ee7b7] text-[#122a21] font-bold rounded-md hover:bg-[#5ce1a7]"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPostModal;