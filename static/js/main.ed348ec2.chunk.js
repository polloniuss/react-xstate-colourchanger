(this["webpackJsonpxstate-react-typescript-template"]=this["webpackJsonpxstate-react-typescript-template"]||[]).push([[0],{25:function(t,e,n){},36:function(t,e,n){"use strict";n.r(e);var a=n(23),o=n(11),r=(n(25),n(7),n(20)),s=n(41),i=n(4),c=n(40),l=n(39);function p(t){return Object(i.k)((e=>({type:"SPEAK",value:t})))}function u(){return Object(i.k)("LISTEN")}Object(l.a)({url:"https://statecharts.io/inspect",iframe:!1});const m={John:{person:"John Appleseed"},"meeting plant":{person:"Meeting"},Mary:{person:"Mary Orangeseed"},Dan:{person:"Dan Cherryseed"},Steve:{person:"Steve Strawberryseed"},Klaus:{person:"Klaus Pearseed"},Gus:{person:"Gus Bananaseed"},Jennifer:{person:"Jennifer Pineappleseed"},"on Monday":{day:"Monday"},"on Tuesday":{day:"Tuesday"},"on Wednesday":{day:"Wednesday"},"on Thursday":{day:"Thursday"},"on Friday":{day:"Friday"},"on Saturday":{day:"Saturday"},"on Sunday":{day:"Sunday"},"at eight":{time:"08:00"},"at nine":{time:"09:00"},"at ten":{time:"10:00"},"at eleven":{time:"11:00"},"at noon":{time:"12:00"},"at one":{time:"13:00"},"at two":{time:"14:00"},"at three":{time:"15:00"},"at four":{time:"16:00"},"at five":{time:"17:00"},"at six":{time:"18:00"},"at seven":{time:"19:00"},yes:{agree:"yes"},no:{refuse:"no"},"of course":{agree:"yes"},"no way":{refuse:"no"}},y={initial:"init",states:{init:{on:{CLICK:"welcome"}},welcome:{initial:"prompt",on:{ENDSPEECH:"who"},states:{prompt:{entry:p("Let's create an appointment")}}},who:{initial:"prompt",on:{RECOGNISED:[{cond:t=>"person"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({person:m[t.recResult].person}))),target:"day"},{target:".nomatch"}]},states:{prompt:{entry:p("Who are you meeting with?"),on:{ENDSPEECH:"ask"}},ask:{entry:u()},nomatch:{entry:p("Sorry I don't know them"),on:{ENDSPEECH:"prompt"}}}},day:{initial:"prompt",on:{RECOGNISED:[{cond:t=>"day"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({day:m[t.recResult].day}))),target:"duration"},{target:".nomatch"}]},states:{prompt:{entry:Object(i.k)((t=>({type:"SPEAK",value:"Ok. ${context.person}. On which day is your meeting?"}))),on:{ENDSPEECH:"ask"}},ask:{entry:u()},nomatch:{entry:p("Sorry I don't understand what you mean"),on:{ENDSPEECH:"prompt"}}}},duration:{initial:"prompt",on:{RECOGNISED:[{cond:t=>"agree"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({agree:m[t.recResult].agree}))),target:"confirmationWholeDay"},{cond:t=>"refuse"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({refuse:m[t.recResult].refuse}))),target:"time"},{target:".nomatch"}]},states:{prompt:{entry:p("Will it take the whole day?"),on:{ENDSPEECH:"ask"}},ask:{entry:u()},nomatch:{entry:p("Sorry I don't understand what you mean"),on:{ENDSPEECH:"prompt"}}}},time:{initial:"prompt",on:{RECOGNISED:[{cond:t=>"time"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({time:m[t.recResult].time}))),target:"regularConfirmation"},{target:".nomatch"}]},states:{prompt:{entry:p("What time is your meeting?"),on:{ENDSPEECH:"ask"}},ask:{entry:u()},nomatch:{entry:p("Sorry I don't understand what you mean"),on:{ENDSPEECH:"prompt"}}}},regularConfirmation:{initial:"prompt",on:{RECOGNISED:[{cond:t=>"agree"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({agree:m[t.recResult].agree}))),target:"confirmation"},{cond:t=>"refuse"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({refuse:m[t.recResult].refuse}))),target:"who"},{target:".nomatch"}]},states:{prompt:{entry:Object(i.k)((t=>({type:"SPEAK",value:"Do you want me to create an appointment with ${context.person} on ${context.date} at ${context.time} ?"}))),on:{ENDSPEECH:"ask"}},ask:{entry:u()},nomatch:{entry:p("Sorry I don't understand what you mean"),on:{ENDSPEECH:"prompt"}}}},confirmationWholeDay:{initial:"prompt",on:{RECOGNISED:[{cond:t=>"agree"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({agree:m[t.recResult].agree}))),target:"confirmation"},{cond:t=>"refuse"in(m[t.recResult]||{}),actions:Object(i.b)((t=>({refuse:m[t.recResult].refuse}))),target:"who"},{target:".nomatch"}]},states:{prompt:{entry:Object(i.k)((t=>({type:"SPEAK",value:"Do you want me to create an appointment with ${context.person} on ${context.date} for the whole day?"}))),on:{ENDSPEECH:"ask"}},ask:{entry:u()},nomatch:{entry:p("Sorry I don't understand what you mean"),on:{ENDSPEECH:"prompt"}}}},confirmation:{initial:"prompt",on:{ENDSPEECH:"init"},states:{prompt:{entry:p("Your appointment has been created!")}}}}};var d=n(19),g=n(12);Object(l.a)({url:"https://statecharts.io/inspect",iframe:!1});const E=Object(s.a)({id:"root",type:"parallel",states:{dm:Object(o.a)({},y),asrtts:{initial:"idle",states:{idle:{on:{LISTEN:"recognising",SPEAK:{target:"speaking",actions:Object(i.b)(((t,e)=>({ttsAgenda:e.value})))}}},recognising:{initial:"progress",entry:"recStart",exit:"recStop",on:{ASRRESULT:{actions:["recLogResult",Object(i.b)(((t,e)=>({recResult:e.value})))],target:".match"},RECOGNISED:"idle"},states:{progress:{},match:{entry:Object(i.k)("RECOGNISED")}}},speaking:{entry:"ttsStart",on:{ENDSPEECH:"idle"}}}}}},{actions:{recLogResult:t=>{console.log("<< ASR: "+t.recResult)},test:()=>{console.log("test")},logIntent:t=>{console.log("<< NLU intent: "+t.nluData.intent.name)}}}),b=t=>{switch(!0){case t.state.matches({asrtts:"recognising"}):return Object(g.jsx)("button",Object(o.a)(Object(o.a)({type:"button",className:"glow-on-hover",style:{animation:"glowing 20s linear"}},t),{},{children:"Listening..."}));case t.state.matches({asrtts:"speaking"}):return Object(g.jsx)("button",Object(o.a)(Object(o.a)({type:"button",className:"glow-on-hover",style:{animation:"bordering 1s infinite"}},t),{},{children:"Speaking..."}));default:return Object(g.jsx)("button",Object(o.a)(Object(o.a)({type:"button",className:"glow-on-hover"},t),{},{children:"Click to start"}))}};function h(){const t=Object(d.useSpeechSynthesis)({onEnd:()=>{u("ENDSPEECH")}}),e=t.speak,n=t.cancel,o=(t.speaking,Object(d.useSpeechRecognition)({onResult:t=>{u({type:"ASRRESULT",value:t})}})),r=o.listen,s=(o.listening,o.stop),i=Object(c.b)(E,{devTools:!0,actions:{recStart:Object(c.a)((()=>{console.log("Ready to receive a color command."),r({interimResults:!1,continuous:!0})})),recStop:Object(c.a)((()=>{console.log("Recognition stopped."),s()})),changeColour:Object(c.a)((t=>{console.log("Repainting..."),document.body.style.background=t.recResult})),ttsStart:Object(c.a)(((t,n)=>{console.log("Speaking..."),e({text:t.ttsAgenda})})),ttsCancel:Object(c.a)(((t,e)=>{console.log("TTS STOP..."),n()}))}}),l=Object(a.a)(i,3),p=l[0],u=l[1];l[2];return Object(g.jsx)("div",{className:"App",children:Object(g.jsx)(b,{state:p,onClick:()=>u("CLICK")})})}const S=document.getElementById("root");r.render(Object(g.jsx)(h,{}),S)}},[[36,1,2]]]);
//# sourceMappingURL=main.ed348ec2.chunk.js.map