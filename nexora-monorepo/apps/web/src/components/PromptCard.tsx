import React from "react";
import { PromptData } from "../data/promptsData";

interface PromptCardProps {
  prompt: PromptData;
  onSelectPrompt: (promptId: string) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, onSelectPrompt }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{prompt.title}</h3>
        <p className="text-gray-600 mb-4">{prompt.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-600">
            ${prompt.price} MXN
            {prompt.videoUpsell && (
              <span className="text-sm text-gray-500 block">
                +${prompt.videoPrice} MXN video
              </span>
            )}
          </div>
          
          <button
            onClick={() => onSelectPrompt(prompt.id)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors duration-200"
          >
            Quiero este estilo
          </button>
        </div>
      </div>
    </div>
  );
};
