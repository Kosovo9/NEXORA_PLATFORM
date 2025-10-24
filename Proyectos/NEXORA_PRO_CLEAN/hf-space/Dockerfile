FROM python:3.10-slim

# Paquetes del sistema para av/opencv/ffmpeg
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg libsm6 libxext6 libgl1 libglib2.0-0 \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto (incluye app.py y la carpeta voices/ si la agregas)
COPY . .

# Puerto por defecto en Spaces
ENV PORT=7860
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
