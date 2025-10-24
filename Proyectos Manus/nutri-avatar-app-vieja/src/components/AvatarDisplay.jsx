import React from 'react';

const AvatarDisplay = ({ avatarState }) => {
  // Esta es la lógica de estilos que se había roto. Ahora está reparada.
  const stateClasses = {
    idle: 'border-gray-700',
    listening: 'border-blue-500 animate-pulse',
    speaking: 'border-cyan-400 animate-pulse-slow',
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 bg-gray-800 shadow-2xl transition-all duration-500 ${stateClasses[avatarState]}`}>
        {/* Usamos el favicon como un placeholder seguro y le añadimos padding */}
        <img src="/favicon.svg" alt="Asistente NutriAvatar" className="w-full h-full object-contain p-8" />
      </div>
    </div>
  );
};

export default AvatarDisplay;
