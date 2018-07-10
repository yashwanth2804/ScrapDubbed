module.exports.DuckSearch = async function(MovieName1){

    ////////////////////////////////start function
    const puppeteer = require('puppeteer');
    var timestamp = require('console-timestamp');

    console.log(MovieName1+"   "+'hh:mm:ss'.timestamp);
    global.MOvie = "";
    global.ShrinkLinks = "";
    
    
      MOvie = MovieName1;
      MOvie = "+" + MOvie + "+";
      var url = "https://duckduckgo.com/?q=" + MOvie + "site%3Atelugupalaka.com/";

     console.log("url is"+url);
     
      await puppeteer
        .launch({
            headless: false,
            //executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", ///provide your chrome path
            args: [
    
              '--safebrowsing-disable-auto-update',
               "--proxy-server='direct://",
                    "--proxy-bypass-list=*"
            ]
    
          }
    
        )
        .then(async browser => {
     
          //call to browser
          var url = "https://duckduckgo.com/?q=" + MOvie + "site%3Atelugupalaka.com/";
    
          ///duckduck go
          DuckDuckGo(url, browser).
          then(DuckDuckGoUrl => {
             
    
            if (DuckDuckGoUrl === 0) {
              console.log("No Movie with name " + MovieName1 + " found !");
              return "NO movie found";
            }
            browser.close();
            return DuckDuckGoUrl;
    
          });
    
          ////end duckduckgo and telugupalaka
    
        });
   


 
    
    
    async function DuckDuckGo(url, browser) {

       console.log("Inside Duck duck");
       console.log("browsing the url "+url);

      try {
    
        const page = await browser.newPage();
    
        await page.setRequestInterception(true);
        page.on('request', (request) => {
          if (['image'].indexOf(request.resourceType()) !== -1) {
            request.abort();
          } else {
            request.continue();
          }
        });
    
    
        await page.goto(url, {
          timeout: 0
        });
        const hrefs = await page.$$eval('a.result__a', hrefs => hrefs.map((a) => {
          return a.href;
        }));
    
        var link = hrefs[0];
    
        if (typeof link == "undefined") {
          //page.close();
    
          return 0;
        } else {
          //page.close();
           console.log("returning link "+link);
          return link;
        } 
        //  process.exit(1);
      } catch (err) {
        console.error(err);
      }
    
    }
     
    

    ////////////////////////////////////end pasting
   return "****NO movie found******";
}