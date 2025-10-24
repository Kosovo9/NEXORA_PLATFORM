import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import time

print(" Probando DeepSeek V3.1 en AMD GPU...")
print(f"GPU disponible: {torch.cuda.is_available()}")

if torch.cuda.is_available():
    print(f"Dispositivo: {torch.cuda.get_device_name(0)}")
    print(f"VRAM disponible: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB")

model_path = "C:/NEXORA/models/deepseek-v3.1-amd"

try:
    tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)
    
    # Mover modelo a GPU si está disponible
    if torch.cuda.is_available():
        model = AutoModelForCausalLM.from_pretrained(
            model_path, 
            device_map="auto",
            trust_remote_code=True,
            torch_dtype=torch.float16
        ).to('cuda')
    else:
        model = AutoModelForCausalLM.from_pretrained(
            model_path,
            device_map="cpu",
            trust_remote_code=True,
            torch_dtype=torch.float32
        )
    
    # Test
    prompt = "Escribe una función Python para calcular el factorial:"
    inputs = tokenizer(prompt, return_tensors="pt")
    
    if torch.cuda.is_available():
        inputs = {k: v.to('cuda') for k, v in inputs.items()}
    
    start_time = time.time()
    outputs = model.generate(**inputs, max_new_tokens=200)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    print(f" Tiempo: {time.time() - start_time:.2f}s")
    print(" Respuesta:")
    print(response)
    
except Exception as e:
    print(f" Error: {str(e)}")
