// pages/global.tsx
export default function Global() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center p-8 bg-gray-800 rounded shadow">
        <h1 className="text-2xl font-bold text-red-600">🌍 Acceso Restringido</h1>
        <p className="mt-4">
          Este producto solo está disponible para emprendedores en <strong>México, Canadá y EE.UU.</strong>
        </p>
        <p className="mt-2 text-sm text-gray-500">
          ¿Crees que es un error? Contáctanos: support@nexora.io
        </p>
      </div>
    </div>
  );
}