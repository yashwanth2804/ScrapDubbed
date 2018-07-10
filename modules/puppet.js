module.exports.DuckSearch =  function(MovieName1){

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
     
       puppeteer
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
             
             TelugupalakaPage(DuckDuckGoUrl, browser)
               .then(b => {
     
                 //var f = b;
                 browser.close();
                 console.log("TP"+b);
                 return b;
                 
                 
      
                //    var selectedUrl = f[answer2].toString().split("->")[1];
                //    //console.log(selectedUrl);
     
                //    LinkSharenet(selectedUrl, browser).then(v => {
     
                //      //console.log("Hashed code "+v);
                //      var hashcode = revC(v);
                //      OpenLoad(hashcode, browser).then(z => {
     
                //        //provide an option to download or view
     
                //        var download_url = "https://openload.co/stream/" + z.trim();
                //        console.log(chalk.bgGreen.bold("Use this url to download the video ") +"\n"+ chalk.bgGreen.bold.underline(download_url));
     
                //      });
     
     
                //    });
     
                //    rl.close();
                 
     
               });
     
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
     
     ///Telugu palaka Page
     async function TelugupalakaPage(url, browser) {
     console.log("Inside Telugupalaks");
     
       try {
     
         const page1 = await browser.newPage();
     
         await page1.setRequestInterception(true);
         page1.on('request', (request) => {
           if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
             request.abort();
           } else {
             request.continue();
           }
         });
     
     
         await page1.goto(url, {
           timeout: 0
         });
         ///print title of the page
        
         const Title = await page1.evaluate(() => document.querySelector('h1').textContent);
         
         const hrefs = await page1.$$eval('a[target]', aTags => aTags.map(a => {
           let textC = a.textContent;
     
           if (textC.match(/.*Watch.*/)) {
             var rep = textC.replace('Watch', 'Download');
             return rep + "->" + a.getAttribute("href");
           }
         }));
     
         var f = hrefs.filter(item => item);
         //console.log(f);
         return f;
     
         
        //  for (let g of f)
        //    console.log(g.toString().split("->")[0]+"   "+g.toString().split("->")[1]);
     
         
     
       } catch (err) {
         console.error(err);
       }
     
     }
     

     ////////////////////////////////////end pasting
    return "****NO movie found******";
}