from transformers import AutoModelForCausalLM, AutoTokenizer
import os
import json

print(" Descargando DeepSeek V3.1 para CPU...")
model_path = "C:/NEXORA/models/deepseek-v3.1-cpu"
os.makedirs(model_path, exist_ok=True)

try:
    # Descargar modelo
    print(" Descargando modelo...")
    tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/deepseek-v3.1")
    model = AutoModelForCausalLM.from_pretrained(
        "deepseek-ai/deepseek-v3.1",
        device_map="cpu",
        torch_dtype="auto"
    )
    
    # Guardar modelo
    model.save_pretrained(model_path)
    tokenizer.save_pretrained(model_path)
    
    # Asegurar que config.json tenga model_type
    config_file = os.path.join(model_path, "config.json")
    if os.path.exists(config_file):
        with open(config_file, "r") as f:
            config = json.load(f)
        
        if "model_type" not in config:
            config["model_type"] = "deepseek_v3"
            with open(config_file, "w") as f:
                json.dump(config, f, indent=2)
            print(" config.json corregido")
    
    print(" Modelo descargado y guardado correctamente")
    
except Exception as e:
    print(f" Error: {str(e)}")
    import traceback
    traceback.print_exc()
