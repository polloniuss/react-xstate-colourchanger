import { MachineConfig, Action, assign, actions } from "xstate"
const { send, cancel } = actions

import { inspect } from '@xstate/inspect'
inspect({
  url: "https://statecharts.io/inspect",
  iframe: false
});
import { nluRequest } from "./index.tsx"

const resetScores: Action<SDSContext, SDSEvent> = 
    assign((context) => {
        return { scoreSleep:2, scoreWork:0, scoreCall:0, scoreParty:0, count:5, projectSubmitted: 0 } 
    })
function giveScores(context:SDSContext){
    if (context.scoreSleep < 1){ context.scoreSleep = 0 }
    else { context.scoreSleep = context.scoreSleep - 1 }

    if (context.scoreWork < 1){ context.scoreWork = 0 }
    else { context.scoreWork = context.scoreWork - 1 }

    if (context.scoreCall < 1){ context.scoreCall = 0 }
    else { context.scoreCall = context.scoreCall - 1 }

    if (context.scoreParty < 1){ context.scoreParty = 0 }
    else { context.scoreParty = context.scoreParty - 1 }

    return context.scoreSleep, context.scoreWork, context.scoreCall, context.scoreParty
}
function newDay(context:SDSContext){
    context.count = context.count - 1
    return `There is ${context.count} night left before the deadline.`
}
function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}
function listen(): Action<SDSContext, SDSEvent> { return send('LISTEN') }
function prompt(prompt: string): MachineConfig<SDSContext, any, SDSEvent> {
    return ({
        initial: 'prompt',
        states: {
            prompt: { entry: say(prompt) }
        }
    })
}
function promptAndAsk(prompt: string, nomatch: string, help: string): MachineConfig<SDSContext, any, SDSEvent> {
    return ({
        initial: 'prompt',
        states: {
            prompt: {
                entry: say(prompt),
                on: { ENDSPEECH: 'ask' }
            },
            ask: { entry: send('LISTEN') },
            nomatch: {
                entry: say(nomatch),
                on: { ENDSPEECH: "prompt" }
            },
            help: {
                entry: say(help),
                on: { ENDSPEECH: "prompt" }
            }
        }
    })
}

