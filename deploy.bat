@echo off
echo ===================================================
echo   PORTFOLIO AUTO-DEPLOYMENT SCRIPT
echo ===================================================
echo.
echo Adding all changes...
git add .

echo.
echo Committing changes...
git commit -m "Auto-update portfolio via deploy script"

echo.
echo Pushing to GitHub...
git push

echo.
echo ===================================================
echo   DONE! Your changes are now on GitHub.
echo   If GitHub Pages is enabled, your live site 
echo   will update in a few minutes.
echo ===================================================
pause
