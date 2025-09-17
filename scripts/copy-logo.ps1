# Copy fhf_logo.png into the site/ folder so static hosting will include it
$source = Join-Path -Path $PSScriptRoot -ChildPath "..\fhf_logo.png"
$destDir = Join-Path -Path $PSScriptRoot -ChildPath "..\site"
$dest = Join-Path -Path $destDir -ChildPath "fhf_logo.png"

if (-Not (Test-Path $source)) {
    Write-Error "Source logo not found: $source"
    exit 1
}

if (-Not (Test-Path $destDir)) {
    Write-Error "Destination folder not found: $destDir"
    exit 1
}

Copy-Item -Path $source -Destination $dest -Force
Write-Output "Copied $source -> $dest"