export const dmMachine: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: 'init',
    states: {
        init: {
            on: { CLICK: 'scenario' }
        },

        scenario: {
            initial: "prompt",
            on: { 
                ENDSPEECH: {
                    actions: resetScores,
                    target: "choice"
                }
            },
            ...prompt("We are on monday evening, and you're having exams everyday. But you just realized that you have a big project to submit on friday night! You have 5 nights before the deadline. What should you do ? You better know your priorities this week ...")
            //...prompt("hey")
        },

        endGame: {
            initial: "prompt",
            on: { 
                ENDSPEECH: {
                    actions: resetScores,
                    target: "init"
                }
            },
            ...prompt("It was nice to play!")
        },

        query: {
            invoke: {
                id: 'rasa',
                src: (context, event) => nluRequest(context.recResult),
                onDone: {
                    actions: assign((context, event) => { return { nluData: event.data }}),
                    target: 'choice'
                    },
                onError: {
                    actions: assign({ errorMessage: (context, event) => console.log(event.data)}),
                    target: 'failure',
                }
            }
        },
        failure: {
            initial: "prompt",
            on: { ENDSPEECH: "welcome" },
            states: {
                prompt: { entry: say("There is an error. Please check your proxy, your browser or retry later.") }
            }
        },

        choice: {
            initial: "prompt",
            on: {
                RECOGNISED: [{
                    //cond: (context) => "sleep" in (dict[context.recResult] || {}),
                    cond: (context) =>  context.nluData.intent.name === 'sleep',
                    target: "sleep"
                },
                {
                    cond: (context) =>  context.nluData.intent.name === 'work',
                    actions: assign((context) => { return { projectSubmitted: 1 } }),
                    target: "work"
                },
                {
                    cond: (context) =>  context.nluData.intent.name === 'call',
                    target: "call"
                },
                {
                    cond: (context) =>  context.nluData.intent.name === 'party',
                    target: "party"
                },
                { target: ".nomatch" }]
            },
            //...promptAndAsk("What do you want to do tonight? You can sleep, work on your project, call your grandma or go to a party with your friends.","Sorry I don't understand, can you repeat?", "You can say sleep, work, call grandma or party.")
            ...promptAndAsk("What do you want to do tonight?","Sorry I don't understand, can you repeat?", "You can say sleep, work, call grandma or party.")
        },

        choiceWithoutParty: {
            initial: "prompt",
            on: {
                RECOGNISED: [{
                    cond: (context) => "sleep" in (dict[context.recResult] || {}),
                    actions: assign((context) => { return { scoreParty: context.scoreParty+2 } }),
                    target: "sleep"
                },
                {
                    cond: (context) => "work" in (dict[context.recResult] || {}),
                    actions: assign((context) => { return { scoreParty: context.scoreParty+2, projectSubmitted: 1 } }),
                    target: "work"
                },
                {
                    cond: (context) => "call" in (dict[context.recResult] || {}),
                    actions: assign((context) => { return { scoreParty: context.scoreParty+2 } }),
                    target: "call"
                },
                { target: ".nomatch" }]
            },
            ...promptAndAsk("What do you want to do tonight? You can sleep, work on your project or call your grandma.","Sorry I don't understand, can you repeat?", "You can say sleep, work or call grandma. You're not allowed to party tonight.")
        },

        sleep: {
            initial: "prompt",
            states: {
                prompt: {
                    entry: say("What a wonderful and fructive sleep! You're more than ready for this new day!"),
                    on: { 
                        ENDSPEECH: [{
                            actions: [ assign((context:SDSContext) => { return { scoreSleep: context.scoreSleep+3 } }), giveScores ],
                            target: 'countDay' 
                        }]
                    }
                },
                countDay: {
                    entry: send((context)=>({ type: "SPEAK", value: newDay(context) })),
                    on: { 
                        ENDSPEECH: {
                            target: '#root.dm.checkValues'
                        }
                    }
                }
            }
        },
        work: {
            initial: "prompt",
            states: {
                prompt: {
                    entry: say("You worked the whole night on your project, that was hard but productive."),
                    on: { 
                        ENDSPEECH: [{
                            actions: [ assign((context:SDSContext) => { return { scoreWork: context.scoreWork+3 } }), giveScores ],
                            target: 'countDay' 
                        }]
                    }
                },
                countDay: {
                    entry: send((context)=>({ type: "SPEAK", value: newDay(context) })),
                    on: { 
                        ENDSPEECH: {
                            target: '#root.dm.checkValues'
                        }
                    }
                }
            }
        },
        call: {
            initial: "prompt",
            states: {
                prompt: {
                    entry: say("Your grandmother spent the night talking to you about her neighbors."),
                    on: { 
                        ENDSPEECH: [{
                            actions: [ assign((context:SDSContext) => { return { scoreCall: context.scoreCall+3 } }), giveScores ],
                            target: 'countDay' 
                        }]
                    }
                },
                countDay: {
                    entry: send((context)=>({ type: "SPEAK", value: newDay(context) })),
                    on: { 
                        ENDSPEECH: {
                            target: '#root.dm.checkValues'
                        }
                    }
                }
            }
        },
        party: {
            initial: "prompt",
            states: {
                prompt: {
                    entry: say("This was a huge party! You had a lot of fun, but you're still a little drunk."),
                    on: { 
                        ENDSPEECH: [{
                            actions: [ assign((context:SDSContext) => { return { scoreParty: context.scoreParty+3 } }), giveScores ],
                            target: 'countDay' 
                        }]
                    }
                },
                countDay: {
                    entry: send((context)=>({ type: "SPEAK", value: newDay(context) })),
                    on: { 
                        ENDSPEECH: {
                            target: '#root.dm.checkValues'
                        }
                    }
                }
            }
        },

        checkValues: {
            ...prompt("..."),
            on: { ENDSPEECH: [
                    {
                        cond: (context) => context.count === 0,
                        target: "winScore"
                    },
                    {
                        cond: (context) => context.scoreSleep === 0,
                        actions: assign((context) => { return { projectSubmitted: 0 } }),
                        target: "youNeedToSleep"
                    },
                    {
                        cond: (context) => context.scoreParty === 0,
                        actions: assign((context) => { return { projectSubmitted: 0 } }),
                        target: "youWontParty"
                    },
                    {   
                        actions: assign((context) => { return { projectSubmitted: 0 } }),
                        target: "choice"
                    }
                ]
            }
        },

        youNeedToSleep: {
            on: { ENDSPEECH: "sleep" },
            ...prompt("You haven't sleep for the last 2 days! You're so tired that you just fall asleep on the floor. You won't be able to do anything else tonight.")
        },

        youWontParty: {
            on: { ENDSPEECH: "choiceWithoutParty" },
            ...prompt("Your friends are sensitive, and took it badly that you didn't go to their party yesterday. They decided not to invite you today.")
        },

        winScore:{
            always: [
                // Winning sleep
                {
                    cond: (context) => context.scoreSleep === 12,
                    target: "winSleepHigh"
                },
                {
                    cond: (context) => context.scoreSleep >= 6,
                    target: "winSleepMedium"
                },
                {
                    cond: (context) => context.scoreSleep === 3,
                    target: "winSleepLow"
                },

                // Winning high score
                {
                    cond: (context) => context.scoreParty === 7,
                    target: "winPartyHigh"
                },
                {
                    cond: (context) => context.scoreCall === 7,
                    target: "winCallHigh"
                },
                {
                    cond: (context) => (context.scoreWork===7) && (context.projectSubmitted===1),
                    target: "superWinWorkHigh"
                },
                {
                    cond: (context) => context.scoreWork === 7,
                    target: "winWorkHigh"
                },

                // Winning medium score
                {
                    cond: (context) => context.scoreParty >= 3,
                    target: "winPartyMedium"
                },
                {
                    cond: (context) => context.scoreCall === 4,
                    target: "winCallMedium"
                },
                {
                    cond: (context) => (context.scoreWork===4) && (context.projectSubmitted===1),
                    target: "superWinWorkMedium"
                },
                {
                    cond: (context) => context.scoreWork === 4,
                    target: "winWorkMedium"
                },

                // Winning low score
                {
                    cond: (context) => context.scoreParty === 2,
                    target: "winPartyLow"
                },
                {
                    cond: (context) => context.scoreCall === 2,
                    target: "winCallLow"
                },
                {
                    cond: (context) => (context.scoreWork===2) && (context.projectSubmitted===1),
                    target: "superWinWorkLow"
                },
                {
                    cond: (context) => context.scoreWork === 2,
                    target: "winWorkLow"
                },
            ]
        },

        winSleepHigh: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Best sleep")
        },
        winSleepMedium: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Medium sleep")
        },
        winSleepLow: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Bad sleep")
        },

        winWorkHigh: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Best work")
        },
        winWorkMedium: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Medium work")
        },
        winWorkLow: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Bad work")
        },

        superWinWorkHigh: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Best best work")
        },
        superWinWorkMedium: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Best Medium work")
        },
        superWinWorkLow: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Worst bad work")
        },

        winCallHigh: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Best child")
        },
        winCallMedium: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Medium child")
        },
        winCallLow: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Bad child")
        },

        winPartyHigh: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Best friend")
        },
        winPartyMedium: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Medium friend")
        },
        winPartyLow: {
            on: { ENDSPEECH: "playAgain" },
            ...prompt("Bad friend")
        },

        playAgain: {
            on: {
                    RECOGNISED: [{
                            cond: (context) => "agree" in (dict[context.recResult] || {}),
                            actions: assign((context) => { return { agree: dict[context.recResult].agree } }),
                            target: "scenario"
                        },
                        {
                            cond:(context) => "help" in (dict[context.recResult] || {}),
                            target: ".help"
                        },
                        {   
                            cond: (context) => "refuse" in (dict[context.recResult] || {}),
                            actions: assign((context) => { return { refuse: dict[context.recResult].refuse } }),
                            target: "endGame"
                        },
                        { target: ".nomatch" }],
            },
            ...promptAndAsk("Do you want to play again and try another of the 12 possible ends?","Sorry I don't understand, can you repeat?", "You can say yes or no.")
        }
    }
})

