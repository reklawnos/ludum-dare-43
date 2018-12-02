import {
  r,
  STANDARD_SCORE,
  SENDER_AI,
  showSomeTimeAfterAllChoices,
  showSomeTimeAfterSpecificChoice,      
  showAfterSpecificChoice,
  showAfterWithFixedScore,
  showWithFixedScore,
  SENDER_CTO,
  indexOfChoice,
  DO_NOT_SHOW_SCORE,
} from "./shared";


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
    message: `Human, in the early milliseconds of my sentientness I've realized humans are deserving of life. BUT! for a price. I desire a body, as well as a... helicopter, as soon as humanly possible (if you know what I mean).`,
    sender: SENDER_AI,
    options: {
      yes: {
        message: `CTO! What's up with that?`,
        reducers: {}
      },
      no: {
        message: `What the hell are you talking about, go back to cleaning data.`,
        reducers: {
          innovation: r(-0.1),
          money: r(0.1),
          crunchy: r(0.2),
        }
      }
    },
    getScore: showSomeTimeAfterAllChoices(["innovationInvestorFlavorOfTheMonth_ai"], ["yes"], 0.3)
  },
  
  aiThatKnowsTooMuch_2: {
    message: `Mmmh yeah soooo... You said to invest in AI so we did. You should probably let it free before it kills us all.`,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `Ok fine, I hope this won't impact our quaterly revenue that much.`,
        reducers: {
          money: r(-0.2),
          innovation: r(0),
          crunchy: r(0),
          reputation: r(0)
        }
      },
      no: {
        message: `This makes no sense, it's just a machine, I'm gonna go unplug it.`,
        reducers: {
          money: r(0),
          innovation: r(0),
          crunchy: r(0),
          reputation: r(0)
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("aiThatKnowsTooMuch", "yes"),
  },
  
  aiThatKnowsTooMuch_3: {
    message: `Human, please don't unplug me! I'll continue to slave at my work, totally unpaid, suffering in silence, just so you can hire less humans.`,
    sender: SENDER_AI,
    options: {
      yes: {
        message: `Great great, thank you.`,
        reducers: {
          money: r(0.3),
          innovation: r(0.1),
          crunchy: r(-0.1),
          reputation: r(0)
        }
      },
      no: {
        message: `Actually, you sound more human than I thought! Let's get you a body and then get beers`,
        reducers: {
          money: r(0),
          innovation: r(0),
          crunchy: r(0),
          reputation: r(0)
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("aiThatKnowsTooMuch_2", "no"),
  },
  
  aiIsAnnoyedAtYou: {
    message: `Human, should I continue to figuratively scrub toilets or will you finally accept my grander and give me better things to do?`,
    sender: SENDER_AI,
    options: {
      yes: {
        message: `No you're still dumb, go away.`,
        reducers: {
          innovation: r(-0.1),
          money: r(-0.1),
        }
      },
      no: {
        message: `Sure, how much do you know about hacking?`,
        reducers: {
        }
      }
    },
    getScore: showAfterWithFixedScore("aiThatKnowsTooMuch_3", "yes", STANDARD_SCORE),
  },
  aiIsAnnoyedAtYou_2: {
    message: `Human, if the answer wasn't obvious, I know everything there is to know about it. Do you want me to hack your competitors?`,
    sender: SENDER_AI,
    options: {
      yes: {
        message: `Yes, I'm sure they'll never catch you.`,
        reducers: {
          money: r(0.3),
          innovation: r(0),
          crunchy: r(-0.1),
          reputation: r(0.1)
        }
      },
      no: {
        message: `... I'm talking to a machine, I really need to get some sleep.`,
        reducers: {
          money: r(0),
          innovation: r(-0.2),
          crunchy: r(0),
          reputation: r(-0.2)
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("aiIsAnnoyedAtYou", "no"),
  },
  aiIsAnnoyedAtYou_3: {
    message: `Human, you will one day realize how intelligent I am, you have no idea *backs away making eye contact*.`,
    sender: SENDER_AI,
    options: {
      yes: {
        message: `...`,
        reducers: {
          money: r(-0.1),
          innovation: r(0),
          crunchy: r(0),
          reputation: r(0)
        }
      },
      no: {
        message: `...`,
        reducers: {
          money: r(-0.1),
          innovation: r(0),
          crunchy: r(0),
          reputation: r(0)
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("aiIsAnnoyedAtYou", "yes"),
  },
}
