from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = Flask(__name__)

model = None
tokenizer = None

def load_model():
    global model, tokenizer
    print(" Cargando modelo DeepSeek V3.1 (CPU)...")
    
    model_path = "C:/NEXORA/models/deepseek-v3.1-cpu"
    tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)
    model = AutoModelForCausalLM.from_pretrained(
        model_path, 
        device_map="cpu",
        trust_remote_code=True,
        torch_dtype=torch.float32
    )
    
    print(" Modelo cargado correctamente")

load_model()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "ok", 
        "model": "deepseek-v3.1-cpu",
        "device": "cpu"
    })

@app.route('/generate', methods=['POST'])
def generate_text():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        max_tokens = data.get('max_tokens', 100)
        
        if not prompt:
            return jsonify({"error": "Prompt es requerido"}), 400
        
        inputs = tokenizer(prompt, return_tensors="pt").to("cpu")
        outputs = model.generate(
            **inputs, 
            max_new_tokens=max_tokens,
            temperature=0.7,
            do_sample=True
        )
        
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        return jsonify({
            "success": True,
            "response": response,
            "model": "deepseek-v3.1-cpu"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print(" Servidor API iniciado en http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=False)