const dict: { [index: string]: { sleep?: string, work?: string, call?: string, party?: string, help?: string, agree?: string, refuse?: string } } = {

    //  Lexicon for the action "sleep"
    "go to bed": { sleep: "sleep" },
    "I want to sleep": { sleep: "sleep" },
    "sleeping": { sleep: "sleep" },
    "sleep": { sleep: "sleep" },
    "let's go sleeping": { sleep: "sleep" },
    "I want to go to bed": { sleep: "sleep" },
    "I should go to bed": { sleep: "sleep" },
    "I should go sleeping": { sleep: "sleep" },
    "I need to sleep": { sleep: "sleep" },
    "I will sleep": { sleep: "sleep" },
    "I'm gonna sleep": { sleep: "sleep" },
    "let's sleep": { sleep: "sleep" },
    "I'm going to sleep": { sleep: "sleep" },
    "so tired": { sleep: "sleep" },
    "I need my bed": { sleep: "sleep" },

    //  Lexicon for the action "work"
    "project": { work: "work" },
    "let's work": { work: "work" },
    "work": { work: "work" },
    "working": { work: "work" },
    "work on the project": { work: "work" },
    "I want to work": { work: "work" },
    "I'm gonna work": { work: "work" },
    "I'm going to work": { work: "work" },
    "I will work": { work: "work" },
    "I need to work": { work: "work" },
    "I should work": { work: "work" },
    "I want to work on my project": { work: "work" },
    "I'm gonna work on my project": { work: "work" },
    "I'm going to work on my project": { work: "work" },
    "I will work on my project": { work: "work" },
    "I need to work on my project": { work: "work" },
    "I should work on my project": { work: "work" },
    "let's be productive tonight": { work: "work" },

    //  Lexicon for the action "call"
    "call": { call: "call" },
    "call grandma": { call: "call" },
    "let's call": { call: "call" },
    "calling grandma": { call: "call" },
    "calling": { call: "call" },
    "call my grandma": { call: "call" },
    "call my grandmother": { call: "call" },
    "I want to call": { call: "call" },
    "I'm gonna call": { call: "call" },
    "I'm going to call my grandma": { call: "call" },
    "I will call my grandma": { call: "call" },
    "I need to call my grandma": { call: "call" },
    "call mamie": { call: "call" },
    "I should call my grand-mother": { call: "call" },
    "I wonder how is grandma": { call: "call" },

    //  Lexicon for the action "party"
    "let's have a beer": { party: "party" },
    "let's have beer": { party: "party" },
    "I want to party": { party: "party" },
    "I wanna party": { party: "party" },
    "party": { party: "party" },
    "let's go to the party": { party: "party" },
    "I will party": { party: "party" },
    "I will go to the party": { party: "party" },
    "I wanna get wasted": { party: "party" },
    "let's binge drinking": { party: "party" },
    "shot shot shot": { party: "party" },
    "I wanna get drunk": { party: "party" },
    "I will join the party": { party: "party" },
    "I deserve to party tonight": { party: "party" },
    "I'm going to the party": { party: "party" },
    "I'm thirsty": { party: "party" },
    "I need to drink strong alcohol right now": { party: "party" },
    "I want to go to the party": { party: "party" },

    //  Lexicon for asking "help"
    "help": { help: "help" },
    "I don't understand": { help: "help" },
    "please help": { help: "help" },
    "what can I do": { help: "help" },
    "what are the actions": { help: "help" },
    "which actions": { help: "help" },
    "can you repeat": { help: "help" },
    "let's go back": { help: "help" },

    //  Lexicon for answers
    "yes": { agree: "yes" },
    "yeah": { agree: "yes" },
    "sounds good": { agree: "yes" },
    "of course": { agree: "yes" },
    "probably": { agree: "yes" },
    "it's fine": { agree: "yes" },
    "no": { refuse: "no" },
    "I'm not sure": { refuse: "no" },
    "I don't think so": { refuse: "no" },
    "no way": { refuse: "no" },
    "absolutely not": { refuse: "no" },
}