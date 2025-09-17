import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center h-full justify-center z-50">
            <div className="bg-[#1a382e] p-6 rounded-lg shadow-xl max-w-sm w-full">
                <h2 className="text-xl font-semibold text-white mb-4">Confirmar exclusão</h2>
                <p className="text-[#e0f2e9] mb-6">Você tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
