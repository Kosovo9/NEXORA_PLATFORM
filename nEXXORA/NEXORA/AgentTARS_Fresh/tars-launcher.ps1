$BaseDir = (Get-Location).Path
Set-Location $BaseDir
function Start-TARS {
    Get-Process python -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*open_interpreter*" } | Stop-Process -Force
    Start-Sleep 2
    Start-Process -WindowStyle Hidden -FilePath "python" -ArgumentList "-m open_interpreter.server --host 127.0.0.1 --port 8000" -RedirectStandardOutput "tars.log" -RedirectStandardError "tars-error.log"
    Write-Host "✅ TARS iniciado en http://127.0.0.1:8000" -ForegroundColor Green
    Start-Process "http://127.0.0.1:8000"
}
function Stop-TARS {
    Get-Process python -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*open_interpreter*" } | Stop-Process -Force
    Write-Host "🛑 TARS detenido." -ForegroundColor Red
}
function Menu {
    Clear-Host
    Write-Host "🌌 TARS ULTIMATE" -ForegroundColor Cyan
    Write-Host "1. Iniciar" -ForegroundColor White
    Write-Host "2. Reiniciar" -ForegroundColor White
    Write-Host "3. Apagar" -ForegroundColor White
    Write-Host "4. Ver logs" -ForegroundColor White
    Write-Host "5. Salir" -ForegroundColor White
    switch (Read-Host "Opción") {
        "1" { Start-TARS }
        "2" { Stop-TARS; Start-Sleep 2; Start-TARS }
        "3" { Stop-TARS }
        "4" { Get-Content "tars.log" -Tail 20 -ErrorAction SilentlyContinue; Read-Host "Enter para continuar" }
        "5" { exit }
        default { Write-Host "❌ Opción inválida" -ForegroundColor Red }
    }
    Read-Host "Presiona Enter"
    Menu
}
Menu
