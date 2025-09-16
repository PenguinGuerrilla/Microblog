import React from 'react';
import UserAvatar from '../../Components/UserAvatar'; // Assuming UserAvatar.jsx is in the same components folder



import Header from '../../Components/Header';

const Feed = () => {
  // Sample posts data
  const posts = [
    {
      id: 1,
      author: 'Carlos',
      time: '2h',
      content: 'Acabei de ler um artigo fascinante sobre a história da inteligência artificial. As implicações para o futuro são enormes!',
      avatar: 'https://placehold.co/150/b0e0e6/1a382e?text=C'
    },
    {
      id: 2,
      author: 'Isabela',
      time: '3h',
      content: 'Estou tão animada para o lançamento do novo álbum da minha banda favorita! A contagem regressiva começou.',
      avatar: 'https://placehold.co/150/ffb6c1/1a382e?text=I'
    },
    {
      id: 3,
      author: 'Lucas',
      time: '4h',
      content: 'Aproveitando um belo dia de sol no parque. A natureza sempre me recarrega as energias.',
      avatar: 'https://placehold.co/150/98fb98/1a382e?text=L'
    },
    {
      id: 4,
      author: 'Isabela',
      time: '6h',
      content: 'Começando o dia com uma xícara de café e um bom livro. Há algo tão reconfortante nessa rotina.',
      avatar: 'https://placehold.co/150/ffb6c1/1a382e?text=I'
    },
    {
      id: 5,
      author: 'Rafael',
      time: '6h',
      content: 'Acabei de assistir a um documentário incrível sobre a vida marinha. A diversidade de espécies é impressionante!',
      avatar: 'https://placehold.co/150/add8e6/1a382e?text=R'
    },
    {
      id: 6,
      author: 'Beatriz',
      time: '7h',
      content: 'Estou planejando minha próxima viagem e estou indecisa entre a praia e a montanha. Quais são suas preferências?',
      avatar: 'https://placehold.co/150/ffefd5/1a382e?text=B'
    },
    {
      id: 7,
      author: 'Gustavo',
      time: '8h',
      content: 'Aprender uma nova língua sempre foi um desafio para mim, mas estou determinado a dominar o espanhol este ano.',
      avatar: 'https://placehold.co/150/dda0dd/1a382e?text=G'
    },
    {
      id: 8,
      author: 'Fernanda',
      time: '9h',
      content: 'Estou tão feliz com o meu novo projeto de arte! Mal posso esperar para compartilhar o resultado final com vocês.',
      avatar: 'https://placehold.co/150/ffe4e1/1a382e?text=F'
    },
    {
      id: 9,
      author: 'Rodrigo',
      time: '10h',
      content: 'A tecnologia está evoluindo tão rapidamente que às vezes é difícil acompanhar todas as novidades. O que vocês acham das últimas inovações?',
      avatar: 'https://placehold.co/150/e6e6fa/1a382e?text=R'
    },
  ];

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
              <div key={post.id} className="bg-[#1a382e] p-5 rounded-xl shadow-lg">
                <div className="flex items-start space-x-4">
                  <UserAvatar src={post.avatar} alt={post.author} size="md" />
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-lg">{post.author}</span>
                      <span className="text-sm text-gray-400">{post.time}</span>
                    </div>
                    <p className="text-[#e0f2e9]">{post.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feed;
