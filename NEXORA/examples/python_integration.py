import requests
import json

class DeepSeekClient:
    def __init__(self, base_url="http://localhost:5000"):
        self.base_url = base_url
    
    def generate_code(self, task_description):
        """Genera código basado en una descripción"""
        prompt = f"""
        Escribe código Python para: {task_description}
        
        Requisitos:
        1. Código bien documentado
        2. Manejo de errores
        3. Ejemplos de uso
        4. Optimizado para rendimiento
        """
        
        response = requests.post(
            f"{self.base_url}/generate",
            json={
                "prompt": prompt,
                "max_tokens": 500,
                "temperature": 0.3
            }
        )
        
        if response.status_code == 200:
            return response.json()["response"]
        else:
            return f"Error: {response.json().get('error', 'Unknown error')}"

if __name__ == "__main__":
    client = DeepSeekClient()
    code = client.generate_code("Función que calcula factorial con recursión")
    print(" Código generado:")
    print(code)
