import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import time

print(" Probando modelo corregido...")
model_path = "C:/NEXORA/models/deepseek-v3.1-fixed"

try:
    # Cargar modelo
    tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)
    model = AutoModelForCausalLM.from_pretrained(
        model_path,
        device_map="auto",
        trust_remote_code=True,
        torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32
    )
    
    # Test de generación
    prompt = "Escribe una función en Python para sumar dos números:"
    inputs = tokenizer(prompt, return_tensors="pt")
    
    # Mover a dispositivo adecuado
    if torch.cuda.is_available():
        inputs = {k: v.to('cuda') for k, v in inputs.items()}
    
    print(" Generando respuesta...")
    start_time = time.time()
    outputs = model.generate(**inputs, max_new_tokens=150)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    print(f" Tiempo: {time.time() - start_time:.2f}s")
    print(" Respuesta:")
    print(response)
    
except Exception as e:
    print(f" Error: {str(e)}")
    import traceback
    traceback.print_exc()
