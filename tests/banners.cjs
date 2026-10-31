const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict'), ts = require('typescript');
const code = ts.transpileModule(fs.readFileSync('src/lib/banners.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const stored = new Map();
const window = {sessionStorage:{getItem:k=>stored.get(k),setItem:(k,v)=>stored.set(k,v),removeItem:k=>stored.delete(k)}};
const ctx={exports:{},window,URL,process:{env:{}}};vm.runInNewContext(code,ctx);
const {pickBannerImage,bannerLink,bannerStorageKey,isBannerHidden,hideBanner}=ctx.exports;
const site='https://www.presso24.com';
// Objects built inside the VM have a foreign prototype, so compare by value.
const link=(b)=>{const l=bannerLink(b,site);return l&&{href:l.href,external:l.external};};

assert.equal(pickBannerImage({imageUrl:'sq',wideImageUrl:'wide'},'desktop'),'wide');
assert.equal(pickBannerImage({imageUrl:'sq',wideImageUrl:'wide'},'mobile'),'sq');
assert.equal(pickBannerImage({imageUrl:'sq',wideImageUrl:null},'desktop'),'sq');
assert.equal(pickBannerImage({imageUrl:null,wideImageUrl:'wide'},'mobile'),'wide');
assert.equal(pickBannerImage({imageUrl:null,wideImageUrl:null},'desktop'),null);
assert.equal(pickBannerImage({imageUrl:'',wideImageUrl:''},'mobile'),null);
console.log('PASS image choice for desktop and mobile with fallbacks');

assert.deepEqual(link({actionType:'url',actionValue:'https://www.presso24.com/pricing'}),{href:'https://www.presso24.com/pricing',external:false});
assert.deepEqual(link({actionType:'url',actionValue:'https://presso24.com/offers'}),{href:'https://presso24.com/offers',external:false});
assert.deepEqual(link({actionType:'url',actionValue:' https://instagram.com/presso '}),{href:'https://instagram.com/presso',external:true});
assert.equal(bannerLink({actionType:'url',actionValue:'http://presso24.com/pricing'},site),null);
assert.equal(bannerLink({actionType:'url',actionValue:'javascript:alert(1)'},site),null);
assert.equal(bannerLink({actionType:'url',actionValue:'/pricing'},site),null);
assert.equal(bannerLink({actionType:'url',actionValue:'https://'},site),null);
assert.equal(bannerLink({actionType:'url',actionValue:null},site),null);
assert.equal(bannerLink({actionType:'route',actionValue:'https://www.presso24.com/'},site),null);
assert.equal(bannerLink({actionType:'none',actionValue:'https://www.presso24.com/'},site),null);
assert.equal(bannerLink({actionType:'url',actionValue:'https://example.com'},'not a url').external,true);
console.log('PASS https-only links, same-site vs external, route/none ignored');

assert.equal(bannerStorageKey({id:'b1',version:3}),'presso_banner_hidden_b1_v3');
assert.notEqual(bannerStorageKey({id:'b1',version:3}),bannerStorageKey({id:'b1',version:4}));
assert.equal(isBannerHidden({id:'b1',version:3}),false);
hideBanner({id:'b1',version:3});
assert.equal(isBannerHidden({id:'b1',version:3}),true);
assert.equal(isBannerHidden({id:'b1',version:4}),false);
assert.equal(stored.get('presso_banner_hidden_b1_v3'),'1');
window.sessionStorage.getItem=()=>{throw Error('blocked')};window.sessionStorage.setItem=()=>{throw Error('blocked')};
assert.equal(isBannerHidden({id:'b1',version:3}),false);
assert.doesNotThrow(()=>hideBanner({id:'b2',version:1}));
console.log('PASS session-storage key per banner version and blocked storage');
