import psutil
import torch

def system_stats():
    print(" Estado del sistema:")
    
    # Memoria RAM
    mem = psutil.virtual_memory()
    print(f" RAM: {mem.percent}% usado ({mem.used//1024**3}GB/{mem.total//1024**3}GB)")
    
    # GPU AMD si está disponible
    if torch.cuda.is_available():
        print(f" GPU: {torch.cuda.get_device_name(0)}")
        print(f" VRAM: {torch.cuda.memory_allocated(0)/1024**3:.1f}GB usado")
    
    # CPU
    print(f" CPU: {psutil.cpu_percent()}% utilizado")
    
    print("-" * 40)

if __name__ == "__main__":
    system_stats()
