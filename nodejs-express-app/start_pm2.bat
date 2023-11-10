:: start_pm2.bat
@echo off
call npm config get prefix > prefix.txt
set /p NODE_PATH=<prefix.txt
set PM2_HOME=%NODE_PATH%\node_modules\pm2
call %PM2_HOME%\pm2 start "C:\Users\Acer\Documents\GitHub\yunusibin.io\nodejs-express-app\server.js"
