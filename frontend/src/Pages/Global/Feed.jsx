import React, { useContext, useEffect, useState } from 'react';
import UserAvatar from '../../Components/UserAvatar'; // Assuming UserAvatar.jsx is in the same components folder



import Header from '../../Components/Header';
import Post from '../../Components/Post';
import { AppContext } from '../../Contexts/AppContext';
import NewPost from '../../Components/NewPost';
import LoaderPages from '../../Components/LoaderPages/LoaderPages';
import { toast } from 'react-toastify';
import { NavigationContext } from '../../Contexts/NavigationContext';
import handleLogout from '../../Utils/handleLogout';
const Feed = () => {
  const { navigate } = useContext(NavigationContext);
  const { token, setToken, user } = useContext(AppContext);


  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    const url = token ? "/api/posts" : "/api/public-posts";
    const headers = {
      "Accept": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      setLoading(true);
      const res = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      const result = await res.json();
      if (!res.ok) {
        console.log(res)
        if (res.status == 401) {
          toast.info("Sessão expirada, recarregando a página...")
          handleLogout(setLoading, token, setToken, navigate)
        } else {

          let errorMsg = `API Error: ${res.statusText}`;
          if (result && result.errors) {
            errorMsg = Object.values(result.errors).flat().join(' ');
          }
          throw new Error(errorMsg);
        }
      }
      if (result.data) {
        setPosts(result.data);
      } else {
        console.warn("API response did not contain a 'data' property.", result);
      }
    } catch (error) {
      console.error("Fetch Data Error:", error);
      toast.error("Erro ao buscar posts");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);



  return (
    <>
      {loading && <LoaderPages />}
      <div className="bg-[#122117] min-h-screen flex flex-col font-sans text-[#e0f2e9]">
        <Header showAuthControls={true} />

        <main className="flex-grow flex justify-center p-4 md:p-6">
          <div className="w-full max-w-5xl">
            <h1 className="text-3xl md:text-4xl text-white text-start font-bold mb-6">Início</h1>

            {token && <NewPost token={token} onNewPost={fetchPosts} />}

            <div className="space-y-6">
              {posts.map(post => (
                <Post key={post.id} post={post} user={user} onPostDeleted={fetchPosts} onPostUpdated={fetchPosts} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Feed;
