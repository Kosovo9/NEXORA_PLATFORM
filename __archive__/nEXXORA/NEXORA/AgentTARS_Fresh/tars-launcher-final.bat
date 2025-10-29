@echo off
:: ?? TARS LAUNCHER FINAL - Python 3.11 + Entorno virtual + UI
:: Ruta base
set BASE_DIR=%~dp0
cd /d "%BASE_DIR%"

:: Verifica si Python 3.11 est  instalado
where python3.11 >nul 2>&1
if %errorlevel% neq 0 (
    echo ? Python 3.11 no encontrado.
    echo Instala con: winget install Python.Python.3.11
    pause
    exit /b 1
)

:: Crea entorno virtual si no existe
if not exist ".venv" (
    echo ?? Creando entorno virtual con Python 3.11...
    python3.11 -m venv .venv
)

:: Activa entorno e instala dependencias m¡nimas
call .venv\Scripts\Activate.bat
python -m pip install --upgrade pip >nul
pip install flask requests >nul

:: Inicia el servidor en segundo plano
start /min python servidor.py

:: Espera 3 segundos y abre la UI
timeout /t 3 /nobreak >nul
start http://127.0.0.1:8000

echo ? TARS iniciado en http://127.0.0.1:8000
echo ?? Cierra esta ventana para detener el servidor.
pause
