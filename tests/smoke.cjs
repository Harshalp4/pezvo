const assert=require('node:assert/strict');
const base='http://127.0.0.1:3100';
const routes=['/','/services','/services?service=Dry%20Clean','/pricing','/pricing?service=Steam%20Press','/about','/how-it-works','/contact','/gallery','/blog','/blog/dry-cleaning-or-steam-press','/blog/silk-saree-care','/faq','/business','/book-pickup','/privacy','/terms','/enquire','/insights','/festival/ganpati'];
(async()=>{
 const checks=await Promise.all(routes.map(async route=>{const response=await fetch(base+route);assert.equal(response.status,200,route);const html=await response.text();assert.match(html,/<h1[ >]/,route+' h1');assert.match(html,/<title>[^<]*PEZVO/,route+' title');const copy=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');assert.doesNotMatch(copy,/PRESSO|Presso|presso24\.com|AquaWash|Laundra|Loander|PRESTIGE/,route+' branding');assert.doesNotMatch(copy,/mailto:["']/,route+' empty email');return route;}));
 for(const route of ['/brand/pezvo-logo.webp','/brand/pezvo-icon.webp','/icon.png','/apple-icon.png','/opengraph-image','/media/pezvo-atelier.webp','/media/pezvo-delivery.webp','/media/blazer-care.webp','/media/precision-press.webp','/media/doorstep-care.webp','/photos/hero-press.mp4','/media/shirt-steaming-wide.mp4','/media/shirt-steaming-wide.webp','/sitemap.xml','/robots.txt','/llms.txt']){assert.equal((await fetch(base+route)).status,200,route);}
 const robots=await (await fetch(base+'/robots.txt')).text();assert.match(robots,/Disallow: \//);
 assert.equal((await fetch(base+'/api/coverage?pincode=bad')).status,400);
 assert.equal((await fetch(base+'/api/coverage?pincode=400706')).status,503);
 assert.equal((await fetch(base+'/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'',phone:'bad'})})).status,400);
 assert.equal((await fetch(base+'/not-a-page')).status,404);
 const legacy=await fetch(base+'/ai-booking',{redirect:'manual'});assert.equal(legacy.status,307);assert.equal(legacy.headers.get('location'),'/book-pickup');
 console.log(`PASS ${checks.length} public routes, PEZVO-only rendered branding, headings/titles, 16 media/SEO resources, local noindex, validation/unavailable states, 404 and legacy redirect.`);
})().catch(e=>{console.error(e);process.exit(1);});
