import { toast } from 'react-toastify';
import { loginSchema } from './Schemas/loginSchema';


const handleLogin = async (e, formData, setErrors, setLoading, setToken, setUser, navigate) => {
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
        setLoading(true);
        const res = await fetch('/api/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });
        
        if (res.status === 401) {
            toast.error("E-mail ou senha incorretos.");
            setLoading(false);
            return;
        }

        const result = await res.json();
        

        if (result.message != "success") {
            if (result.errors) {
                Object.values(result.errors).forEach(errorMessages => {
                    errorMessages.forEach(errorMessage => {
                        toast.error(errorMessage);
                    });
                });
            } else {
                toast.error("Erro ao logar.");
            }
        } else {
            setToken(result.data.token);
            setUser(result.data.user);

            toast.success(("Autenticado com sucesso!") + " Redirecionando a página...", {
                closeOnClick: true,
                autoClose: 1500,
            });

            setTimeout(() => navigate("/"), 1500);
        }
    } catch (error) {
        if(error.status_code == 401)
        toast.error("E-mail ou senha incorretos.");
    } finally {
        setLoading(false)
    }
};

export default handleLogin