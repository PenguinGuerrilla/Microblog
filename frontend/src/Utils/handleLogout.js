import { toast } from "react-toastify";

async function handleLogout(setLoading,token,setToken,navigate) {
    try {
      setLoading(true)
      await fetch('/api/logout', {
        method: 'post',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'Application-json'
        }
      });

      toast.success('Sessão encerrada.');
      setToken(null);
      navigate('/login');
    } catch (error) {
      toast.error(error.toString());
    } finally{
      setLoading(false)
    }
  }
export default handleLogout