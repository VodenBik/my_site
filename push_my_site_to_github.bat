@echo off
chcp 65001 >nul
setlocal

REM Run this file from the root of the prepared site folder.
REM The same folder must contain index.html and projects\

if not exist "index.html" (
  echo ERROR: index.html was not found in this folder.
  echo Put this .bat into the extracted my_site_ready_github_optimized folder and run it again.
  pause
  exit /b 1
)

if not exist "projects" (
  echo ERROR: projects folder was not found in this folder.
  echo Put this .bat into the extracted my_site_ready_github_optimized folder and run it again.
  pause
  exit /b 1
)

where git >nul 2>nul
if errorlevel 1 (
  echo ERROR: Git is not installed or is not available in PATH.
  echo Install Git for Windows first: https://git-scm.com/download/win
  pause
  exit /b 1
)

echo Initializing Git repo...
git init
if errorlevel 1 goto fail

git branch -M main

git remote remove origin >nul 2>nul
git remote add origin https://github.com/VodenBik/my_site.git
if errorlevel 1 goto fail

echo Adding files...
git add -A
if errorlevel 1 goto fail

echo Creating commit...
git commit -m "Update portfolio images and optimize assets"
if errorlevel 1 (
  echo Commit may already be up to date. Continuing to push...
)

echo Pushing to GitHub main branch...
git push -u origin main --force
if errorlevel 1 goto fail

echo.
echo DONE: site files were pushed to https://github.com/VodenBik/my_site
pause
exit /b 0

:fail
echo.
echo ERROR: Something failed. Copy the error text from this window and send it to ChatGPT.
pause
exit /b 1
