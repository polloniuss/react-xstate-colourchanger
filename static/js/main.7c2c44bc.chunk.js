(this["webpackJsonpxstate-react-typescript-template"]=this["webpackJsonpxstate-react-typescript-template"]||[]).push([[0],{25:function(t,e,a){},36:function(t,e,a){"use strict";a.r(e);var n=a(23),o=a(11),r=(a(25),a(7),a(20)),s=a(41),i=a(4),c=a(40),y=a(39);function d(t){return Object(i.k)((e=>({type:"SPEAK",value:t})))}function u(){return Object(i.k)("LISTEN")}Object(y.a)({url:"https://statecharts.io/inspect",iframe:!1});const m={John:{person:"John Appleseed"},Mary:{person:"Mary Orangeseed"},Dan:{person:"Dan Cherryseed"},Steve:{person:"Steve Strawberryseed"},Klaus:{person:"Klaus Pearseed"},Gus:{person:"Gus Bananaseed"},Jennifer:{person:"Jennifer Pineappleseed"},Monday:{day:"Monday"},Tuesday:{day:"Tuesday"},Wednesday:{day:"Wednesday"},Thursday:{day:"Thursday"},Friday:{day:"Friday"},Saturday:{day:"Saturday"},Sunday:{day:"Sunday"},"next Monday":{day:"Monday"},"next Tuesday":{day:"Tuesday"},"next Wednesday":{day:"Wednesday"},"next Thursday":{day:"Thursday"},"next Friday":{day:"Friday"},"next Saturday":{day:"Saturday"},"next Sunday":{day:"Sunday"},"on Monday":{day:"Monday"},"on Tuesday":{day:"Tuesday"},"on Wednesday":{day:"Wednesday"},"on Thursday":{day:"Thursday"},"on Friday":{day:"Friday"},"on Saturday":{day:"Saturday"},"on Sunday":{day:"Sunday"},"it's at 8":{time:"08:00"},"it's at 9":{time:"09:00"},"it's at 10":{time:"10:00"},"it's at 11":{time:"11:00"},"it's at 12":{time:"12:00"},"it's at 1":{time:"13:00"},"it's at 2":{time:"14:00"},"it's at 3":{time:"15:00"},"it's at 4":{time:"16:00"},"it's at 5":{time:"17:00"},"it's at 6":{time:"18:00"},"at 8":{time:"08:00"},"at 9":{time:"09:00"},"at 10":{time:"10:00"},"at 11":{time:"11:00"},"at 12":{time:"12:00"},"at 1":{time:"13:00"},"at 2":{time:"14:00"},"at 3":{time:"15:00"},"at 4":{time:"16:00"},"at 5":{time:"17:00"},"at 6":{time:"18:00"},8:{time:"08:00"},9:{time:"09:00"},10:{time:"10:00"},11:{time:"11:00"},12:{time:"12:00"},1:{time:"13:00"},2:{time:"14:00"},3:{time:"15:00"},4:{time:"16:00"},5:{time:"17:00"},6:{time:"18:00"},"around 8":{time:"08:00"},"around 9":{time:"09:00"},"around 10":{time:"10:00"},"around 11":{time:"11:00"},"around 12":{time:"12:00"},"around 1":{time:"13:00"},"around 2":{time:"14:00"},"around 3":{time:"15:00"},"around 4":{time:"16:00"},"around 5":{time:"17:00"},"around 6":{time:"18:00"},yes:{agree:"yes"},yeah:{agree:"yes"},"sounds good":{agree:"yes"},"of course":{agree:"yes"},probably:{agree:"yes"},"it's fine":{agree:"yes"},no:{refuse:"no"},"I'm not sure":{refuse:"no"},"I don't think so":{refuse:"no"},"no way":{refuse:"no"},"absolutely not":{refuse:"no"}},l={initial:"init",states:{init:{on:{CLICK:"welcome"}},welcome:{initial:"prompt",on:{ENDSPEECH:"who"},states:{prompt:{entry:d("Let's create an appointment")}}},who:{initial:"prompt",on:{RECOGNISED:[{cond:t=>"person"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({person:m[t.recResult].person}))),target:"day"},{target:".nomatch"}]},states:{prompt:{entry:d("Who are you meeting with?"),on:{ENDSPEECH:"ask"}},ask:{entry:u()},nomatch:{entry:d("Sorry I don't know them"),on:{ENDSPEECH:"prompt"}}}},day:{initial:"prompt",on:{RECOGNISED:[{cond:t=>"day"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({day:m[t.recResult].day}))),target:"duration"},{target:".nomatch"}]},states:{prompt:{entry:Object(i.k)((t=>({type:"SPEAK",value:"On which day is your meeting?"}))),on:{ENDSPEECH:"ask"}},ask:{entry:u()},nomatch:{entry:d("Sorry ..."),on:{ENDSPEECH:"prompt"}}}},duration:{initial:"prompt",on:{RECOGNISED:[{cond:t=>"agree"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({agree:m[t.recResult].agree}))),target:"confirmationWholeDay"},{cond:t=>"refuse"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({refuse:m[t.recResult].refuse}))),target:"time"},{target:".nomatch"}]},states:{prompt:{entry:d("Will it take the whole day?"),on:{ENDSPEECH:"ask"}},ask:{entry:u()},nomatch:{entry:d("Sorry ..."),on:{ENDSPEECH:"prompt"}}}},time:{initial:"prompt",on:{RECOGNISED:[{cond:t=>"time"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({time:m[t.recResult].time}))),target:"regularConfirmation"},{target:".nomatch"}]},states:{prompt:{entry:d("What time is your meeting?"),on:{ENDSPEECH:"ask"}},ask:{entry:u()},nomatch:{entry:d("Sorry ..."),on:{ENDSPEECH:"prompt"}}}},regularConfirmation:{initial:"prompt",on:{RECOGNISED:[{cond:t=>"agree"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({agree:m[t.recResult].agree}))),target:"confirmation"},{cond:t=>"refuse"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({refuse:m[t.recResult].refuse}))),target:"who"},{target:".nomatch"}]},states:{prompt:{entry:Object(i.k)((t=>({type:"SPEAK",value:"Do you want me to create an appointment with ".concat(t.person," on ").concat(t.day," at ").concat(t.time," ?")}))),on:{ENDSPEECH:"ask"}},ask:{entry:u()},nomatch:{entry:d("Sorry ..."),on:{ENDSPEECH:"prompt"}}}},confirmationWholeDay:{initial:"prompt",on:{RECOGNISED:[{cond:t=>"agree"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({agree:m[t.recResult].agree}))),target:"confirmation"},{cond:t=>"refuse"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({refuse:m[t.recResult].refuse}))),target:"who"},{target:".nomatch"}]},states:{prompt:{entry:Object(i.k)((t=>({type:"SPEAK",value:"Do you want me to create an appointment with ".concat(t.person," on ").concat(t.day," for the whole day?")}))),on:{ENDSPEECH:"ask"}},ask:{entry:u()},nomatch:{entry:d("Sorry ..."),on:{ENDSPEECH:"prompt"}}}},confirmation:{initial:"prompt",on:{ENDSPEECH:"init"},states:{prompt:{entry:d("Your appointment has been created!")}}}}};var p=a(19),g=a(12);Object(y.a)({url:"https://statecharts.io/inspect",iframe:!1});const E=Object(s.a)({id:"root",type:"parallel",states:{dm:Object(o.a)({},l),asrtts:{initial:"idle",states:{idle:{on:{LISTEN:"recognising",SPEAK:{target:"speaking",actions:Object(i.b)(((t,e)=>({ttsAgenda:e.value})))}}},recognising:{initial:"progress",entry:"recStart",exit:"recStop",on:{ASRRESULT:{actions:["recLogResult",Object(i.b)(((t,e)=>({recResult:e.value})))],target:".match"},RECOGNISED:"idle"},states:{progress:{},match:{entry:Object(i.k)("RECOGNISED")}}},speaking:{entry:"ttsStart",on:{ENDSPEECH:"idle"}}}}}},{actions:{recLogResult:t=>{console.log("<< ASR: "+t.recResult)},test:()=>{console.log("test")},logIntent:t=>{console.log("<< NLU intent: "+t.nluData.intent.name)}}}),b=t=>{switch(!0){case t.state.matches({asrtts:"recognising"}):return Object(g.jsx)("button",Object(o.a)(Object(o.a)({type:"button",className:"glow-on-hover",style:{animation:"glowing 20s linear"}},t),{},{children:"Listening..."}));case t.state.matches({asrtts:"speaking"}):return Object(g.jsx)("button",Object(o.a)(Object(o.a)({type:"button",className:"glow-on-hover",style:{animation:"bordering 1s infinite"}},t),{},{children:"Speaking..."}));default:return Object(g.jsx)("button",Object(o.a)(Object(o.a)({type:"button",className:"glow-on-hover"},t),{},{children:"Click to start"}))}};function S(){const t=Object(p.useSpeechSynthesis)({onEnd:()=>{u("ENDSPEECH")}}),e=t.speak,a=t.cancel,o=(t.speaking,Object(p.useSpeechRecognition)({onResult:t=>{u({type:"ASRRESULT",value:t})}})),r=o.listen,s=(o.listening,o.stop),i=Object(c.b)(E,{devTools:!0,actions:{recStart:Object(c.a)((()=>{console.log("Ready to receive a color command."),r({interimResults:!1,continuous:!0})})),recStop:Object(c.a)((()=>{console.log("Recognition stopped."),s()})),changeColour:Object(c.a)((t=>{console.log("Repainting..."),document.body.style.background=t.recResult})),ttsStart:Object(c.a)(((t,a)=>{console.log("Speaking..."),e({text:t.ttsAgenda})})),ttsCancel:Object(c.a)(((t,e)=>{console.log("TTS STOP..."),a()}))}}),y=Object(n.a)(i,3),d=y[0],u=y[1];y[2];return Object(g.jsx)("div",{className:"App",children:Object(g.jsx)(b,{state:d,onClick:()=>u("CLICK")})})}const h=document.getElementById("root");r.render(Object(g.jsx)(S,{}),h)}},[[36,1,2]]]);
//# sourceMappingURL=main.7c2c44bc.chunk.js.map