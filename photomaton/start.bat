set PATH=%PATH%;"C:\Program Files (x86)\BEL\Realterm\";"C:\Program Files (x86)\Google\Chrome\Application\"
ping 127.0.0.1 -n 7 > NUL 
rem start "" "realterm.exe" -port=3 -baud=9600 -echo=server:9876 -caption=Teensy
rem ping 127.0.0.1 -n 5 > NUL 
start "" "chrome.exe" --kiosk https://127.0.0.1/PhotoTwix/photomaton/src/
