import { toast } from "react-toastify";
import { registerSchema } from "./Schemas/registroSchema";
import handleLogin from "./handleLogin";

const handleRegister = async (e, setLoading,formData,setErrors,setToken,setUser,navigate) => {
    e.preventDefault();

    try {
        setLoading(true)
        const validatedData = registerSchema.safeParse(formData);
        if (!validatedData.success) {
            const formattedErrors = validatedData.error.flatten().fieldErrors;
            setErrors(formattedErrors);
            return;
        }

        setErrors({});

        const { name, ...rest } = validatedData.data;
        const dataToSend = {
            name: name,
            ...rest
        };

        const response = await fetch('/api/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });

        const result = await response.json();

        if (result.message != "success") {
            if (result.errors) {
                setErrors(e => ({ ...e, ...result.errors }));
                Object.values(result.errors).forEach(errorArray => {
                    errorArray.forEach((errorMessage) => {
                        return toast.error(errorMessage);
                    });
                });
            } else {
                toast.error(result.message || "Ocorreu um erro desconhecido.");
            }
        } else {
            toast.success(("Registrado com sucesso!"), {
                autoClose: 1500,
                closeOnClick: false,
                onClose: () => {
                    handleLogin(
                        e, { email: formData.email, password: formData.password },
                        setErrors, setLoading, setToken, setUser, navigate
                    )
                }
            });
        }
    } catch (error) {
        toast.error(error.toString());
    } finally {
        setLoading(false)
    }
};

export default handleRegister