$BaseDir = $PSScriptRoot
Set-Location $BaseDir

$ServerProcess = $null

function Start-TARS {
    if ($ServerProcess -and !$ServerProcess.HasExited) {
        Write-Host "⚠️ TARS ya está activo." -ForegroundColor Yellow
        return
    }
    Write-Host "🚀 Iniciando TARS..." -ForegroundColor Cyan
    $ServerProcess = Start-Process python -ArgumentList "servidor.py" -PassThru
    Start-Sleep -Seconds 5
    Start-Process "http://127.0.0.1:8000"
    Write-Host "✅ TARS listo en http://127.0.0.1:8000" -ForegroundColor Green
}

function Stop-TARS {
    if ($ServerProcess -and !$ServerProcess.HasExited) {
        Write-Host "🛑 Deteniendo TARS..." -ForegroundColor Red
        Stop-Process -Id $ServerProcess.Id -Force
        $ServerProcess = $null
        Write-Host "✅ TARS detenido." -ForegroundColor Green
    } else {
        Write-Host "⚠️ TARS no está activo." -ForegroundColor Yellow
    }
}

function Restart-TARS {
    Stop-TARS
    Start-TARS
}

while ($true) {
    Clear-Host
    Write-Host "=============================" -ForegroundColor Cyan
    Write-Host "   🤖 TARS ULTIMATE — MENÚ" -ForegroundColor Cyan
    Write-Host "=============================" -ForegroundColor Cyan
    Write-Host "1. Iniciar"
    Write-Host "2. Reiniciar"
    Write-Host "3. Apagar"
    Write-Host "4. Salir"
    Write-Host "=============================" -ForegroundColor Cyan
    $Option = Read-Host "Opción"

    switch ($Option) {
        "1" { Start-TARS }
        "2" { Restart-TARS }
        "3" { Stop-TARS }
        "4" { Write-Host "👋 Hasta luego." -ForegroundColor Green; break }
        default { Write-Host "❌ Opción inválida." -ForegroundColor Red }
    }

    if ($Option -ne "4") {
        Write-Host "`nPresiona Enter para continuar..."
        Read-Host
    }
}
