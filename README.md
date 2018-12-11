# ScrapDubbed
A NodeJs tool to scrap the content download sites and provides the download URL with out any pop-up ads. please feel free to contribute.

# About Telugupalaka
----------
Telugupalaka is a dubbed movies download portal,where one can find hollywood and bollywood dubbed movies in native Indian languages. 
http://telugupalaka.com/


# Requirements
* NodeJS
* Chrome (must be greater than v.60,recomended updated one)

# 1 Getting started
--------------
## 1.1 Installation of NodeJs

To use the project you need to install NodeJs, choose basing on your OS and architecture. 
* Node, https://nodejs.org/en/download/

## 1.2 Installation of Puppeteer

###### _Puppeteer is a Node library which provides a high-level API to control headless Chrome or Chromium over the DevTools Protocol. It can also be configured to use full (non-headless) Chrome or Chromium._


use ```npm i puppeteer``` to download. But this will download latest build of chromium of about 170mb.<br>
 **To skip the download, use this instead**  <br>
 
  ```export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true ``` (*make sure you run this command before the following command*)  <br>
  ```npm i puppeteer chalk ora```<br>

 ![npm](https://i.imgur.com/AsFsZtB.png) 
 
 # 2 Executing Project
 ----------------------
 * Download the latest release source code from [releases](https://github.com/yashwanth2804/ScrapDubbed/releases)  
 (currently , https://github.com/yashwanth2804/ScrapDubbed/archive/v1.1.1.zip )
 * Extract zip to folder 
 * In **Telugupalaka.js** file make sure you point to correct **chrome installed path in your system** <br>
 *(default executablePath is C:\\\Program Files (x86)\\\Google\\\Chrome\\\Application\\\chrome.exe )*
 * Run command ```node Telugupalaka.js```  << press enter >>
 
 ![Run](https://i.imgur.com/y4xteGr.png)
 
 # In action :running:
 
  
  ![Gif](https://i.imgur.com/yWKYlCK.gif)
 
 copy download url and paste in browser to download
 
