import React from 'react';

const AdminPanel = () => {
  return (
    // Se ha añadido un fondo y padding para que se vea como una sección separada
    <div className="bg-gray-800 w-full h-full p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6 border-b-2 border-cyan-800 pb-2">
        Panel de Administrador
      </h1>
      <p className="text-gray-300">
        Aquí es donde tus clientes gestionarán sus productos, rutinas y personalizarán su avatar. ¡Próximamente!
      </p>
    </div>
  );
};

export default AdminPanel;
