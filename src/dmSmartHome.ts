import { MachineConfig, send, Action, assign } from "xstate";

import { inspect } from '@xstate/inspect';
inspect({
  url: "https://statecharts.io/inspect",
  iframe: false
});

import { loadGrammar } from './runparser'
import { parse } from './chartparser'
import { grammar } from './grammars/homeGrammar.ts'

export const homeGrammar = (input: string) => {
    const gram = loadGrammar(grammar)
    const prs = parse(input.split(/\s+/), gram)
    const result = prs.resultsForRule(gram.$root)[0]
    const answer = "I " + result.request.action + " the " + result.request.object
    return answer
}

/*
const input = "turn off the light"
const prs = parse(input.split(/\s+/), gram)
const result = prs.resultsForRule(gram.$root)[0]
console.log(result)
*/

function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function listen(): Action<SDSContext, SDSEvent> {
    return send('LISTEN')
}

export const dmMachine: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: 'init',
    states: {
        init: {
            on: {
                CLICK: 'welcome'
            }
        },
	welcome: {
		initial: "prompt",
	    on: { ENDSPEECH: 'request' },
	    states: {
	    	prompt: { entry: say("What do you want me to do ?")},
	    }
	},
	request: {
	    initial: "prompt",
	    on: { 
	    	RECOGNISED: {
	    		actions: assign((context) => { return { directive: homeGrammar(context.recResult)} }),
				target: "answer",
			},
	    },
	    states: {
	    	prompt: { entry: listen() },
	    },
	},
	answer: {
		initial: "prompt",
	    on: { ENDSPEECH: 'init' },
	    states: {
	    	prompt: {
	    		entry: send((context) => ({
	    			type: "SPEAK",
	    			value: `Alright. ${context.directive}`
	    		}))
	    	}
	    },
	}
    }})