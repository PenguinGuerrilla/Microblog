import { AppContext } from "../../../Contexts/AppContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { registerSchema } from "../../../Utils/Schemas/registroSchema";
import { NavigationContext } from "../../../Contexts/NavigationContext";



import Header from "../../../Components/Header";
import LoaderPages from "../../../Components/LoaderPages/LoaderPages";
import handleLogin from "../../../Utils/handleLogin";
import handleRegister from "../../../Utils/handleRegister";

export default function Registro() {
    const { navigate } = useContext(NavigationContext);
    const { setToken, setUser } = useContext(AppContext);
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});



    const updateAttr = (e) => {
        const attr = e.target.name;
        const finalValue = e.target.value;

        setFormData(f => ({ ...f, [attr]: finalValue }));

        if (errors[attr]) {
            setErrors(er => {
                const { [attr]: _, ...remainErrors } = er;
                return remainErrors;
            });
        }
    };

    return (
        <>
            {loading && <LoaderPages />}
            <div className="bg-[#122117] min-h-screen flex flex-col font-sans text-white">
                <Header showAuthControls={false} />

                <main className="flex-grow flex items-center justify-center w-full">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold">Crie sua conta</h1>
                        </div>

                        <form onSubmit={e => handleRegister(e,setLoading,formData,setErrors,setToken,setUser,navigate)} className="space-y-5">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={updateAttr}
                                    placeholder="Nome completo"
                                    required
                                    className={`w-full p-4 bg-[#1C3024] border rounded-lg placeholder-[#96C4A8] focus:outline-none focus:ring-2 focus:ring-[#38E07A] transition-colors ${errors.name ? 'border-red-500' : 'border-[#366347]'}`}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={updateAttr}
                                    placeholder="Email"
                                    autoComplete="email"
                                    required
                                    className={`w-full p-4 bg-[#1C3024] border rounded-lg placeholder-[#96C4A8] focus:outline-none focus:ring-2 focus:ring-[#38E07A] transition-colors ${errors.email ? 'border-red-500' : 'border-[#366347]'}`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={updateAttr}
                                    placeholder="Senha"
                                    autoComplete="new-password"
                                    required
                                    className={`w-full p-4 bg-[#1C3024] border rounded-lg placeholder-[#96C4A8] focus:outline-none focus:ring-2 focus:ring-[#38E07A] transition-colors ${errors.password ? 'border-red-500' : 'border-[#366347]'}`}
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={updateAttr}
                                    placeholder="Confirmação de senha"
                                    autoComplete="new-password"
                                    required
                                    className={`w-full p-4 bg-[#1C3024] border rounded-lg placeholder-[#96C4A8] focus:outline-none focus:ring-2 focus:ring-[#38E07A] transition-colors ${errors.password_confirmation ? 'border-red-500' : 'border-[#366347]'}`}
                                />
                                {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation[0]}</p>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full p-3 bg-[#38E07A] text-[#122117] font-bold rounded-full hover:bg-opacity-90 transition-all duration-300"
                                >
                                    Cadastrar
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-[#96C4A8]">
                                    Já tem uma conta?{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/login")}
                                        className="font-bold text-white hover:underline focus:outline-none"
                                    >
                                        Faça login
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>

    );
}