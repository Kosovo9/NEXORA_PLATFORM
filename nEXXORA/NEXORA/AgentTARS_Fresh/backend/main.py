from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from datetime import datetime

# Configuración inicial
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'tars.db')

app = FastAPI(title='TARS API', version='4.0.0')

# Modelo Pydantic
class Command(BaseModel):
    message: str

# Endpoint principal para procesar comandos
@app.post('/interpret', response_model=dict)
async def interpret(command: Command):
    user_message = command.message.strip()
    if not user_message:
        raise HTTPException(status_code=400, detail='El mensaje no puede estar vacío.')

    # Respuesta humanizada (puedes reemplazar esto con un modelo de IA real)
    response_text = f"¡Hola! Recibí tu comando: '{user_message}'\n\n✅ Lo estoy procesando ahora mismo.\n💡 ¿Necesitas algo más?"

    return {"message": response_text}

# Endpoint para obtener historial (opcional)
@app.get('/history', response_model=list)
async def get_history():
    return [{"id": 1, "timestamp": "2025-09-30 00:00:00", "action": "interpret", "details": "Hola"}]

# Iniciar servidor
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)
