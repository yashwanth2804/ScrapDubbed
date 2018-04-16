//telugupakala

const puppeteer = require('puppeteer');
 var prompt = require('prompt');
 var prompt1 = require('prompt');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

 global.MOvie="";
 global.ShrinkLinks="";
 ///prompt.start();
 //console.log('Please Enter MOvie name:');


 rl.question('Please enter the Movie number : ', (MovieName) => {

  MOvie =  MovieName;
        MOvie= "+"+MOvie+"+";
	   //
	  puppeteer
	  .launch({headless:false})
	  .then(async browser => {


		 //call to browser
		 var url = "https://duckduckgo.com/?q=" + MOvie + "site%3Atelugupalaka.com";

		///duckduck go
	  DuckDuckGo(url,browser).
		then( DuckDuckGoUrl => {

			//console.log("returned url"+DuckDuckGoUrl);
			TelugupalakaPage(DuckDuckGoUrl,browser)
			.then( b => {

				  var f =b;


			   rl.question('Select an option : ', (answer2) => {

					 var  selectedUrl = f[answer2].toString().split("->")[1];
					//console.log(selectedUrl);

					LinkSharenet(selectedUrl,browser).then( v => {

							//console.log("Hashed code "+v);
							var hashcode = revC(v);
							OpenLoad(hashcode,browser).then( z => {
								 console.log("https://openload.co/stream/"+z.trim());
								 process.exit(1);
							});


				  });

					rl.close();
				});




			});



		})
		;

		////end duckduckgo and telugupalaka


		});






});






    /* prompt.get(['MovieName'], function (err, result) {

        MOvie = result.MovieName.toString();
        MOvie= "+"+MOvie+"+";
	   //
	  puppeteer
	  .launch({headless:false})
	  .then(async browser => {


		 //call to browser
		 var url = "https://duckduckgo.com/?q=" + MOvie + "site%3Atelugupalaka.com";

		///duckduck go
	  DuckDuckGo(url,browser).
		then( DuckDuckGoUrl => {

			//console.log("returned url"+DuckDuckGoUrl);
			TelugupalakaPage(DuckDuckGoUrl,browser)
			.then( b => {

				  var f =b;





				  var  selectedUrl = f[1].toString().split("->")[1];
				  //console.log(selectedUrl);

				  LinkSharenet(selectedUrl,browser).then( v => {

							//console.log("Hashed code "+v);
							var hashcode = revC(v);
							OpenLoad(hashcode,browser).then( z => {
								 console.log("https://openload.co/stream/"+z.trim());
							});


				  });




			});



		})
		;

		////end duckduckgo and telugupalaka


		});



	   prompt.stop();
 }); */


	  async function DuckDuckGo(url,browser) {
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


    await page.goto(url,{timeout: 0});
    const hrefs = await page.$$eval('a.result__a', hrefs => hrefs.map((a) => {
      return a.href;
    }));

    var link = hrefs[0];

    if (typeof link == "undefined") {
      //page.close();

      return 0;
    } else {
      //page.close();

      return link;
    }


    //  process.exit(1);
  } catch (err) {
    console.error(err);
  }

}

///Telugu palaka Page
async function TelugupalakaPage(url,browser) {


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


    await page1.goto(url,{timeout: 0});
	const hrefs = await page1.$$eval('a[target]', aTags => aTags.map(a =>
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

    return f;




  } catch (err) {
    console.error(err);
  }

}

///Linkshare.net page
async function LinkSharenet(url,browser) {


  try {

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
      //console.log(m11+"  "+m2[0]);
		return m2[0];

  } catch (err) {
    console.error(err);
  }

}

///Openload.net page
async function OpenLoad(url,browser) {


  try {

    const opage = await browser.newPage();

	//await opage.setRequestInterception(true);
	/* page.on('request', (request) => {
		if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
			request.abort();
		} else {
			request.continue();
		}
	}); */


    await opage.goto(url,{timeout: 0});
    //get the recV from scrapping

		  const textContentID = await opage.evaluate(() => document.querySelector('#DtsBlkVFQx').textContent);
		  browser.close();

		return textContentID;
  } catch (err) {
    console.error(err);
  }

}



function revC(ine){
	var b64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=b64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=b64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};return 'http://linkshrink.net/'+b64.decode(ine);
	}
