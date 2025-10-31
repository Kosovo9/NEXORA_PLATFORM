import React, { useState, useCallback } from "react";
import { fetchWithHMAC } from "../hooks/useHMACSignature";

interface UploadResponse {
  success: boolean;
  file?: {
    name: string;
    originalName: string;
    size: number;
    type: string;
    url: string;
  };
  uploadedAt?: string;
  error?: string;
}

export const SecureUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
    }
  }, []);

  const handleUpload = useCallback(async () => {
    if (!file) {
      setError("Por favor selecciona un archivo");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Crear FormData para el archivo
      const formData = new FormData();
      formData.append("file", file);

      // Realizar upload con firma HMAC
      const response = await fetchWithHMAC("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data: UploadResponse = await response.json();

      if (response.ok && data.success) {
        setResult(data);
        setFile(null);
        // Limpiar el input
        const fileInput = document.getElementById("file-input") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        setError(data.error || "Error en el upload");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Error de conexión durante el upload");
    } finally {
      setUploading(false);
    }
  }, [file]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Upload Seguro con HMAC
      </h2>
      
      <div className="mb-4">
        <label 
          htmlFor="file-input" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Seleccionar archivo
        </label>
        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          accept="image/*,.pdf,.txt"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {file && (
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">
            <strong>Archivo seleccionado:</strong> {file.name}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Tamaño:</strong> {formatFileSize(file.size)}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Tipo:</strong> {file.type}
          </p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full py-2 px-4 rounded font-medium ${
          !file || uploading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {uploading ? "Subiendo..." : "Subir Archivo"}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {result && result.success && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <h3 className="text-green-800 font-medium mb-2">¡Upload exitoso!</h3>
          <div className="text-sm text-green-700">
            <p><strong>Archivo:</strong> {result.file?.originalName}</p>
            <p><strong>Tamaño:</strong> {result.file ? formatFileSize(result.file.size) : "N/A"}</p>
            <p><strong>URL:</strong> 
              <a 
                href={result.file?.url} 
                className="text-blue-600 hover:underline ml-1"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {result.file?.url}
              </a>
            </p>
            <p><strong>Subido:</strong> {result.uploadedAt ? new Date(result.uploadedAt).toLocaleString() : "N/A"}</p>
          </div>
        </div>
      )}

      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded">
        <h4 className="text-blue-800 font-medium mb-2">🔒 Seguridad HMAC</h4>
        <p className="text-sm text-blue-700">
          Este upload está protegido con verificación HMAC. Solo las peticiones 
          firmadas correctamente desde este frontend serán aceptadas por el servidor.
        </p>
      </div>
    </div>
  );
};

export default SecureUpload;
