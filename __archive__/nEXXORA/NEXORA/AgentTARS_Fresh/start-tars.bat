@echo off
set PYTHONPATH=%PYTHONPATH%;%CD%
cd /d "%~dp0"
call C:\Python312\python.exe -m open_interpreter.server --host 127.0.0.1 --port 50721
pause
