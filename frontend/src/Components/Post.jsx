import { CircleUserRound } from 'lucide-react';
import React from 'react'

const Post = ({post}) => {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div key={post.id} className="bg-[#1a382e] p-5 rounded-xl shadow-lg">
            <div className="flex items-start space-x-4">
                <img
                    src={post.user.gravatar ?? '/defaultPfp.svg'}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-lg">{post.user.name}</span>
                        <span className="text-sm text-gray-400">{formatDate(post.created_at)}</span>
                    </div>
                    <p className="text-[#e0f2e9] text-start">{post.conteudo}</p>
                </div>
            </div>
        </div>
    )
}

export default Post
