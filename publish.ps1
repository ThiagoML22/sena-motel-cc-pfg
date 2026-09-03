# Script de publicación a GitHub
$env:PATH += ";C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd;C:\Program Files\GitHub CLI"

Write-Host "Creando repositorio sena-motel-cc-pfg en GitHub y haciendo push..." -ForegroundColor Cyan
& "C:\Program Files\GitHub CLI\gh.exe" repo create sena-motel-cc-pfg --public --source=. --remote=origin --push

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n¡Éxito! Repositorio publicado." -ForegroundColor Green
    & "C:\Program Files\GitHub CLI\gh.exe" repo view --web
} else {
    Write-Host "`nSi solicita autenticación, ingrese la clave o vuelva a intentar luego de autorizar." -ForegroundColor Yellow
}
