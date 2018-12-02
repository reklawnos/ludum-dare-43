import {
  STANDARD_SCORE,
  SENDER_CTO,
  SENDER_CHEF,
  SENDER_INVESTOR_INNOVATION,
  showSomeTimeAfterSpecificChoice,
  showWithFixedScore,
  SENDER_CFO,
  SENDER_INVESTOR_REPUTATION,
  SENDER_HEAD_OF_OFFICE_SECURITY,
  SENDER_FRIEND,
  SENDER_INVESTOR_CRUNCHY,
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

  innovationInvestorFlavorOfTheMonth_voice: {
    message: `
      I was yelling at my PA earlier today and I realized, why can't I do the same to your product?
      Build out some voice features now!
    `,
    sender: SENDER_INVESTOR_INNOVATION,
    options: {
      yes: {
        message: `Sounds like that wouldn't be too difficult!`,
        reducers: {
          money: val => val - 0.3,
          innovation: val => val + 0.3,
        },
      },
      no: {
        message: `What's wrong with a mouse and keyboard, or even a stylus?`,
        reducers: {
          innovation: val => val - 0.2,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  innovationInvestorFlavorOfTheMonth_ai: {
    message: `
      I was at a soirée in Marin with some of my investor friends and I've decided you're
      not doing enough with AI. It's only a matter of weeks before the singularity and
      I want my investments to be ready for when it happens.
    `,
    sender: SENDER_INVESTOR_INNOVATION,
    options: {
      yes: {
        message: `Geez, I better get on it then!`,
        reducers: {
          money: val => val - 0.5,
          innovation: val => val + 0.4,
        },
      },
      no: {
        message: `Mmmm it doesn't seem like that big of a deal rn...?`,
        reducers: {
          innovation: val => val - 0.3,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  innovationInvestorFlavorOfTheMonth_ml: {
    message: `
      I didn't want to mention it at the time, but the last time I was at your office
      I saw an actual software engineer writing code. Why aren't you cutting
      costs using machine learning?
    `,
    sender: SENDER_INVESTOR_INNOVATION,
    options: {
      yes: {
        message: `Er, good point. I should probably fire some people.`,
        reducers: {
          money: val => val - 0.3,
          innovation: val => val + 0.2,
          crunchy: val => val - 0.4,
        },
      },
      no: {
        message: `I value my employees greatly!`,
        reducers: {
          innovation: val => val - 0.3,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  innovationInvestorFlavorOfTheMonth_tunnels: {
    message: `
      Ugh! I heard about this guy... What's his name, Breelon Dusk? Who's getting into
      this whole tunnel business. We should be digging tunnels too! Get on it now!
    `,
    sender: SENDER_INVESTOR_INNOVATION,
    options: {
      yes: {
        message: `Good idea, let me go buy one of those boring machines...`,
        reducers: {
          money: val => val - 0.2,
          innovation: val => val + 0.2,
          crunchy: val => val - 0.2,
        },
      },
      no: {
        message: `
          What? That's as ridiculous as that decision we made not to
          sell random plastic garbage with our logo on it for additional funding.
        `,
        reducers: {
          innovation: val => val - 0.3,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  outsourceEngineering_1: {
    message: `
      Hey, so I googled around a bit and found this millennial-only outsourcing firm
      that looks totally lit🔥🔥🔥🔥🔥🔥 How about we shift some engineering work to them to cut costs?
    `,
    sender: SENDER_CFO,
    options: {
      yes: {
        message: `Sure! That'll help us yeet on the competition.`,
        reducers: {
          money: val => val + 0.2,
          reputation: val => val + 0.1,
          crunchy: val => val - 0.2,
        },
      },
      no: {
        message: `
          Wait, I thought millennials were lazy?
        `,
        reducers: {
          reputation: val => val - 0.1,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  outsourceEngineering_2: {
    message: `
      You remember those millennials you outsourced the core of our app to?
      Well our senior engineers can't understand a lick of their code because the
      variable names are all in emoji. What do we do?
    `,
    sender: SENDER_CTO,
    options: {
      hireMillennials: {
        message: `Hmm, maybe acqui-hiring the consultancy would be the best way to dab them into our organization? *flosses*`,
        reducers: {
          money: val => val - 0.3,
          reputation: val => val - 0.1,
          crunchy: val => val + 0.2,
        },
      },
      punishMillennials: {
        message: `
          Good-for-nothing millennials! We'll sue them into the ground!
        `,
        reducers: {
          money: val => val + 0.2,
          crunchy: val => val - 0.3,
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice('outsourceEngineering_1', 'yes', 0.2),
  },

  // reputation investor
  reputation_holidayParty1: {
    message: `
      Yooo when are you hosting that company holiday party? Gotta prop up
      that company culture with some grain alcohol and fresh Colombian co-...
      Coca-Cola! And dancing, and that other wholesome stuff you know?
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `Seems dangerous, but when have I ever avoided danger?`,
        reducers: {
          money: val => val - 0.3,
          reputation: val => val + 0.4,
          crunchy: val => val + 0.1,
          innovation: val => val - 0.2,
        },
      },
      no: {
        message: `Naaah man, gotta cut costs...`,
        reducers: {
          reputation: val => val - 0.3,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  reputation_holidayParty2: {
    message: `
      Sorry to disturb you, but at the holiday party, we found this envelope full of white
      powder and we believe it might be anthrax. What should we do?
    `,
    sender: SENDER_HEAD_OF_OFFICE_SECURITY,
    options: {
      letMeHaveIt: {
        message: `Ohhh, that? Looks harmless, I should probably hang on to it... You know, for safe keeping.`,
        reducers: {},
      },
      dealWithIt: {
        message: `Eesh, anthrax you say? We should probably alert the proper authorities!`,
        reducers: {
          reputation: val => val - 0.3,
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice('reputation_holidayParty1', 'yes', 0.5),
  },

  reputation_holidayParty3: {
    message: `
      Hey hey hey any chance an envelope got found at the... at the holiday party? I had a letter that I,
      um, yeah! A letter for my grandma I wanted to send. Anyone found it? No reason.
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      hideIt: {
        message: `Hmm, don't know anything about that... No envelopes, no sirree.`,
        reducers: {
          reputation: val => val - 0.3,
          crunchy: val => val + 0.2,
        },
      },
      giveIt: {
        message: `Yeah, it's right here!`,
        reducers: {
          reputation: val => val + 0.5,
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice('reputation_holidayParty2', 'yes', 0.5),
  },

  reputation_holidayParty4: {
    message: `
      Hey there, I've noticed you've been a little jittery lately. Just
      wanted to let you know I'm here for you.
    `,
    sender: SENDER_INVESTOR_CRUNCHY,
    options: {
      hideIt: {
        message: `Hey, no YOU'RE the one who's jittery! Get outta here!`,
        reducers: {
          reputation: val => val + 0.2,
          crunchy: val => val - 0.3,
        },
      },
      admit: {
        message: `You're right... I should probably lay off the uh, soda pop...`,
        reducers: {
          crunchy: val => val + 0.2,
          reputation: val => val - 0.3,
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice('reputation_holidayParty3', 'hideIt', 0.5),
  },

  reputation_dadParty: {
    message: `
      Yoooo home-friend let's get blasted at my dad's house in the Hamptons this weekend,
      lots of good con-ects you could set-it-ty-set up you know? Don't be a square!
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `Not sure what you're going for slang-wise, but sure!`,
        reducers: {
          reputation: val => val + 0.2,
          crunchy: val => val - 0.2,
          innovation: val => val - 0.1,
        },
      },
      no: {
        message: `Nah, I'm busy this weekend`,
        reducers: {
          reputation: val => val - 0.2,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  reputation_stripClub: {
    message: `
      Heyyy wanna pop into that strip club downtown for lunch? They've got a great buffet!
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `Sounds productive AND appropriate!`,
        reducers: {
          reputation: val => val + 0.2,
          crunchy: val => val - 0.4,
        },
      },
      no: {
        message: `Mm, I'll pass.`,
        reducers: {
          reputation: val => val - 0.2,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  reputation_stripClub: {
    message: `
      Ok so I got us a sweeeeet con-nect with some "exotic dancers"
      who can "perform" at our "launch event" next week, what's the number on your corporate card?
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `Not sure what all those quotes are about but seems reasonable!`,
        reducers: {
          money: val => val - 0.2,
          reputation: val => val + 0.3,
          innovation: val => val - 0.1,
          crunchy: val => val - 0.3,
        },
      },
      no: {
        message: `Mm, I'll pass.`,
        reducers: {
          reputation: val => val - 0.2,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  reputation_: {
    message: `
      Ok so I got us a sweeeeet con-nect with some "exotic dancers"
      who can "perform" at our "launch event" next week, what's the number on your corporate card?
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `Not sure what all those quotes are about but seems reasonable!`,
        reducers: {
          money: val => val - 0.2,
          reputation: val => val + 0.3,
          innovation: val => val - 0.1,
          crunchy: val => val - 0.3,
        },
      },
      no: {
        message: `Mm, I'll pass.`,
        reducers: {
          reputation: val => val - 0.2,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
};
