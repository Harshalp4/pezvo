const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict'), ts = require('typescript');
const code = ts.transpileModule(fs.readFileSync('src/lib/attribution.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const stored = new Map();
const window = {location:{search:'?utm_source=facebook&utm_campaign=care&phone=8828676480'},localStorage:{getItem:k=>stored.get(k),setItem:(k,v)=>stored.set(k,v),removeItem:k=>stored.delete(k)}};
const ctx={exports:{},window,URL,URLSearchParams,Date};vm.runInNewContext(code,ctx);
const {readCampaign,campaignFromSearch}=ctx.exports;
assert.equal(readCampaign(),'utm_source=facebook&utm_campaign=care');
window.location.search=''; assert.equal(readCampaign(),'utm_source=facebook&utm_campaign=care');
window.location.search='?utm_source=google&utm_content=shoe'; assert.equal(readCampaign(),'utm_source=google&utm_content=shoe');
assert.equal(campaignFromSearch('?utm_source=a%40b.com&utm_term=8828676480&secret=x'),'');
window.location.search='';stored.set('presso_campaign_v1',JSON.stringify({value:'utm_source=old',at:Date.now()-31*86400000}));assert.equal(readCampaign(),'');
window.localStorage.getItem=()=>{throw Error('blocked')};assert.equal(readCampaign(),'');
console.log('PASS attribution navigation, replacement, expiry, allowlist and unavailable storage');

const play = 'https://play.google.com/store/apps/details?id=com.presso.presso_app';
const tagged = new URL(ctx.exports.attributedPlayUrl(play, 'utm_source=instagram&utm_medium=organic_social&email=private'));
assert.equal(tagged.searchParams.get('referrer'), 'utm_source=instagram&utm_medium=organic_social');
assert.equal(ctx.exports.attributedPlayUrl('https://example.com', 'utm_source=x'), 'https://example.com');
console.log('PASS Play referrer encoding and destination restriction');

assert.equal(new URL(ctx.exports.attributedPlayUrl(tagged.toString(), '')).searchParams.has('referrer'), false);
const apple = 'https://apps.apple.com/app/id6780192938';
assert.equal(ctx.exports.attributedAppleUrl(apple, 'utm_source=ig', ''), apple);
const ios = new URL(ctx.exports.attributedAppleUrl(apple, 'utm_source=ig&utm_medium=social&utm_campaign=wk1', '123456'));
assert.equal(ios.searchParams.get('ct'), 'ig_social_wk1');
assert.equal(ios.searchParams.get('pt'), '123456');
assert.equal(ctx.exports.attributedAppleUrl('https://example.com', 'utm_source=ig', '123456'), 'https://example.com');
assert.equal(ctx.exports.attributedAppleUrl(apple, 'utm_campaign='+'a'.repeat(31), '123456'), apple);
console.log('PASS Apple token validation, campaign length and destination restriction');
