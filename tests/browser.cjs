const {chromium}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const output=path.join(__dirname,'../browser-review');fs.mkdirSync(output,{recursive:true});
const html=fs.readFileSync(path.join(__dirname,'../index.html'));
const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(html)});
const results=[],errors=[];
(async()=>{await new Promise(resolve=>server.listen(4500,'127.0.0.1',resolve));const browser=await chromium.launch({headless:true});try{
for(const config of [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844},{name:'small',width:320,height:740},{name:'reduced',width:1440,height:1000,reducedMotion:'reduce'}]){
 const context=await browser.newContext({viewport:{width:config.width,height:config.height},reducedMotion:config.reducedMotion||'no-preference'});
 await context.addInitScript(()=>{Element.prototype.requestPointerLock=function(){};Element.prototype.setPointerCapture=function(){};Element.prototype.releasePointerCapture=function(){}});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(config.name+': '+e.message));
 await page.goto('http://127.0.0.1:4500');await page.waitForSelector('.map-node');
 const shot=async(name)=>{await page.waitForTimeout(650);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),config.name+' overflow '+name);await page.screenshot({path:path.join(output,config.name+'-'+name+'.png'),fullPage:false});};
 await shot('home');assert.equal(await page.locator('.map-node').count(),12);
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();results.push({viewport:config.name,accessibility:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
 await page.locator('.map-node[href="#section/code"]').click();await page.waitForSelector('.track-cover');await shot('track');
 await page.locator('.track-lessons a[href="#lesson/code/code-briques"]').click();await page.waitForSelector('#reformBox');assert.ok((await page.locator('pre').textContent()).includes('for i in range(3):'));await shot('lesson-top');
 await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight*.4));await shot('lesson-middle');
 await page.locator('#reformBox').fill('Une variable garde une valeur. Une condition choisit une action. Une boucle répète une instruction.');await page.locator('#doneBtn').click();assert.equal(await page.locator('#doneBtn').getAttribute('aria-pressed'),'true');
 await page.route('http://127.0.0.1:8080/**',route=>route.fulfill({status:200,contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'POST, OPTIONS'},body:JSON.stringify({choices:[{message:{content:'Les trois notions sont bien distinguées. Peux-tu donner un exemple de boucle ?'}}]})}));await page.locator('#tutorBtn').click();await page.waitForFunction(()=>document.getElementById('tutorOut').textContent.includes('trois notions'));await shot('lesson-notes');
 await page.reload();await page.waitForSelector('#reformBox');assert.ok((await page.locator('#reformBox').inputValue()).startsWith('Une variable'));assert.equal(await page.locator('#doneBtn').getAttribute('aria-pressed'),'true');
 await page.evaluate(()=>location.hash='#notes');await page.waitForSelector('.note-preview');assert.ok((await page.locator('.note-preview p').textContent()).startsWith('Une variable'));await shot('saved-notes');
 if(config.width<741){await page.locator('#menuBtn').click();assert.equal(await page.locator('#menuBtn').getAttribute('aria-expanded'),'true');await shot('menu');await page.keyboard.press('Escape');assert.equal(await page.locator('#menuBtn').getAttribute('aria-expanded'),'false')}
 await page.locator('#searchInput').fill('boucle');await page.locator('#searchInput').press('Enter');await page.waitForSelector('#results .lesson-card');await shot('search');
 assert.equal(await page.evaluate(()=>ScrollCraft.instances.length),config.reducedMotion?0:1);
 if(config.reducedMotion)assert.equal(await page.locator('.track-art-front').count(),0);
 await context.close();
}
assert.deepEqual(errors,[]);fs.writeFileSync(path.join(output,'results.json'),JSON.stringify({status:'passed',errors,results},null,2));console.log('PASS: browser flows at 1440, 390, 320 and reduced motion; screenshots saved.');
const violations=results.flatMap(x=>x.accessibility.filter(v=>['critical','serious'].includes(v.impact)));assert.deepEqual(violations,[],'Serious accessibility violations');
}finally{await browser.close();server.close()}})().catch(e=>{fs.writeFileSync(path.join(output,'failure.txt'),e.stack);console.error(e);server.close();process.exitCode=1});
