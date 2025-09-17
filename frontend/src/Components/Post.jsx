import { Pencil, Trash2Icon } from 'lucide-react';
import React, { useState, useContext } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditPostModal from './EditPostModal';
import { AppContext } from '../Contexts/AppContext';
import { toast } from 'react-toastify';

const Post = ({ post, user, onPostDeleted, onPostUpdated }) => {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
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

    const handleSaveEdit = async (newContent, newPublico) => {
        if (!token) {
            toast.error("Authentication token not found.");
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
                toast.success("Post updated successfully");
                if (onPostUpdated) {
                    onPostUpdated();
                }
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to update post");
            }
        } catch (error) {
            toast.error("Error updating post: " + error.message);
        } finally {
            setEditModalOpen(false);
        }
    };

    return (
        <>
            <div key={post.id} className="bg-[#1a382e] p-5 rounded-xl shadow-lg">
                <div className="flex items-start space-x-4">
                    <img
                        src={post.user.gravatar}
                        alt={post.user.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-lg">{post.user.name}</span>
                            <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-400">{timeAgo(post.created_at)}</span>
                                {user && user.id == post.user.id ?
                                    <div className="flex items-center space-x-2">
                                        <div onClick={handleEditClick} className="bg-[#2a483e] p-1 rounded-full cursor-pointer">
                                            <Pencil size={16} />
                                        </div>
                                        <div onClick={handleDeleteClick} className="bg-[#2a483e] p-1 rounded-full cursor-pointer">
                                            <Trash2Icon size={16} />
                                        </div>
                                    </div>
                                    : ''}
                            </div>
                        </div>
                        <p className="text-[#e0f2e9] text-start">{post.conteudo}</p>
                        {post.image && <span>imagemmmmm</span>}
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
        </>
    )
}

export default Post;