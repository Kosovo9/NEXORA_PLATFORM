// Interfaces para los datos de prompts
export interface PromptData {
  id: string;
  title: string;
  category: string;
  tags: string[];
  language: string;
  description: string;
  prompt: string;
  price: number;
  videoUpsell?: boolean;
  videoPrice?: number;
}

export interface PromptCategory {
  id: string;
  name: string;
  description: string;
}

// Prompts Universales (U1-U10)
export const universalPrompts: PromptData[] = [
  {
    id: "U1",
    title: "Retrato Hiperrealista Universal / Hyperrealistic Portrait",
    category: "universal",
    tags: ["hiperrealista", "retrato", "profesional", "8k", "cinematic"],
    language: "bilingual",
    description: "Retrato hiperrealista con calidad cinematográfica, preservando características faciales naturales.",
    prompt: "Hyper-realistic cinematic portrait, 8K HDR quality, professional studio lighting, natural skin texture, detailed eyes with realistic reflections, soft shadows, perfect focus on facial features. Preserve the persons true facial structure, natural expression, and authentic personality from the reference photo. --ar 3:4 --v 6 --style raw --quality 2 --lighting cinematic --detail 10 --realism ultra --s 850 --hd --version 6.1 --upbeta --no cartoon --preserve-face-expression",
    price: 299,
    videoUpsell: false
  }
];
