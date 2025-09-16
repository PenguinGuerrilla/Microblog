import React, { useContext, useEffect, useState } from 'react';
import UserAvatar from '../../Components/UserAvatar'; // Assuming UserAvatar.jsx is in the same components folder



import Header from '../../Components/Header';
import Post from '../../Components/Post';
import { AppContext } from '../../Contexts/AppContext';
import NewPost from '../../Components/NewPost';

const Feed = () => {
  const { token } = useContext(AppContext)
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const url = token ? "/api/posts" : "/api/public-posts";
    const headers = {
      "Accept": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      const result = await res.json();
      if (!res.ok) {
        let errorMsg = `API Error: ${res.statusText}`;
        if (result && result.errors) {
          errorMsg = Object.values(result.errors).flat().join(' ');
        }
        throw new Error(errorMsg);
      }
      if (result.data) {
        setPosts(result.data);
      } else {
        console.warn("API response did not contain a 'data' property.", result);
      }
    } catch (error) {
      console.error("Fetch Data Error:", error);
      alert(error.toString());
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);



  return (
    <div className="bg-[#122117] min-h-screen flex flex-col font-sans text-[#e0f2e9]">
      <Header showAuthControls={true} />

      {/* Main Content Area */}
      <main className="flex-grow flex justify-center p-4 md:p-6">
        <div className="w-full max-w-xl"> {/* Container for posts */}
          <h1 className="text-3xl md:text-4xl text-start font-bold mb-6">Início</h1>

          {token && <NewPost token={token} onNewPost={fetchPosts}/>}

          {/* Feed of posts */}
          <div className="space-y-6">
            {posts.map(post => (
              <Post post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feed;
