import {
  r,
  STANDARD_SCORE,
  showAfterSpecificChoice,
  showWithFixedScore,
  SENDER_CTO,
  indexOfChoice,
  DO_NOT_SHOW_SCORE,
} from "./shared";

function showSomeTimeAfterAllChoices(cardIds, optionIds, increasePerTurn) {
  return state => {
    let lastChoiceYouMade = cardIds.reduce((acc, cardId, index) => {
      if (acc < 0 && index != 0) return -1;
      
      let optionId = optionIds[index];
      const idx = indexOfChoice(state, cardId, optionId);
      if (idx < 0) return -1;
      
      if (idx > acc) {
        return idx;
      }
      
      return acc;
    }, -1);
    
    if (lastChoiceYouMade < 0) {
      return DO_NOT_SHOW_SCORE;
    }
    return (state.pastChoices.length - lastChoiceYouMade) * increasePerTurn;
  };
}

export default {
  moreDataOnBackend: {
    message: `
      So we'd like to add this really awesome new feature to our product, but it requires knowing a bit more about our users.
    `,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `Eh what kinds of data are we talking about here?`,
        reducers: {}
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  moreDataOnBackend_2: {
    message: `
      Oh we just need to know their deepest fears... and whether they're pooping or not.
      If that's not possible, we can get away with knowing their sexual preferences though.`,
    options: {
      yes: {
        message: `Oh yeah that's totally reasonable, what can go wrong, let's do it.`,
        reducers: {
          innovation: r(0.1),
          money: r(0.1),
          reputation: r(-0.1),
        },
      },
      no: {
        message: `No I think [insert something stupid about privacy], let's make our product worse.`,
        reducers: {
          reputation: r(0.1),
          money: r(0.1),
          innovation: r(-0.1)
        }
      }
    },
    getScore: showAfterSpecificChoice("moreDataOnBackend", "yes")
  },
  
  aiThatKnowsTooMuch: {
    getScore: showSomeTimeAfterAllChoices(["moreDataOnBackend", "innovationInvestorFlavorOfTheMonth_ai"], ["yes", "yes"], 0.3)
  }
}
