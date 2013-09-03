set PATH=%PATH%;"C:\Users\Phototwix3\AppData\Local\Google\Chrome\Application\"
rem Vide le cache de google Chrome

set ChromeDir=C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data

rem del /q /s /f "%ChromeDir%"
rem rd /s /q "%ChromeDir%"

ping 127.0.0.1 -n 7 > NUL 
rem start "" "realterm.exe" -port=3 -baud=9600 -echo=server:9876 -caption=Teensy
rem ping 127.0.0.1 -n 10 > NUL 

start "" "chrome.exe" --kiosk https://127.0.0.1/PhotoTwix/photomaton/src/
