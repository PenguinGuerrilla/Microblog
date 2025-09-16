import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { NavigationContext } from '../../Contexts/NavigationContext';
import { z } from 'zod';
import { toast } from 'react-toastify';

// Re-usable ChevronDownIcon for the header
const ChevronDownIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 ml-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

import Header from '../../Components/Header';

const loginSchema = z.object({
    email: z.string().email("Por favor, insira um e-mail válido."),
    password: z.string().min(1, "A senha não pode estar em branco."),
});

const LoginPage = () => {
    const { setToken, setUser } = useContext(AppContext);
    const { navigate } = useContext(NavigationContext);
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    const [errors, setErrors] = useState({});
    
    const handleLogin = async (e) => {
        e.preventDefault();

        const validation = loginSchema.safeParse(formData);

        if (!validation.success) {
            const formattedErrors = validation.error.flatten().fieldErrors;
            setErrors(formattedErrors);

            Object.values(formattedErrors).forEach(fieldErrors => {
                if (fieldErrors) {
                    fieldErrors.forEach(err => toast.error(err));
                }
            });

            return;
        }

        setErrors({});

        try {
            const res = await fetch('/api/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            console.log(result)

        if (result.message != "success") {
                if (result.errors) {
                    Object.values(result.errors).forEach(errorMessages => {
                        errorMessages.forEach(errorMessage => {
                            toast.error(errorMessage);
                        });
                    });
                } else {
                    toast.error(result.message || "Ocorreu um erro desconhecido.");
                }
            } else {
                console.log('API Response:', result);
                console.log('Token from API:', result.data.token);
                setToken(result.data.token);
                setUser(result.data.user);

                toast.success((result.message || "Autenticado com sucesso!") + " Redirecionando a página...", {
                    closeOnClick: true,
                    autoClose: 1500,
                });

                setTimeout(() => navigate("/"), 1500);
            }
        } catch (error) {
            toast.error(error.toString());
        }
    };

    const updateAttr = (e) => {
        const attr = e.target.name;
        setFormData(f => ({ ...f, [attr]: e.target.value }));
        if (errors[attr]) {
            setErrors(er => {
                const { [attr]: _, ...remainErrors } = er;
                return remainErrors;
            });
        }
    };

    return (
        <div className="bg-[#122117] min-h-screen flex flex-col font-sans text-white ">
            <Header showAuthControls={false} />

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center w-full">
                <div className="w-full max-w-sm px-4">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold">Log in</h1>
                    </div>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div>
                            <input
                                type="text"
                                name="email"
                                placeholder="Username or email"
                                value={formData.email}
                                onChange={updateAttr}
                                className={`w-full p-4 bg-[#1C3024] border rounded-lg placeholder-[#96C4A8] text-white focus:outline-none focus:ring-2 focus:ring-[#38E07A] transition-colors ${errors.email ? 'border-red-500' : 'border-[#366347]'}`}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={updateAttr}
                                className={`w-full p-4 bg-[#1C3024] border rounded-lg placeholder-[#96C4A8] text-white focus:outline-none focus:ring-2 focus:ring-[#38E07A] transition-colors ${errors.password ? 'border-red-500' : 'border-[#366347]'}`}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-3 bg-[#38E07A] text-[#122117] font-bold rounded-full hover:bg-opacity-90 transition-all duration-300"
                        >
                            Log in
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-sm text-[#96C4A8]">
                            Não possui uma conta?{' '}
                            <button
                                type="button"
                                onClick={() => navigate("/registro")}
                                className="font-bold text-white hover:underline focus:outline-none"
                            >
                                Cadastre-se
                            </button>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;