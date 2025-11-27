Get-ChildItem -Directory -Recurse -Force |
    Where-Object {
        $_.FullName -notmatch "node_modules|\.venv|\.turbo|dist|\.next|__pycache__|env|build|\.git"
    } |
    Select-Object FullName
