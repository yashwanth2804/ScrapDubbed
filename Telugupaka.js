const puppeteer = require('puppeteer');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//ask for movie name
rl.question('Please enter movie name ', (movie_name) => {
    ///getting Movie name from user
    let Movie = "+"+movie_name+"+"
    console.log(`You entered ${Movie}`);
    ///check if movie exist
    //var url = "https://duckduckgo.com/?q="+Movie+"site%3Atelugupalaka.com"
    var url = "https://duckduckgo.com/?q="+Movie+"site%3Atelugupalaka.com";
    //console.log(url)
    //check if got any results
    (async () => {
      const browser = await puppeteer.launch({headless:false})
      const page = await browser.newPage()
      await page.goto(url)
      const hrefs = await page.$$eval('a.result__a', hrefs => hrefs.map((a) => {
                return a.href
                  }));

      var link = hrefs[0];
     if (typeof link == "undefined") {
                console.log("Movie with name "+movie_name+" not found");
                process.exit(); 
            }else{
                //// rest code
              console.log(link);
              await page.close();
              const Telugupalaka_page = await browser.newPage()
            //  await Telugupalaka_page.setRequestInterceptionEnabled(true);
            const Telugupalaka_page_response =   await Telugupalaka_page.goto(link,{waitUntil: 'networkidle2'});
            console.log(Telugupalaka_page_response.headers);
              //
              // //await page.setRequestInterceptionEnabled(true);
              //  Telugupalaka_page.on('request', request => {
              //         //request.continue();
              //         console.log("URL: " + request.url);
              //
              //     });
              // Telugupalaka_page.on('request', request => {
              //        //request.continue();
              //        console.log("URL: " + request.url);
              //        console.log("METHOD: " + request.method);
              //        //console.log("HEADERS:" + JSON.stringify([...request.headers]) + "\n");
              //    });


            }

                  await browser.close()
      })()




    rl.close();
});
