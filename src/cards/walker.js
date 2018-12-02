import {
  STANDARD_SCORE,
  SENDER_CTO,
  SENDER_CHEF,
  SENDER_INVESTOR_INNOVATION,
  showSomeTimeAfterSpecificChoice,
  showWithFixedScore,
} from "./shared";

export default {
  employeeMeatProblems_1: {
    message: `
      Employees are upset that our cafe serves too much meat. What should we do?
    `,
    sender: SENDER_CHEF,
    options: {
      meatlessMonday: {
        message: `We need to save the planet, let's do Meatless Mondays!`,
        reducers: {
          money: val => val - 0.2,
          crunchy: val => val + 0.3,
          reputation: val => val - 0.1,
        },
      },
      no: {
        message: `Psh, let them eat meat.`,
        reducers: {
          crunchy: val => val - 0.2,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  employeeMeatProblems_2: {
    message: `
      Hey, you remember Meatless Monday? Turns out some employees
      are claiming to be allergic to not-meat. What should we do?
    `,
    sender: SENDER_CHEF,
    options: {
      cancelMeatlessMonday: {
        message: `Cancel Meatless Monday, of course!`,
        reducers: {
          crunchy: val => val + 0.3,
          reputation: val => val - 0.1,
        },
      },
      keepMeatlessMonday: {
        message: `Hmm, I was feeling particularly carnivorous today...`,
        reducers: {
          reputation: val => val + 0.1,
          crunchy: val => val - 0.4,
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice('employeeMeatProblems_1', 'meatlessMonday', 0.1),
  },

  weWantMoreMonitors: {
    message: `
      Hey, some engineers are complaining that our competitor lets their employees
      have three monitors at their desks instead of our measly two. What should we do?
    `,
    sender: SENDER_CTO,
    options: {
      moreMonitors: {
        message: `You know what, let's give all of 'em FOUR monitors!`,
        reducers: {
          money: val => val - 0.3,
          innovation: val => val + 0.3,
        },
      },
      no: {
        message: `They can make due.`,
        reducers: {
          innovation: val => val - 0.2,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  innovationInvestorFlavorOfTheMonth_electricCars: {
    message: `
      Yoooo so we should really get into that electric car game, it's the wave of the future!
    `,
    sender: SENDER_INVESTOR_INNOVATION,
    options: {
      yes: {
        message: `Yeah, electric cars really DO fit into our roadmap!`,
        reducers: {
          money: val => val - 0.5,
          innovation: val => val + 0.3,
          reputation: val => val - 0.1,
        },
      },
      no: {
        message: `Hmm this might not be the best time`,
        reducers: {
          innovation: val => val - 0.2,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  innovationInvestorFlavorOfTheMonth_ar: {
    message: `
      I was watching a basketball game last night from the luxury box and
      I realized that this is the perfect time for you to pivot... Pivot into AR! What do you say, chum?
    `,
    sender: SENDER_INVESTOR_INNOVATION,
    options: {
      yes: {
        message: `Like you say, it's the wave of the future!`,
        reducers: {
          money: val => val - 0.5,
          innovation: val => val + 0.4,
          crunchy: val => val - 0.1,
        },
      },
      no: {
        message: `AR schmay-arr.`,
        reducers: {
          innovation: val => val - 0.3,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  innovationInvestorFlavorOfTheMonth_blockchain: {
    message: `
      I was at this "future of BDSM" conference and needless to say I came
      away very impressed by the potential of both blocks and chains. Speaking of,
      I feel like your company could mix in a bit more of that blockchainy goodness. What do you say?
    `,
    sender: SENDER_INVESTOR_INNOVATION,
    options: {
      yes: {
        message: `I mean of course, crypto is the future!`,
        reducers: {
          money: val => val - 0.5,
          innovation: val => val + 0.4,
          crunchy: val => val - 0.1,
        },
      },
      no: {
        message: `Hmm I like my data storage centralized and fast, thank-you-very-much.`,
        reducers: {
          innovation: val => val - 0.3,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  /*
  innovationInvestorFlavorOfTheMonth_blockchain: {
    message: `
      I was at this "future of BDSM" conference and needless to say I came
      away very impressed by the potential of both blocks and chains. Speaking of,
      I feel like your company could mix in a bit more of that blockchainy goodness. What do you say?
    `,
    sender: SENDER_INVESTOR_INNOVATION,
    options: {
      yes: {
        message: `I mean of course, crypto is the future!`,
        reducers: {
          money: val => val - 0.5,
          innovation: val => val + 0.4,
          crunchy: val => val - 0.1,
        },
      },
      no: {
        message: `Hmm I like my data storage centralized and fast, thank-you-very-much.`,
        reducers: {
          innovation: val => val - 0.3,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  */
};
