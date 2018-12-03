import {
  STANDARD_SCORE,
  LONGER_STORY_SCORE,
  SENDER_CTO,
  SENDER_CHEF,
  SENDER_INVESTOR_INNOVATION,
  showSomeTimeAfterSpecificChoice,
  showWithFixedScore,
  SENDER_CFO,
  SENDER_INVESTOR_REPUTATION,
  SENDER_HEAD_OF_OFFICE_SECURITY,
  SENDER_INVESTOR_CRUNCHY,
  SENDER_HEAD_OF_FACILITIES,
  showAfterSpecificChoice,
  MUST_SHOW_SCORE,
  DO_NOT_SHOW_SCORE,
  showAfterSpecificCard,
  r
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
          money: r(-0.2),
          crunchy: r(0.2),
          reputation: r(-0.1),
        },
      },
      no: {
        message: `Psh, let them eat meat.`,
        reducers: {
          crunchy: r(-0.2),
        },
      },
    },
    getScore: showWithFixedScore(LONGER_STORY_SCORE),
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
          crunchy: r(0.2),
          reputation: r(-0.1),
        },
      },
      keepMeatlessMonday: {
        message: `Hmm, I was feeling particularly carnivorous today...`,
        reducers: {
          reputation: r(0.1),
          crunchy: r(-0.4),
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice('employeeMeatProblems_1', 'meatlessMonday', 1),
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
          money: r(-0.5),
          innovation: r(0.3),
        },
      },
      no: {
        message: `They can make due.`,
        reducers: {
          innovation: r(-0.2),
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
          money: r(-0.3),
          innovation: r(0.3),
          reputation: r(-0.1),
        },
      },
      no: {
        message: `Hmm this might not be the best time`,
        reducers: {
          innovation: r(-0.3),
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
          money: r(-0.5),
          innovation: r(0.3),
          crunchy: r(-0.1),
        },
      },
      no: {
        message: `AR schmay-arr.`,
        reducers: {
          innovation: r(-0.1),
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
          money: r(-0.5),
          innovation: r(0.3),
          crunchy: r(-0.1),
        },
      },
      no: {
        message: `Hmm I like my data storage centralized and fast, thank-you-very-much.`,
        reducers: {
          innovation: r(-0.3),
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
          money: r(-0.5),
          innovation: r(0.3),
        },
      },
      no: {
        message: `What's wrong with a mouse and keyboard, or even a stylus?`,
        reducers: {
          innovation: r(-0.2),
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
          money: r(-0.5),
          innovation: r(0.3),
        },
      },
      no: {
        message: `Mmmm it doesn't seem like that big of a deal rn...?`,
        reducers: {
          innovation: r(-0.3),
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
          money: r(-0.3),
          innovation: r(0.2),
          crunchy: r(-0.2),
        },
      },
      no: {
        message: `I value my employees greatly!`,
        reducers: {
          innovation: r(-0.3),
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
          money: r(-0.4),
          innovation: r(0.2),
          crunchy: r(-0.2),
        },
      },
      no: {
        message: `
          What? That's as ridiculous as that decision we made not to
          sell random plastic garbage with our logo on it for additional funding.
        `,
        reducers: {
          innovation: r(-0.3),
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
          money: r(0.2),
          reputation: r(0.1),
          crunchy: r(-0.2),
        },
      },
      no: {
        message: `
          Wait, I thought millennials were lazy?
        `,
        reducers: {
          reputation: r(-0.2),
        },
      },
    },
    getScore: showWithFixedScore(LONGER_STORY_SCORE),
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
          money: r(-0.3),
          reputation: r(-0.1),
          crunchy: r(0.2),
        },
      },
      punishMillennials: {
        message: `
          Good-for-nothing millennials! We'll sue them into the ground!
        `,
        reducers: {
          money: r(0.2),
          crunchy: r(-0.3),
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice('outsourceEngineering_1', 'yes', 0.7),
  },

  toiletPaper_1: {
    message: `
      I used one of the non-executive toilets today and discovered that we're
      providing OBSCENELY luxurious 2-ply to our employees. Let's cut back to 1-ply!
    `,
    sender: SENDER_CFO,
    options: {
      yes: {
        message: `You're right! I pay them to type, not to wipe!`,
        reducers: {
          money: r(0.3),
          crunchy: r(-0.3),
        },
      },
      no: {
        message: `Let's keep the nice toilet tissue. Gotta save my employee's butts!`,
        reducers: {
          crunchy: r(0.1),
        },
      },
    },
    getScore: showWithFixedScore(LONGER_STORY_SCORE),
  },

  toiletPaper_2_standingDesks: {
    message: `
      A bunch of employess complained in our latest monthly survey that
      it's uncomfortable to sit all day. Should we provide them standing desks?
    `,
    sender: SENDER_HEAD_OF_FACILITIES,
    options: {
      yes: {
        message: `Ugh, fine. Maybe they'll finally get off their asses.`,
        reducers: {
          money: r(-0.3),
          innovation: r(0.2),
          crunchy: r(0.2),
        },
      },
      no: {
        message: `Pay for those? I couldn't STAND to do that.`,
        reducers: {
          innovation: r(-0.1),
          crunchy: r(-0.2),
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice('toiletPaper_1', 'yes', 1),
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
          money: r(-0.4),
          reputation: r(0.4),
          crunchy: r(0.1),
          innovation: r(-0.2),
        },
      },
      no: {
        message: `Naaah man, gotta cut costs...`,
        reducers: {
          reputation: r(-0.3),
        },
      },
    },
    getScore: showWithFixedScore(LONGER_STORY_SCORE),
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
          reputation: r(-0.3),
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice('reputation_holidayParty1', 'yes', 1),
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
          reputation: r(-0.3),
          crunchy: r(0.2),
        },
      },
      giveIt: {
        message: `Yeah, it's right here!`,
        reducers: {
          reputation: r(0.3),
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice('reputation_holidayParty2', 'yes', 1),
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
          reputation: r(0.2),
          crunchy: r(-0.3),
        },
      },
      admit: {
        message: `You're right... I should probably lay off the uh, soda pop...`,
        reducers: {
          crunchy: r(0.2),
          reputation: r(-0.3),
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice('reputation_holidayParty3', 'hideIt', 1),
  },

  reputation_dadParty: {
    message: `
      Yoooo home-friend let's get blasted at my dad's house in the Hamptons this weekend,
      lots of good connect you could set-it-ty-set up you know? Don't be a square!
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `Not sure what you're going for slang-wise, but sure!`,
        reducers: {
          reputation: r(0.2),
          crunchy: r(-0.2),
          innovation: r(-0.1),
        },
      },
      no: {
        message: `Nah, I'm busy this weekend`,
        reducers: {
          reputation: r(-0.2),
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
          reputation: r(0.2),
          crunchy: r(-0.4),
        },
      },
      no: {
        message: `Mm, I'll pass.`,
        reducers: {
          reputation: r(-0.2),
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  reputation_exoticDancers: {
    message: `
      Ok so I got us a sweeeeet connect with some "exotic dancers"
      who can "perform" at our "launch event" next week, what's the number on your corporate card?
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `Not sure what all those quotes are about but seems reasonable!`,
        reducers: {
          money: r(-0.2),
          reputation: r(0.3),
          innovation: r(-0.1),
          crunchy: r(-0.3),
        },
      },
      no: {
        message: `Mm, I'll pass.`,
        reducers: {
          reputation: r(-0.2),
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  reputation_vodkaTap_1: {
    message: `
      Hey hey hey what up so I was at the Goober office the other day and
      they have vodka ON TAP. YO. I didn't even know a vodka tap WAS A
      THING. LET'S GET ONNNEEEEEEEE
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `Cool! Burnetts?`,
        reducers: {
          money: r(-0.3),
          reputation: r(0.2),
        },
      },
      no: {
        message: `Let's just stick to an excessive amount of local craft beer.`,
        reducers: {
          reputation: r(-0.3),
        },
      },
    },
    getScore: showWithFixedScore(LONGER_STORY_SCORE),
  },

  reputation_vodkaTap_2: {
    message: `
      Hey, just wanted to give you a heads-up: since installing the vodka
      tap in the cafeteria a lot of employees have been returning to work after
      lunch completely blasted... What should we do about it?
    `,
    sender: SENDER_HEAD_OF_OFFICE_SECURITY,
    options: {
      keepIt: {
        message: `Hey... hey, HEY! DON'T fuck up the culture.`,
        reducers: {
          reputation: r(0.2),
          crunchy: r(0.1),
        },
      },
      leaveIt: {
        message: `Eesh, let's keep those taps off until after 4 PM.`,
        reducers: {
          money: r(0.1),
          crunchy: r(0.1),
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice('reputation_vodkaTap_1', 'yes', 1),
  },

  reputation_vodkaTap_3: {
    message: `
      Yo whatgives? doaa;nt theink your pelnmployees are xmajture enoughhh to handle soome likquor at 11 am.....
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      keepIt: {
        message: `Ok, on second thought, maybe we should get rid of the vodka tap entirely`,
        reducers: {
          money: r(0.1),
          reputation: r(-0.2),
        },
      },
      leaveIt: {
        message: `You're right! VODKA ALL DAY, EVERY DAY!`,
        reducers: {
          money: r(-0.1),
          reputation: r(0.6),
        },
      },
    },
    getScore: showAfterSpecificChoice('reputation_vodkaTap_2', 'leaveIt'),
  },

  reputation_vodkaTap_4: {
    message: `
      Hey, I really... I really hate to be the one to tell you, but our dear
      CTO died in the cafeteria today after being served seventeen shots of
      vodka by Brad. We're holding a memorial service this weekend.
    `,
    sender: SENDER_CFO,
    options: {
      basic: {
        message: `Oh geez, that's awful. I'll send my condolences. TTYL`,
        reducers: {
          crunchy: r(-0.6),
          innovation: r(-0.6),
        },
      },
      wholeHog: {
        message: `
          What a tragedy... Such a talented soul, gone so early.
          You know what, the entire company will attend the funeral. Let me start making arrangements.
        `,
        reducers: {
          reputation: r(-0.4),
          crunchy: r(-0.2),
          innovation: r(-0.2),
          money: r(-0.4),
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice('reputation_vodkaTap_3', 'yes', 1),
  },

  introCards_reputation: {
    message: (companyName) =>`
      Hey hey hey what's up I'm your best investor bud Brad! I really think ${companyName} is going to take off, and
      that'll get me into all kinds of great parties and stuff. Oh I guess
      there's "changing the world" and maybe some money or whatever but I'm already rich! 💸💸💸💸
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      basic: {
        message: `Uh, hey... nice to meet you.`,
        reducers: {},
      },
    },
    getScore: ({ isFirstTimePlaying }) => {
      if (isFirstTimePlaying) {
        return MUST_SHOW_SCORE;
      }
      return DO_NOT_SHOW_SCORE;
    },
  },


  introCards_crunchy: {
    message: (companyName, productName) =>`
      Hi there, I'm Sandra! I'm a long-time techie but I got out of that whole rat race to
      invest in wholesome companies that'll help both the planet and our souls. I truly believe that ${productName}
      is the best way to save humanity, and ${companyName} is the one to do it! Anyway, gotta
      get back to my free-range kombucha farm. Namaste!
    `,
    sender: SENDER_INVESTOR_CRUNCHY,
    options: {
      basic: {
        message: `Looking forward to working with you!`,
        reducers: {},
      },
    },
    getScore: showAfterSpecificCard('introCards_reputation'),
  },

  introCards_innovation: {
    message: (companyName, productName) =>`
      Hello. I am XT-9. My birthname was "Jason" but in the future we will be referred to by our identiers,
      and mine shall be XT-9. My machine learning model has determined that the creation of
      ${productName} will result in the highest probability of humanity's survival. I expect great things.
    `,
    sender: SENDER_INVESTOR_INNOVATION,
    options: {
      basic: {
        message: `Sure thing, XT-9!`,
        reducers: {},
      },
    },
    getScore: showAfterSpecificCard('introCards_crunchy'),
  },
};
