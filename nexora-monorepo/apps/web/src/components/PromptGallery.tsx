import React, { useState } from "react";
import { PromptCard } from "./PromptCard";
import { 
  allPrompts, 
  promptCategories, 
  getPromptsByCategory,
  PromptData,
  PromptCategory 
} from "../data/promptsData";

interface PromptGalleryProps {
  onSelectPrompt: (promptId: string) => void;
}

export const PromptGallery: React.FC<PromptGalleryProps> = ({ onSelectPrompt }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const filteredPrompts = selectedCategory === "all" 
    ? allPrompts 
    : getPromptsByCategory(selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Estilos de Retrato Disponibles
        </h2>
        <p className="text-xl text-gray-600">
          Elige el estilo perfecto para tu transformación
        </p>
      </div>

      {/* Filtros de categoría */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
            selectedCategory === "all"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Todos los Estilos
        </button>
        
        {promptCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              selectedCategory === category.id
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Grid de prompts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPrompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            onSelectPrompt={onSelectPrompt}
          />
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No hay prompts disponibles en esta categoría.
          </p>
        </div>
      )}
    </div>
  );
};
