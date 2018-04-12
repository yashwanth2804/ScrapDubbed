const puppeteer = require('puppeteer');

const readline = require('readline');
 var prompt = require('prompt');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


async function DuckDuckGo(url) {
  try {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();

    //  var url = "https://google.com"
    await page.goto(url,{timeout: 0});
    const hrefs = await page.$$eval('a.result__a', hrefs => hrefs.map((a) => {
      return a.href
    }));

    var link = hrefs[0];

    if (typeof link == "undefined") {
      page.close();
      await browser.close();
      return 0;
    } else {
      page.close();
      await browser.close();
      return link;
    }


    //  process.exit(1);
  } catch (err) {
    console.error(err);
  }

}

///Telugu palaka Page
async function TelugupalakaPage(url) {


  try {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();

	await page.setRequestInterception(true);
	page.on('request', (request) => {
		if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
			request.abort();
		} else {
			request.continue();
		}
	});


    await page.goto(url,{timeout: 0});
	const hrefs = await page.$$eval('a[target]', aTags => aTags.map(a =>
	{
		let textC = a.textContent;

			if(textC.match(/.*Watch.*/)){
				var rep = textC.replace('Watch', 'Download');
				 return rep+"->"+a.getAttribute("href");
			}
	}
	));

	var f = hrefs.filter(item => item);
	 let y=0;
	 for(let g of f)
		console.log("  "+(y++) + " "+ g);


    //page.close();
    //await browser.close();
  //  var  selectedUrl = f[1].toString().split("->")[1];
    // return selectedUrl;
    prompt.start();
    prompt.get(['SelectOption'], function (err, result) {

       var  selectedUrl = f[result.SelectOption].toString().split("->")[1];
       //console.log(selectedUrl);

       LinkSharenet(selectedUrl);
      });


	 // rl.question('@Select one from list', (answer) => {
   //      console.log("Seletec index"+answer);
		// 		var  selectedUrl = f[answer].toString().split("->")[1];
		// 		console.log("Selected Url"+selectedUrl);
   //      return selectedUrl;
   //
	 // });

  } catch (err) {
    console.error(err);
  }

}

///Linkshare.net page
async function LinkSharenet(url) {


  try {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();

	await page.setRequestInterception(true);
	page.on('request', (request) => {
		if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
			request.abort();
		} else {
			request.continue();
		}
	});


    await page.goto(url,{timeout: 0});
    //get the recV from scrapping
      let bodyHTML = await page.evaluate(() => document.body.textContent);


      var reg =/(revC\(".*"\))/;
      var m1 = bodyHTML.toString().match(reg);
      var m11=m1[0];
      var m2 = m11.toString().match(/(".*")/);
      console.log(m11+"  "+m2[0]);


  } catch (err) {
    console.error(err);
  }

}




rl.question('What do you think of Node.js? ', (answer) => {
  answer = "+" + answer + "+";
  var url = "https://duckduckgo.com/?q=" + answer + "site%3Atelugupalaka.com";

  DuckDuckGo(url).then(a => {

    if (a == 0) {
      console.log("Url Not found");
      process.exit(1);
    } else {
      console.log("url found " + a);
      TelugupalakaPage(a);

    }

  });

  rl.close();
});
