const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict'), ts = require('typescript');
const code = ts.transpileModule(fs.readFileSync('src/lib/festival.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const stored = new Map();
const window = {sessionStorage:{getItem:k=>stored.get(k),setItem:(k,v)=>stored.set(k,v),removeItem:k=>stored.delete(k)}};
const ctx={exports:{},window,URL,Date,Intl,process:{env:{}}};vm.runInNewContext(code,ctx);
const {pickHeroImage,pickHeroVideo,DEFAULT_HERO_VIDEO,countdownParts,formatCountdown,isFestivalOn,pickReadyBy,skinPalette,ribbonStorageKey,isRibbonHidden,hideRibbon,shortBookBy,promoBadge,istDate,withCampaign}=ctx.exports;
// Objects built inside the VM have a foreign prototype, so compare by value.
const plain=(o)=>o&&JSON.parse(JSON.stringify(o));

const rows=[
  {key:'standard',label:'Dry clean, steam press & home linen',hours:48,bookByUtc:'2026-09-12T02:30:00.000Z',bookByIst:'Sat, 12 Sept, 8:00 am',passed:false},
  {key:'express',label:'Express (where available)',hours:24,bookByUtc:'2026-09-13T02:30:00.000Z',bookByIst:'Sun, 13 Sept, 8:00 am',passed:false},
];
const fest={active:true,skin:'ganeshotsav',name:'Ganeshotsav 2026',date:'2026-09-14',startDate:'2026-09-01',slug:'ganpati',readyBy:rows};

assert.deepEqual(plain(countdownParts('2026-09-12T02:30:00.000Z','2026-09-08T14:48:00.000Z')),{days:3,hours:11,minutes:42,passed:false});
assert.deepEqual(plain(countdownParts('2026-09-12T02:30:00.000Z','2026-09-12T02:29:30.000Z')),{days:0,hours:0,minutes:0,passed:false});
assert.deepEqual(plain(countdownParts('2026-09-12T02:30:00.000Z','2026-09-12T02:30:00.000Z')),{days:0,hours:0,minutes:0,passed:true});
assert.deepEqual(plain(countdownParts('2026-09-12T02:30:00.000Z','2026-09-13T00:00:00.000Z')),{days:0,hours:0,minutes:0,passed:true});
assert.deepEqual(plain(countdownParts(null,'2026-09-13T00:00:00.000Z')),{days:0,hours:0,minutes:0,passed:true});
assert.deepEqual(plain(countdownParts('2026-09-12T02:30:00.000Z','not a date')),{days:0,hours:0,minutes:0,passed:true});
assert.equal(formatCountdown({days:3,hours:11,minutes:42,passed:false}),'3 d 11 h 42 m');
assert.equal(formatCountdown({days:0,hours:5,minutes:0,passed:false}),'5 h 0 m');
assert.equal(formatCountdown({days:0,hours:0,minutes:0,passed:true}),'');
console.log('PASS countdown before and after the target, bad input, formatting');

assert.equal(isFestivalOn(fest,'2026-09-10T06:00:00.000Z'),true);
assert.equal(isFestivalOn(fest,'2026-09-14T18:00:00.000Z'),true,'still on late on the festival day in IST');
assert.equal(isFestivalOn(fest,'2026-09-14T18:30:00.000Z'),false,'over once the IST day ends');
assert.equal(isFestivalOn(fest,'2026-08-31T18:00:00.000Z'),false,'not before startDate in IST');
assert.equal(isFestivalOn({...fest,active:false},'2026-09-10T06:00:00.000Z'),false);
assert.equal(isFestivalOn({...fest,date:null,startDate:null},'2030-01-01T00:00:00.000Z'),true,'no dates means the API flag decides');
assert.equal(isFestivalOn(null,'2026-09-10T06:00:00.000Z'),false);
assert.equal(isFestivalOn(fest,'garbage'),false);
console.log('PASS isFestivalOn honours the active flag and the IST calendar window');

assert.equal(pickReadyBy(fest,'express').key,'express');
assert.equal(pickReadyBy(fest,'specialty').key,'standard','unknown key falls back to standard');
assert.equal(pickReadyBy({readyBy:[rows[1]]},'specialty').key,'express','no standard row falls back to the first row');
assert.equal(pickReadyBy({readyBy:[]},'standard'),null);
assert.equal(pickReadyBy(null,'standard'),null);
console.log('PASS pickReadyBy fallback chain');

assert.deepEqual(plain(skinPalette('ganeshotsav')),{a:'#c2410c',b:'#f59e0b',c:'#7a1f1f'});
assert.deepEqual(plain(skinPalette('diwali')),{a:'#7c2d12',b:'#d4a017',c:'#1e1b4b'});
assert.deepEqual(plain(skinPalette('generic')),{a:'#0c409f',b:'#34a625',c:'#f59e0b'});
assert.deepEqual(plain(skinPalette('pongal')),plain(skinPalette('generic')),'unknown skin → generic');
assert.deepEqual(plain(skinPalette('none')),plain(skinPalette('generic')));
assert.deepEqual(plain(skinPalette(undefined)),plain(skinPalette('generic')));
console.log('PASS skin palettes with generic fallback');

assert.equal(ribbonStorageKey(fest),'presso_festival_ribbon_hidden_ganpati_2026-09-14');
assert.equal(ribbonStorageKey(fest),ribbonStorageKey({...fest,name:'renamed',ribbonText:'x'}),'key is stable across copy edits');
assert.notEqual(ribbonStorageKey(fest),ribbonStorageKey({...fest,date:'2027-09-04'}),'next year shows again');
assert.equal(ribbonStorageKey({slug:'',skin:'diwali',date:null}),'presso_festival_ribbon_hidden_diwali_open');
assert.equal(isRibbonHidden(fest),false);
hideRibbon(fest);
assert.equal(isRibbonHidden(fest),true);
assert.equal(isRibbonHidden({...fest,date:'2027-09-04'}),false);
window.sessionStorage.getItem=()=>{throw Error('blocked')};window.sessionStorage.setItem=()=>{throw Error('blocked')};
assert.equal(isRibbonHidden(fest),false);
assert.doesNotThrow(()=>hideRibbon(fest));
console.log('PASS ribbon storage key stability and blocked storage');

assert.equal(shortBookBy('Sat, 12 Sept, 8:00 am'),'Sat, 12 Sept');
assert.equal(shortBookBy('Thu 10 Sep'),'Thu 10 Sep');
assert.equal(shortBookBy(''),'');
assert.equal(promoBadge({type:'FlatDiscount',value:150,maxDiscountAmount:null}),'FLAT ₹150 OFF');
assert.equal(promoBadge({type:'PercentDiscount',value:10,maxDiscountAmount:200}),'10% OFF up to ₹200');
assert.equal(promoBadge({type:'PercentDiscount',value:10,maxDiscountAmount:0}),'10% OFF');
assert.match(istDate('2026-09-14T18:29:59.000Z'),/14 Sept? 2026/,'IST date just before midnight');
assert.match(istDate('2026-09-14T18:30:00.000Z'),/15 Sept? 2026/,'IST rolls over at 18:30 UTC');
assert.equal(istDate(null),'');
assert.equal(withCampaign('/services?service=Dry%20Clean','utm_source=fb&utm_campaign=ganpati'),'/services?service=Dry%20Clean&utm_source=fb&utm_campaign=ganpati');
assert.equal(withCampaign('/contact#coverage','utm_source=fb'),'/contact?utm_source=fb#coverage');
assert.equal(withCampaign('/','') ,'/');
console.log('PASS short dates, promo badge, IST dates and campaign-preserving links');

const bannerOnly={heroImageUrl:null,heroImageMobileUrl:null,banner:{id:'b',wideImageUrl:'wide.jpg',imageUrl:'sq.jpg'}};
assert.deepEqual(plain(pickHeroImage({heroImageUrl:'bg-wide.jpg',heroImageMobileUrl:'bg-mobile.jpg',banner:bannerOnly.banner},false)),{src:'bg-wide.jpg',showCopy:true});
assert.deepEqual(plain(pickHeroImage({heroImageUrl:'bg-wide.jpg',heroImageMobileUrl:'bg-mobile.jpg',banner:bannerOnly.banner},true)),{src:'bg-mobile.jpg',showCopy:true});
assert.deepEqual(plain(pickHeroImage({heroImageUrl:'bg-wide.jpg',heroImageMobileUrl:null,banner:null},true)),{src:'bg-wide.jpg',showCopy:true},'mobile falls back to desktop');
assert.deepEqual(plain(pickHeroImage({heroImageUrl:null,heroImageMobileUrl:'bg-mobile.jpg',banner:null},false)),{src:'bg-mobile.jpg',showCopy:true},'desktop falls back to mobile');
assert.deepEqual(plain(pickHeroImage({heroImageMobileUrl:'',heroImageUrl:'',banner:bannerOnly.banner},false)),{src:'wide.jpg',showCopy:false},'empty strings count as missing; banner art hides the copy');
assert.deepEqual(plain(pickHeroImage(bannerOnly,true)),{src:'wide.jpg',showCopy:false},'banner fallback prefers the wide crop on every viewport');
assert.deepEqual(plain(pickHeroImage({banner:{id:'b',wideImageUrl:null,imageUrl:'sq.jpg'}},false)),{src:'sq.jpg',showCopy:false});
assert.deepEqual(plain(pickHeroImage({banner:{id:'b',wideImageUrl:null,imageUrl:null}},false)),{src:null,showCopy:true},'no artwork at all: nothing to hide the copy behind');
assert.deepEqual(plain(pickHeroImage({banner:null},false)),{src:null,showCopy:true});
assert.deepEqual(plain(pickHeroImage(null,false)),{src:null,showCopy:true});
console.log('PASS hero image choice: text-free art first, banner fallback hides the HTML copy');

assert.equal(DEFAULT_HERO_VIDEO,'/photos/hero-press.mp4');
assert.equal(pickHeroVideo({heroVideoUrl:'https://cdn.example.com/ganpati.mp4'}),'https://cdn.example.com/ganpati.mp4');
assert.equal(pickHeroVideo({heroVideoUrl:null}),'/photos/hero-press.mp4');
assert.equal(pickHeroVideo({heroVideoUrl:''}),'/photos/hero-press.mp4','empty string → default');
assert.equal(pickHeroVideo({heroVideoUrl:'   '}),'/photos/hero-press.mp4','whitespace → default');
assert.equal(pickHeroVideo({}),'/photos/hero-press.mp4','undefined → default');
assert.equal(pickHeroVideo(null),'/photos/hero-press.mp4');
console.log('PASS hero video: admin clip first, site care film otherwise');
