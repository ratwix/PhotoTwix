set PATH=%PATH%;"C:\Program Files (x86)\BEL\Realterm\";"C:\Program Files (x86)\Google\Chrome\Application\"
rem ping 127.0.0.1 -n 2 > NUL 
rem start "" "realterm.exe" -port=3 -baud=9600 -echo=server:9876 -caption=Teensy
ping 127.0.0.1 -n 10 > NUL 
start "" "chrome.exe" --kiosk https://127.0.0.1/PhotoTwix/photomaton/src/
