from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import os

print(" Iniciando descarga de DeepSeek V3.1 (CPU compatible)...")

# Configuración para CPU
model_path = "C:/NEXORA/models/deepseek-v3.1-cpu"
os.makedirs(model_path, exist_ok=True)

try:
    print(" Descargando tokenizador...")
    tokenizer = AutoTokenizer.from_pretrained(
        "deepseek-ai/deepseek-v3.1",
        trust_remote_code=True
    )
    
    print(" Descargando modelo (versión CPU)...")
    model = AutoModelForCausalLM.from_pretrained(
        "deepseek-ai/deepseek-v3.1",
        device_map="cpu",
        trust_remote_code=True,
        low_cpu_mem_usage=True,
        torch_dtype=torch.float32
    )
    
    print(" Guardando modelo localmente...")
    model.save_pretrained(model_path)
    tokenizer.save_pretrained(model_path)
    
    print(f" Modelo guardado en: {model_path}")
    print(" Memoria aproximada utilizada: ~30GB")
    
except Exception as e:
    print(f" Error: {str(e)}")
    print(" Solución: Verifica conexión a internet y espacio en disco")
