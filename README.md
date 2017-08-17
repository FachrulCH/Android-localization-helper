# LION :: Simplifying Localization Test! (l10n)
A simple parser and comparator from language file in Android and IOS

## Use case
We have mobile application that has support 2 language, in English (default) and also in Bahasa Indonesia.
We used to test screen by screen and it takes long time to view needed screen show (as user flow)
Hence, I build tool to simplifying check between english and bahasa, showing in one list for the same keyword

### Disclaimer
Even we have test here all string has met our expectation, please be aware that it was only compare string by string, not rendered text, so make sure again after text is correct you test in devices, because some time the text is not fit with screen, or even dev hardcoded for that screen!  

# How to use
## Android (.apk)
Prerequisite: install `apktool` [link here](https://ibotpeaches.github.io/Apktool/install/)
- Open terminal
- run `apktool d name-your-app.apk`
- You will have folder with your app name, and language file located in `/res/values/strings.xml` (english) and `/res/values-in/strings.xml` (bahasa) 
- open index.html (or direct link, as bellow)
- Choose android platform and upload your strings.xml
- click Process

## iPhone (.ipa)
Prerequisite: OSX has `plutil` but I'm using ubuntu, so I need install `plistutil` by typing this in terminal `sudo apt install libplist-utils`
- Open terminal
- run `unzip name-your-app.ipa`
- You will have folder with your app name, and language file located in `/Payload/your.app/en.lproj/Locaizable.strings` (english) and `/Payload/your.app/id.lproj/Locaizable.strings` (bahasa) *will not exact same each app :D
- now we will convert the string binary to xml using this inside your Locaizable.strings `plistutil -i Locaizable.strings -o output.xml`
- open index.html (or direct link, as bellow)
- Choose android platform and upload your strings.xml
- click Process


Direct Run Application here
----
<https://fachrulch.github.io/Lion-Simplifying-Localization-Test/>

### preview app
[![ScreenShot](https://raw.githubusercontent.com/FachrulCH/Android-localization-helper/master/Screenshot%20from%202017-08-13%2000-38-46.png)
