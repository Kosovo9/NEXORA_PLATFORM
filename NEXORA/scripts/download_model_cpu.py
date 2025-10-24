from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import os

print(" Iniciando descarga de DeepSeek V3.1 para CPU...")
model_path = "C:/NEXORA/models/deepseek-v3.1-cpu"
os.makedirs(model_path, exist_ok=True)

try:
    print(" Descargando... Esto puede tomar 30-60 minutos...")
    tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/deepseek-v3.1", trust_remote_code=True)
    model = AutoModelForCausalLM.from_pretrained(
        "deepseek-ai/deepseek-v3.1",
        device_map="auto",
        trust_remote_code=True,
        low_cpu_mem_usage=True,
        torch_dtype=torch.float32
    )
    
    model.save_pretrained(model_path)
    tokenizer.save_pretrained(model_path)
    print(f" Modelo guardado en: {model_path}")
    
except Exception as e:
    print(f" Error: {str(e)}")
