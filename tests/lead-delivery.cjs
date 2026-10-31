const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
const code=ts.transpileModule(fs.readFileSync('src/app/api/lead/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
async function run(body,{statuses=[],env={NEXT_PUBLIC_PEZVO_API_BASE_URL:'https://api.example.test',PEZVO_LEAD_WEBHOOK_URL:'https://hook.example.test'}}={}){
 const calls=[];const box={exports:{},require:()=>({NextResponse:{json:(body,options)=>({body,status:options?.status||200})}}),process:{env},AbortSignal,fetch:async(url,options)=>{calls.push({url,body:JSON.parse(options.body)});const status=statuses[calls.length-1];if(status==='throw')throw Error('Network failure');return {ok:status===true};}};
 vm.runInNewContext(code,box);return {result:await box.exports.POST({json:async()=>body}),calls};
}
(async()=>{const valid={name:'Synthetic test',phone:'9000000000',pincode:'400706',service:'Steam Press',preferredSlot:'Evening',source:'pricing'};
 let r=await run(valid,{statuses:[true]});assert.equal(r.result.body.via,'api');assert.equal(r.calls[0].url,'https://api.example.test/api/leads');assert.equal(r.calls[0].body.preferredSlot,'Evening');assert.equal(r.calls[0].body.service,'Steam Press');assert.equal(r.calls[0].body.phone,'9000000000');
 r=await run(valid,{statuses:[false,true]});assert.equal(r.result.body.via,'webhook');assert.match(r.calls[1].body.text,/PEZVO/);
 assert.equal((await run(valid,{statuses:['throw',true]})).result.body.via,'webhook');assert.equal((await run(valid,{statuses:[false,false]})).result.status,502);
 r=await run(valid,{env:{}});assert.equal(r.result.status,503);assert.equal(r.calls.length,0);assert.equal(r.result.body.ok,false);
 for(const body of [null,[],{name:123,phone:'9000000000'},{...valid,name:''},{...valid,phone:'bad'},{...valid,pincode:'400'},{...valid,notes:'a'.repeat(2001)}]){r=await run(body);assert.equal(r.result.status,400);assert.equal(r.calls.length,0);}
 r=await run({...valid,hp:'bot'});assert.equal(r.calls.length,0);assert.equal(r.result.status,200);
 console.log('PASS lead API: preserved payload, primary and fallback delivery, network failure, honest offline mode, malformed values, pincode and honeypot. All requests mocked.');
})().catch(e=>{console.error(e);process.exit(1);});
