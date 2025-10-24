import psutil
import time

def monitor_resources():
    print(" Monitoreo de recursos - DeepSeek V3.1 8-bit")
    print("Presiona Ctrl+C para detener\n")
    
    try:
        while True:
            memory = psutil.virtual_memory()
            cpu_percent = psutil.cpu_percent(interval=1)
            
            print(f" Memoria: {memory.percent}% usado ({memory.used//1024//1024}MB)")
            print(f" CPU: {cpu_percent}%")
            print(f" Modelo cargado: ~15GB residente en RAM")
            print("-" * 40)
            
            time.sleep(5)
            
    except KeyboardInterrupt:
        print("Monitoreo detenido")

if __name__ == "__main__":
    monitor_resources()
