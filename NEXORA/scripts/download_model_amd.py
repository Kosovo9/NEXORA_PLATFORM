import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import os

print(" Configurando para AMD GPU...")
print(f"GPU disponible: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"Dispositivo: {torch.cuda.get_device_name(0)}")
    print(f"VRAM: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB")

print(" Descargando DeepSeek V3.1 para AMD...")
model_path = "C:/NEXORA/models/deepseek-v3.1-amd"
os.makedirs(model_path, exist_ok=True)

try:
    # Configuración para AMD
    tokenizer = AutoTokenizer.from_pretrained(
        "deepseek-ai/deepseek-v3.1", 
        trust_remote_code=True
    )
    
    model = AutoModelForCausalLM.from_pretrained(
        "deepseek-ai/deepseek-v3.1",
        device_map="auto",
        trust_remote_code=True,
        torch_dtype=torch.float16,
        low_cpu_mem_usage=True
    )
    
    print(" Guardando modelo...")
    model.save_pretrained(model_path)
    tokenizer.save_pretrained(model_path)
    print(f" Modelo guardado en: {model_path}")
    
except Exception as e:
    print(f" Error: {str(e)}")
    print(" Intentando con configuración CPU como fallback...")
    
    # Fallback a CPU si AMD no funciona
    model = AutoModelForCausalLM.from_pretrained(
        "deepseek-ai/deepseek-v3.1",
        device_map="cpu",
        trust_remote_code=True,
        torch_dtype=torch.float32
    )
    model.save_pretrained(model_path + "-cpu")
    tokenizer.save_pretrained(model_path + "-cpu")
    print(" Modelo guardado en modo CPU")
