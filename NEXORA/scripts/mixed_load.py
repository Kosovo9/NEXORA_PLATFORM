import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

def load_model():
    model_path = "C:/NEXORA/models/deepseek-v3.1-amd"
    
    try:
        # Intentar cargar en GPU
        if torch.cuda.is_available():
            print(" Cargando en GPU AMD...")
            model = AutoModelForCausalLM.from_pretrained(
                model_path,
                device_map="auto",
                trust_remote_code=True,
                torch_dtype=torch.float16
            ).to('cuda')
        else:
            # Fallback a CPU
            print(" Cargando en CPU...")
            model = AutoModelForCausalLM.from_pretrained(
                model_path,
                device_map="cpu",
                trust__remote_code=True,
                torch_dtype=torch.float32
            )
        
        return model
        
    except Exception as e:
        print(f"Error cargando modelo: {str(e)}")
        return None
