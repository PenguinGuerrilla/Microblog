import React, { useContext, useEffect, useState } from 'react';
import UserAvatar from '../../Components/UserAvatar'; // Assuming UserAvatar.jsx is in the same components folder



import Header from '../../Components/Header';
import Post from '../../Components/Post';
import { AppContext } from '../../Contexts/AppContext';

const Feed = () => {
  const { token } = useContext(AppContext)
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {

        const res = await fetch('/api/posts', {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        })
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
          console.log("posts")
          console.log(posts)
        } else {
          console.warn("API response did not contain a 'data' property.", result);
        }
      } catch (error) {
        console.error("Fetch Data Error:", error);
        alert(error.toString());
      }

    }
    fetchPosts()
  },[token])



  return (
    <div className="bg-[#122a21] min-h-screen flex flex-col font-sans text-[#e0f2e9]">
      <Header showAuthControls={true} />

      {/* Main Content Area */}
      <main className="flex-grow flex justify-center p-4 md:p-6">
        <div className="w-full max-w-xl"> {/* Container for posts */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Início</h1>

          {/* New Post / What's happening section */}
          <div className="bg-[#1a382e] p-5 rounded-xl shadow-lg mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <UserAvatar src="https://placehold.co/150/6ee7b7/122a21?text=ME" alt="Your Avatar" size="md" />
              <textarea
                className="flex-grow bg-[#1a382e] border-none focus:ring-0 resize-none placeholder-gray-400 text-[#e0f2e9]"
                placeholder="O que está acontecendo?"
                rows="2"
              ></textarea>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[#2a4a3e]">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>Postagem pública</span>
                {/* Simple toggle switch simulation */}
                <div className="w-10 h-5 flex items-center bg-[#2a4a3e] rounded-full p-1 cursor-pointer">
                  <div className="bg-[#6ee7b7] w-4 h-4 rounded-full shadow-md transform translate-x-full transition-transform duration-200"></div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">0/280</span>
                <button className="px-5 py-2 bg-[#6ee7b7] text-[#122a21] font-bold rounded-full hover:bg-[#5ce1a7] transition-colors duration-300">
                  Postar
                </button>
              </div>
            </div>
          </div>

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
