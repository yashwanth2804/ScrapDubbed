const puppeteer = require('puppeteer');
global.MOvie = "";
global.ShrinkLinks = "";

module.exports.LinkSharenet = function (selectedUrl) {

    ////////////////////////////////start function 
    console.log("selected url"+selectedUrl);
     return new  Promise(function(res,rej){ 

        (async () => {
            await  puppeteer
            .launch({
                headless: true,
                //executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", ///provide your chrome path
                args: [
    
                    '--safebrowsing-disable-auto-update',
                    "--proxy-server='direct://",
                    "--proxy-bypass-list=*"
                ]
    
            }
    
            )
            .then(async browser => {
                console.log(selectedUrl);
    
                LinkSharenetFunc(selectedUrl, browser).then(v => {
    
                     console.log("Hashed code "+v);
                    var hashcode = revC(v);
                    OpenLoad(hashcode, browser).then(z => {
                        
                         
                        //provide an option to download or view
                        if( (z == "") || (z==undefined) ){
                            console.log("0");
                            res("00");
                            browser.close();
                        }
                        if(z === "notopenload"){
                            console.log("not a openload site");
                            res("01");
                            browser.close();

                        }
                        else{
                            var download_url = "https://openload.co/stream/" + z.trim();
                            console.log(download_url);
                            res(download_url);
                            browser.close();
                        }
                       
    
                    });
    
    
                });
    
    
    
            });
    
        })();

    });


    

   

    ////end duckduckgo and telugupalaka



    ///Linkshare.net page
    async function LinkSharenetFunc(url, browser) {

        console.log("inside LinshrenetFunc");
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


            await page.goto(url, {
                timeout: 0
            });
            //get the recV from scrapping
            let bodyHTML = await page.evaluate(() => document.body.textContent);


            var reg = /(revC\(".*"\))/;
            var m1 = bodyHTML.toString().match(reg);
            var m11 = m1[0];
            var m2 = m11.toString().match(/(".*")/);
            //console.log(m11+"  "+m2[0]);
            return m2[0];

        } catch (err) {
            console.error(err);
        }

    }

    ///Openload.net page
    async function OpenLoad(url, browser) {
        console.log("inside openload");
        var textContentID='';
        
        try {

            const opage = await browser.newPage();
            
            await opage.setRequestInterception(true);
            opage.on('request', (request) => {
                if (['image'].indexOf(request.resourceType()) !== -1) {
                    request.abort();
                } else {
                    request.continue();
                }
            });


           
  

            try {
                //wait for 15 sec else reload
                console.log("@@@@@@@@@@@@@@@@@ waiting for page @@@@@@@@@@@@@@@@@@")
                await opage.goto(url, {
                    timeout: 55000
                });
                 
                var patt1 = /openload.co*/g;
                
                var result = opage.url().match(patt1);
                
                if(result == null){
                    console.log("not openload");
                    textContentID ="notopenload"; 
                   
                }
                    
                else 
                    {
                        console.log("it is  openload");
                        var t = opage.url();
                         
        
                        try {
                             textContentID = await opage.evaluate(() => document.querySelector('#DtsBlkVFQx').textContent);
                        } catch (e) {
            
                            console.log("Sorry video not found in OpenLoad site !");
                            
                        }

                    }    


               

            } catch (err) {

                //console.log("page not loaded in 15 sec, reloading ");
                console.log("@@@@@@@@@@@@@@@@@ reloading for page @@@@@@@@@@@@@@@@@@");
                console.log(err);
                await opage.reload({
                    timeout: 30000
                });
                //console.log("Completed loading page ");
                //  console.log(err);
            }
            
            //check if it is openload base url
            console.log("@@@@@@@@@@@@@@@@@ finnaly check  for page @@@@@@@@@@@@@@@@@@"+"\n"+textContentID);
            // try {
            //     var textContentID = await opage.evaluate(() => document.querySelector('#DtsBlkVFQx').textContent);
            // } catch (e) {

            //     console.log("Sorry video not found in OpenLoad site !");
                
            // }
            

            return textContentID;
        } catch (err) {
            console.error(err);
        }

    }






    function revC(ine) {
        var b64 = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function (e) {
                var t = "";
                var n, r, i, s, o, u, a;
                var f = 0;
                e = b64._utf8_encode(e);
                while (f < e.length) {
                    n = e.charCodeAt(f++);
                    r = e.charCodeAt(f++);
                    i = e.charCodeAt(f++);
                    s = n >> 2;
                    o = (n & 3) << 4 | r >> 4;
                    u = (r & 15) << 2 | i >> 6;
                    a = i & 63;
                    if (isNaN(r)) {
                        u = a = 64
                    } else if (isNaN(i)) {
                        a = 64
                    }
                    t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
                }
                return t
            },
            decode: function (e) {
                var t = "";
                var n, r, i;
                var s, o, u, a;
                var f = 0;
                e = e.replace(/[^A-Za-z0-9+/=]/g, "");
                while (f < e.length) {
                    s = this._keyStr.indexOf(e.charAt(f++));
                    o = this._keyStr.indexOf(e.charAt(f++));
                    u = this._keyStr.indexOf(e.charAt(f++));
                    a = this._keyStr.indexOf(e.charAt(f++));
                    n = s << 2 | o >> 4;
                    r = (o & 15) << 4 | u >> 2;
                    i = (u & 3) << 6 | a;
                    t = t + String.fromCharCode(n);
                    if (u != 64) {
                        t = t + String.fromCharCode(r)
                    }
                    if (a != 64) {
                        t = t + String.fromCharCode(i)
                    }
                }
                t = b64._utf8_decode(t);
                return t
            },
            _utf8_encode: function (e) {
                e = e.replace(/rn/g, "n");
                var t = "";
                for (var n = 0; n < e.length; n++) {
                    var r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r)
                    } else if (r > 127 && r < 2048) {
                        t += String.fromCharCode(r >> 6 | 192);
                        t += String.fromCharCode(r & 63 | 128)
                    } else {
                        t += String.fromCharCode(r >> 12 | 224);
                        t += String.fromCharCode(r >> 6 & 63 | 128);
                        t += String.fromCharCode(r & 63 | 128)
                    }
                }
                return t
            },
            _utf8_decode: function (e) {
                var t = "";
                var n = 0;
                var r = c1 = c2 = 0;
                while (n < e.length) {
                    r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r);
                        n++
                    } else if (r > 191 && r < 224) {
                        c2 = e.charCodeAt(n + 1);
                        t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                        n += 2
                    } else {
                        c2 = e.charCodeAt(n + 1);
                        c3 = e.charCodeAt(n + 2);
                        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                        n += 3
                    }
                }
                return t
            }
        };
        return 'http://linkshrink.net/' + b64.decode(ine);
    }

    ////////////////////////////////////end pasting
     
}