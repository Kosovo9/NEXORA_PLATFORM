#  GIT SETUP  Configura repositorio local y remoto en 1 clic
$RepoName = "tars-workspace"
$RemoteURL = "https://github.com/tu-usuario/$RepoName.git"  #  CAMBIA "tu-usuario" por tu nombre de GitHub

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host " Git no está instalado. Descárgalo desde https://git-scm.com" -ForegroundColor Red
    exit 1
}

if (Test-Path ".git") {
    Write-Host "ℹ  Repositorio ya existe." -ForegroundColor Yellow
} else {
    git init
    git add .
    git commit -m "Primer commit de TARS"
    git remote add origin $RemoteURL
    Write-Host " Repositorio inicializado y vinculado a $RemoteURL" -ForegroundColor Green
}

Write-Host "`n Para sincronizar en otro dispositivo:" -ForegroundColor Blue
Write-Host "1. Clona el repositorio: git clone $RemoteURL" -ForegroundColor White
Write-Host "2. Ejecuta: git pull / git push" -ForegroundColor White
