devices::
	adb devices

start::
	adb -s 81be0522 reverse tcp:8080 tcp:8080 && npm run android

build:: 
	cd android && ./gradlew installRelease