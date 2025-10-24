@echo off
setlocal enabledelayedexpansion

REM ===== Config =====
set PORT=50721
set BROWSER_MODE=dom

REM ===== Cargar OPENAI_API_KEY desde .env.local o .env si existen =====
if exist "%~dp0.env.local" (
  for /f "usebackq tokens=1,* delims== eol=;" %%A in ("%~dp0.env.local") do (
    if /I "%%A"=="OPENAI_API_KEY" set "OPENAI_API_KEY=%%B"
  )
)
if not defined OPENAI_API_KEY if exist "%~dp0.env" (
  for /f "usebackq tokens=1,* delims== eol=;" %%A in ("%~dp0.env") do (
    if /I "%%A"=="OPENAI_API_KEY" set "OPENAI_API_KEY=%%B"
  )
)

REM ===== Validaci?n de API =====
if not defined OPENAI_API_KEY (
  echo [ERROR] OPENAI_API_KEY no esta definido.
  echo Crea un archivo .env.local junto a este BAT con:
  echo OPENAI_API_KEY=sk-...tu-key...
  pause
  exit /b 1
)

REM ===== Cerrar Node previos =====
for /f "tokens=2 delims=," %%P in ('tasklist /fi "imagename eq node.exe" /fo csv ^| find /i "node.exe"') do taskkill /f /pid %%~P >nul 2>&1

REM ===== Asegurar agent-tars instalado =====
set "PATH=%AppData%\npm;%PATH%"
where agent-tars >nul 2>&1
if errorlevel 1 (
  echo Instalando agent-tars...
  call npm install -g agent-tars@latest || goto :fail
)

REM ===== Abrir navegador =====
start "" "http://localhost:%PORT%"

REM ===== Lanzar Agent TARS (OpenAI + DOM + puerto raro) =====
agent-tars --provider openai --model gpt-4o --browser dom --port %PORT%
goto :eof

:fail
echo [ERROR] Falta Node.js o npm/agent-tars. Instala Node LTS: https://nodejs.org/
pause
exit /b 1
