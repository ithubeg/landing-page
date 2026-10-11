#Requires -Version 5.1
$ErrorActionPreference = 'Stop'

$adminHtml = "dist\admin\index.html"
if (-not (Test-Path $adminHtml)) {
    Write-Host "[X] $adminHtml not found" -ForegroundColor Red
    exit 1
}

$content = Get-Content $adminHtml -Raw

# استبدل ./ بـ / في الروابط الحرجة
$content = $content -replace 'href="\./admin\.css',       'href="/admin.css'
$content = $content -replace 'src="\./js/app\.js',         'src="/js/app.js'
$content = $content -replace 'href="\./favicon\.svg',      'href="/favicon.svg'
$content = $content -replace 'href="\./favicon\.ico',      'href="/favicon.ico'

Set-Content -Path $adminHtml -Value $content -Encoding UTF8 -NoNewline
Write-Host "[OK] Patched $adminHtml" -ForegroundColor Green