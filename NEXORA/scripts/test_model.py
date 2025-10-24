from transformers import AutoModelForCausalLM, AutoTokenizer
import time

def test_model():
    print(" Probando DeepSeek V3.1 (CPU)...")
    model_path = "C:/NEXORA/models/deepseek-v3.1-cpu"
    
    try:
        tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)
        model = AutoModelForCausalLM.from_pretrained(model_path, device_map="auto", trust_remote_code=True)
        
        test_prompt = "Escribe una función en Python que convierta Celsius a Fahrenheit:"
        inputs = tokenizer(test_prompt, return_tensors="pt")
        
        start_time = time.time()
        outputs = model.generate(**inputs, max_new_tokens=150)
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        print(f" Tiempo: {time.time() - start_time:.2f}s")
        print(" Respuesta:")
        print(response)
        
    except Exception as e:
        print(f" Error: {str(e)}")

if __name__ == "__main__":
    test_model()
