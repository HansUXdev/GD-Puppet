
const puppeteer = require('puppeteer');

// Rename config_example.js
const settings  = require('./config.js');


(async () => {
  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch(
      {
        headless: false, // default is true
        slowMo: 50
      }
  ); 

  let page = await browser.newPage();
  let currentURL;
  let pages = await browser.pages();
      // Wait for suggest overlay to appear and click "show all results".
      const GDloginUserSelector = ' #username-input .login-input-container input.username-input.form-control';
      const GDloginPassSelector = ' #password-input .login-input-container input#password';

      await page.goto("https://sso.godaddy.com/?realm=idp&path=%2Fproducts&app=account")
        .then( ()=> {return console.log("login page loaded...");} );
          await page.waitForSelector(GDloginUserSelector)
            .then( ()=> {return console.log("login element found ...") })
              await page
                .type( `${GDloginUserSelector}`, `${settings[0].gd_username}` )
                .then( ()=> {return console.log("typing username ...");} );
          await page.waitForSelector(GDloginPassSelector)
            .then( ()=> {return console.log("password element found ...");} )
              await page
                .type( `${GDloginPassSelector}`, `${settings[0].gd_pass}` )
                .then( ()=> {return console.log("typing password ...");} );
          await page.click('#submitBtn');

      // leave browser open
      // await browser.close();
})();