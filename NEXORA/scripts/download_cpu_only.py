from transformers import AutoModelForCausalLM, AutoTokenizer
import os
import json

print(" Configurando DeepSeek V3.1 para CPU...")
model_path = "C:/NEXORA/models/deepseek-v3.1-cpu"
os.makedirs(model_path, exist_ok=True)

try:
    # Descargar modelo para CPU
    tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/deepseek-v3.1", trust_remote_code=True)
    model = AutoModelForCausalLM.from_pretrained(
        "deepseek-ai/deepseek-v3.1",
        device_map="cpu",
        trust_remote_code=True,
        torch_dtype=torch.float32
    )
    
    # Guardar
    model.save_pretrained(model_path)
    tokenizer.save_pretrained(model_path)
    
    # Asegurar config correcto
    config_file = os.path.join(model_path, "config.json")
    if os.path.exists(config_file):
        with open(config_file, "r") as f:
            config = json.load(f)
        if "model_type" not in config:
            config["model_type"] = "deepseek_v3"
            with open(config_file, "w") as f:
                json.dump(config, f, indent=2)
    
    print(" Modelo listo para CPU")
    
except Exception as e:
    print(f" Error: {str(e)}")
