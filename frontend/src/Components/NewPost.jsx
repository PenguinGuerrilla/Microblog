import { ImagePlus, X } from 'lucide-react';
import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../Contexts/AppContext';
import LoaderPages from './LoaderPages/LoaderPages';

const NewPost = ({ onNewPost }) => {
    const { token, user } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        conteudo: '',
        publico: false,
        imagem: null
    });
    const [preview, setPreview] = useState(null);
    const imageInputRef = useRef(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, imagem: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, imagem: null }));
        setPreview(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = '';
        }
    };

    const handleChangeAttr = (attr, value) => {
        setFormData(prev => ({ ...prev, [attr]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Você precisa estar logado para postar.");
            return;
        }

        const dataToSubmit = new FormData();
        dataToSubmit.append('conteudo', formData.conteudo);
        dataToSubmit.append('publico', formData.publico ? '1' : '0');
        dataToSubmit.append('user_id', user.id);
        if (formData.imagem) {
            dataToSubmit.append('imagem', formData.imagem);
        }

        try {
            setLoading(true);
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: dataToSubmit
            });

            const result = await res.json();

            if (!res.ok) {
                let errorMsg = `API Error: ${res.statusText}`;
                if (result && result.errors) {
                    errorMsg = Object.values(result.errors).flat().join(' ');
                }
                throw new Error(errorMsg);
            }
            setFormData({ conteudo: '', publico: false, imagem: null });
            setPreview(null);
            if (imageInputRef.current) {
                imageInputRef.current.value = '';
            }
            if (onNewPost) {
                onNewPost();
            }
        } catch (error) {
            console.error("Submit Error:", error);
            alert(error.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        {loading && <LoaderPages/>}
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

                {preview && (
                    <div className="relative mb-4">
                        <img src={preview} alt="Preview" className="rounded-lg max-h-60 w-full object-cover" />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-75"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-[#2a4a3e]">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span>Postagem pública</span>
                            <div onClick={() => handleChangeAttr('publico', !formData.publico)} className="w-10 h-5 flex items-center bg-[#2a4a3e] rounded-full p-1 cursor-pointer">
                                <div className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${formData.publico ? 'bg-[#6ee7b7] translate-x-full' : 'bg-gray-400'}`}></div>
                            </div>
                        </div>
                        <label htmlFor="image-upload" className="cursor-pointer p-2 rounded-full hover:bg-[#2a4a3e] transition-colors">
                            <ImagePlus className="w-5 h-5 text-[#6ee7b7]" />
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={imageInputRef}
                            onChange={handleImageChange}
                        />
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
        </>
    );
};

export default NewPost;