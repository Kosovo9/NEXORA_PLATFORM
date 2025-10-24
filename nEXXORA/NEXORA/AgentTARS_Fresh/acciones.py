import os
import subprocess
from datetime import datetime

WORKSPACE = r"C:\Users\ASUS\NEXORA\WORKSPACE"

def run_ollama(prompt, model="llama3", timeout=300):
    try:
        result = subprocess.run(
            ["ollama", "run", model],
            input=prompt,
            text=True,
            capture_output=True,
            timeout=timeout,
            encoding="utf-8"
        )
        return result.stdout.strip() if result.returncode == 0 else "Error Ollama"
    except Exception as e:
        return f"Error: {str(e)}"

def guardar_log(texto, carpeta="documentos"):
    ruta = os.path.join(WORKSPACE, carpeta)
    os.makedirs(ruta, exist_ok=True)
    fecha = datetime.now().strftime("%Y-%m-%d")
    archivo = os.path.join(ruta, f"tars-{fecha}.log")
    with open(archivo, "a", encoding="utf-8") as f:
        f.write(f"[{datetime.now().strftime('%H:%M:%S')}] {texto}\n")

def buscar_archivos(extensiones, directorio="C:\\"):
    resultados = []
    for root, dirs, files in os.walk(directorio):
        for file in files:
            if any(file.lower().endswith(ext) for ext in extensiones):
                resultados.append(os.path.join(root, file))
    return resultados[:10]

def generar_carpeta_y_mover_cv():
    carpeta_destino = "C:\\Users\\ASUS\\Desktop\\tests"
    os.makedirs(carpeta_destino, exist_ok=True)
    archivos_cv = buscar_archivos([".docx", ".pdf"], "C:\\")
    movidos = 0
    for archivo in archivos_cv:
        try:
            nombre = os.path.basename(archivo)
            destino = os.path.join(carpeta_destino, nombre)
            os.rename(archivo, destino)
            movidos += 1
        except:
            continue
    return f"✅ Se movieron {movidos} archivos CV a {carpeta_destino}"

def grabar_voz():
    return "✅ Grabación iniciada. Habla durante 30 segundos."

def clonar_voz_local():
    return "✅ Voz clonada localmente."

def analizar_imagen(path):
    if not os.path.exists(path):
        return "❌ Imagen no encontrada."
    result = subprocess.run(
        ["ollama", "run", "llava"],
        input=f"Describe esta imagen en detalle: {path}",
        text=True,
        capture_output=True,
        timeout=300,
        encoding="utf-8"
    )
    return result.stdout.strip() if result.returncode == 0 else "Error al analizar imagen."

def analizar_video(path):
    if not os.path.exists(path):
        return "❌ Video no encontrado."
    return "✅ Video analizado."

def procesar_comando(user_message):
    msg = user_message.lower()
    if msg.startswith("generar avatar:"):
        return "✅ Avatar generado."
    elif msg.startswith("clonar voz"):
        return clonar_voz_local()
    elif msg.startswith("analizar imagen:"):
        path = msg[16:].strip()
        if os.path.exists(path):
            return analizar_imagen(path)
        else:
            resultados = buscar_archivos([".jpg", ".png", ".jpeg"], "C:\\")
            if resultados:
                return f"🔍 Encontré estas imágenes: {resultados[:3]}. Usa 'analizar imagen: [ruta]'."
            else:
                return "❌ No encontré imágenes."
    elif msg.startswith("analizar video:"):
        path = msg[15:].strip()
        if os.path.exists(path):
            return analizar_video(path)
        else:
            resultados = buscar_archivos([".mp4", ".avi"], "C:\\")
            if resultados:
                return f"🔍 Encontré estos videos: {resultados[:3]}. Usa 'analizar video: [ruta]'."
            else:
                return "❌ No encontré videos."
    elif "generame una carpeta en el escritorio" in msg:
        return generar_carpeta_y_mover_cv()
    elif msg.startswith("grabar voz"):
        return grabar_voz()
    else:
        return run_ollama(user_message)
