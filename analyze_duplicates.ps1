# Duplicate Analysis Script
Write-Host "Analyzing duplicates by content..."

$files = Get-ChildItem -Path . -Recurse -File | Where-Object { 
    $_.FullName -notmatch '\\\.git\\' -and 
    $_.FullName -notmatch '\\node_modules\\' -and 
    $_.FullName -notmatch '\\\.next\\' -and 
    $_.FullName -notmatch '\\dist\\' -and 
    $_.FullName -notmatch '\\build\\' -and
    $_.FullName -notmatch '\\out\\' -and
    $_.FullName -notmatch '\\__archive__\\' -and
    $_.Length -lt 10MB
}

$duplicates = @()
$processed = 0
$total = $files.Count

Write-Host "Processing $total files..."

foreach ($file in $files) {
    $processed++
    if ($processed % 100 -eq 0) {
        Write-Host "Processed $processed/$total files..."
    }
    
    try {
        $hash = Get-FileHash -Path $file.FullName -Algorithm MD5
        $duplicates += [PSCustomObject]@{
            RelativePath = $file.FullName.Replace((Get-Location).Path + "\", "")
            Name = $file.Name
            Length = $file.Length
            Hash = $hash.Hash
            Directory = $file.Directory.Name
            Extension = $file.Extension
            LastWriteTime = $file.LastWriteTime
        }
    } catch {
        Write-Warning "Could not hash file: $($file.FullName)"
    }
}

Write-Host "Grouping duplicates..."
$duplicateGroups = $duplicates | Group-Object Hash | Where-Object { $_.Count -gt 1 }

Write-Host "Found $($duplicateGroups.Count) groups of duplicate files"

$duplicateGroups | ForEach-Object {
    $_.Group | Export-Csv -Path "out\duplicates_by_content.csv" -NoTypeInformation -Encoding UTF8 -Append
}

Write-Host "Duplicate analysis complete. Results saved to out\duplicates_by_content.csv"
