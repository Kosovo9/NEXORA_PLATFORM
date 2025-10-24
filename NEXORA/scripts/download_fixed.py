import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import os
import json

print(" Descargando DeepSeek V3.1 (solución definitiva)...")
model_path = "C:/NEXORA/models/deepseek-v3.1-fixed"
os.makedirs(model_path, exist_ok=True)

try:
    # Descargar modelo base
    print(" Descargando modelo...")
    tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/deepseek-v3.1", trust_remote_code=True)
    
    # Forzar descarga completa sin cuantización
    model = AutoModelForCausalLM.from_pretrained(
        "deepseek-ai/deepseek-v3.1",
        device_map="auto" if torch.cuda.is_available() else "cpu",
        trust_remote_code=True,
        torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32
    )
    
    # Guardar modelo
    model.save_pretrained(model_path)
    tokenizer.save_pretrained(model_path)
    
    # Corregir config.json
    config_file = os.path.join(model_path, "config.json")
    if os.path.exists(config_file):
        with open(config_file, "r") as f:
            config = json.load(f)
        
        # Agregar model_type faltante
        if "model_type" not in config:
            config["model_type"] = "deepseek_v3"
        
        # Guardar config corregido
        with open(config_file, "w") as f:
            json.dump(config, f, indent=2)
        
        print(" Config.json corregido")
    
    print(" Modelo descargado y corregido")
    
except Exception as e:
    print(f" Error: {str(e)}")
    import traceback
    traceback.print_exc()
