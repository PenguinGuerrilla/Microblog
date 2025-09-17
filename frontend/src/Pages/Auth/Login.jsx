import { useContext, useState } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { NavigationContext } from '../../Contexts/NavigationContext';
import LoaderPages from '../../Components/LoaderPages/LoaderPages';
import Header from '../../Components/Header';
import handleLogin from '../../Utils/handleLogin';


const LoginPage = () => {
    const { setToken, setUser } = useContext(AppContext);
    const { navigate } = useContext(NavigationContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);



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
        <>
            {loading && <LoaderPages />}
            <div className="bg-[#122117] min-h-screen flex flex-col font-sans text-white ">
                <Header showAuthControls={false} />
                <main className="flex-grow flex items-center justify-center w-full">
                    <div className="w-full max-w-sm px-4">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold">Log in</h1>
                        </div>

                        <form className="space-y-5" onSubmit={e => handleLogin(
                            e, formData, setErrors, setLoading, setToken, setUser, navigate
                        )}>
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
        </>

    );
};

export default LoginPage;