import { CircleUserRound } from 'lucide-react';
import React, { useState, useContext } from 'react';
import { AppContext } from '../Contexts/AppContext';

const NewPost = () => {
    const { token, user } = useContext(AppContext);
    const [formData, setFormData] = useState({
        conteudo: '',
        publico: false
    });

    const handleChangeAttr = (attr, value) => {
        setFormData(prev => ({ ...prev, [attr]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Você precisa estar logado para postar.");
            return;
        }

        const dataToSubmit = {
            ...formData,
            user_id: user.id
        };

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(dataToSubmit)
            });

            const result = await res.json();

            if (!res.ok) {
                let errorMsg = `API Error: ${res.statusText}`;
                if (result && result.errors) {
                    errorMsg = Object.values(result.errors).flat().join(' ');
                }
                throw new Error(errorMsg);
            }
            setFormData({ conteudo: '', publico: false }); // Reset form
        } catch (error) {
            console.error("Submit Error:", error);
            alert(error.toString());
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-[#1a382e] p-5 rounded-xl shadow-lg mb-8">
                <div className="flex items-center space-x-4 mb-4">
                    <img
                    src={user.gravatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                />
                    <textarea
                        name="conteudo"
                        value={formData.conteudo}
                        onChange={(e) => handleChangeAttr('conteudo', e.target.value)}
                        className="flex-grow bg-[#1a382e] border-none focus:ring-0 resize-none placeholder-gray-400 text-[#e0f2e9]"
                        placeholder="O que está acontecendo?"
                        rows="2"
                        maxLength="280"
                    ></textarea>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#2a4a3e]">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>Postagem pública</span>
                        <div onClick={() => handleChangeAttr('publico', !formData.publico)} className="w-10 h-5 flex items-center bg-[#2a4a3e] rounded-full p-1 cursor-pointer">
                            <div className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${formData.publico ? 'bg-[#6ee7b7] translate-x-full' : 'bg-gray-400'}`}></div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">{formData.conteudo.length}/280</span>
                        <button type='submit' className="px-5 py-2 bg-[#6ee7b7] text-[#122a21] font-bold rounded-full hover:bg-[#5ce1a7] transition-colors duration-300">
                            Postar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default NewPost;
