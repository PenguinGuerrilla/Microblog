import { Pencil, Trash2Icon } from 'lucide-react';
import React, { useState, useContext } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditPostModal from './EditPostModal';
import { AppContext } from '../Contexts/AppContext';
import { toast } from 'react-toastify';

const Post = ({ post, user, onPostDeleted, onPostUpdated }) => {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const { token } = useContext(AppContext);

    const timeAgo = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.round((now - date) / 1000);
        const minutes = Math.round(seconds / 60);
        const hours = Math.round(minutes / 60);
        const days = Math.round(hours / 24);
        const weeks = Math.round(days / 7);
        const months = Math.round(days / 30.44);
        const years = Math.round(days / 365.25);

        if (seconds < 5) {
            return "agora mesmo";
        } else if (seconds < 60) {
            return `${seconds} segundos atrás`;
        } else if (minutes < 60) {
            return minutes === 1 ? "há 1 minuto" : `há ${minutes} minutos`;
        } else if (hours < 24) {
            return hours === 1 ? "há 1 hora" : `há ${hours} horas`;
        } else if (days < 7) {
            return days === 1 ? "ontem" : `há ${days} dias`;
        } else if (weeks < 5) {
            return weeks === 1 ? "semana passada" : `há ${weeks} semanas`;
        } else if (months < 12) {
            return months === 1 ? "mês passado" : `há ${months} meses`;
        } else {
            return years === 1 ? "ano passado" : `há ${years} anos`;
        }
    };

    const handleDeleteClick = () => setDeleteModalOpen(true);
    const handleCloseDeleteModal = () => setDeleteModalOpen(false);

    const handleConfirmDelete = async () => {
        if (!token) {
            toast.error("Authentication token not found.");
            return;
        }

        try {
            const response = await fetch(`/api/posts/${post.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                toast.success("Post deleted successfully");
                if (onPostDeleted) {
                    onPostDeleted(post.id);
                }
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to delete post");
            }
        } catch (error) {
            toast.error("Error deleting post: " + error.message);
        } finally {
            setDeleteModalOpen(false);
        }
    };

    const handleEditClick = () => setEditModalOpen(true);
    const handleCloseEditModal = () => setEditModalOpen(false);

    if (post.image) console.log(post.image.url)

    const handleSaveEdit = async (newContent, newPublico) => {
        if (!token) {
            toast.error("Não autenticado.");
            return;
        }

        try {
            const response = await fetch(`/api/posts/${post.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    conteudo: newContent,
                    publico: newPublico,
                    user_id: user.id
                }),
            });

            if (response.ok) {
                toast.success("Post atualizado com sucesso!");
                if (onPostUpdated) {
                    onPostUpdated();
                }
            } else {
                toast.error("Erro ao atualizar post");
            }
        } catch (error) {
            toast.error("Erro ao atualizar post");
        } finally {
            setEditModalOpen(false);
        }
    };

    return (
        <>
            <div key={post.id} className="p-5 rounded-xl">
                <div className="flex items-start space-x-4">
                    <img
                        src={post.user.gravatar}
                        alt={post.user.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-start mb-2">
                            <span className="font-bold mr-4 text-lg text-white">{post.user.name}</span>
                            <div className="flex items-center space-x-3">
                                <span className="text-sm text-[#96C4A8]">{timeAgo(post.created_at)}</span>
                                {user && user.id == post.user.id ? (
                                    <div className="flex items-center space-x-3">
                                        <div
                                            onClick={handleEditClick}
                                            className="bg-[#264533] p-2 rounded-full cursor-pointer transition-colors duration-200 hover:bg-[#6e6d3a]"
                                        >
                                            <Pencil size={15} />
                                        </div>
                                        <div
                                            onClick={handleDeleteClick}
                                            className="bg-[#264533] p-2 rounded-full cursor-pointer transition-colors duration-200 hover:bg-[#6e3a3a]"
                                        >
                                            <Trash2Icon size={15} />
                                        </div>
                                    </div>
                                ) : ('')}
                            </div>
                        </div>
                        <p className="text-[#e0f2e9] text-start break-words">{post.conteudo}</p>
                        {post.image && (
                            <img
                                src={post.image.url}
                                alt="Post image"
                                className="mt-4 rounded-lg h-96 w-full object-cover cursor-pointer"
                                onClick={() => setImageModalOpen(true)}
                            />
                        )}
                    </div>
                </div>
            </div>
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
            />
            <EditPostModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                onSave={handleSaveEdit}
                postContent={post.conteudo}
                isPublic={post.publico}
            />
            {isImageModalOpen && (
                <div
                    className="fixed inset-0 bg-[rgba(0,0,0,0.5)] h-full flex items-center justify-center p-20 z-50"
                    onClick={() => setImageModalOpen(false)}
                >
                    <img
                        src={post.image.url}
                        alt="Post image"
                        className="max-w-full rounded-2xl max-h-full"
                    />
                </div>
            )}
        </>
    )
}

export default Post;