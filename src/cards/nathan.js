import {
  SENDER_CFO,
  SENDER_CTO,
  SENDER_INVESTOR_REPUTATION,
  SENDER_INVESTOR_INNOVATION,
  SENDER_ENGINEER,
  SENDER_BEEPER_DEEL,
  STANDARD_SCORE,
  showWithFixedScore,
  SENDER_ILYENKOVICH,
  r,
} from "./shared";

export default {
  billionaireExtremist: {
    message: `
      Hey, just wanted to say I LOVE your product and want to invest! You
      fit right into my portfolio of companies that help bend society
      or enable me to consume the blood of virile teens. What do you say?
    `,
    sender: SENDER_BEEPER_DEEL,
    options: {
      yes: {
        message: `Hey, money is money!`,
        reducers: {
          money: r(+0.4),
          crunchy: r(-0.3),
          reputation: r(+0.3),
        },
      },
      no: {
        message: `Hmm, I'm not about that vampire life.`,
        reducers: {
          crunchy: r(+0.3),
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  basketballPlayer: {
    message: `
      Hey yo hey so I was at this party hosted by the SF Basket Destroyer's
      point guard and he wants to invest in the company but he's
      SUUUPER into some programming thing called "type theory" and
      "categories of endofunctors" or whatever. Can you build it?
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `I know some of those words!`,
        reducers: {
          money: r(+0.3),
          innovation: r(+0.2),
          reputation: r(+0.2),
        },
      },
      no: {
        message: `Endo-what? No.`,
        reducers: {
          innovation: r(-0.1),
          reputation: r(-0.2),
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  oligarchMotherland: {
    message: `
      I am oligarch from great Motherland. I have good investment... if, how you say,
      I scratch back, you also scratch back. I hope we have a good business.
    `,
    sender: SENDER_ILYENKOVICH,
    options: {
      yes: {
        message: `How you say: Da, comrade!`,
        reducers: {
          money: r(+0.4),
          reputation: r(+0.2),
          crunchy: r(-0.4),
        }
      },
      no: {
        message: `Mm that's a hard nyet from me.`,
        reducers: {
          crunchy: r(+0.1),
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  wealthyPrinceOrb: {
    message: `
      Hey I got a message from a wealthy prince who wants to invest. But first
      you'll have to put your hands on a glowy orb...
    `,
    sender: SENDER_CFO,
    options: {
      yes: {
        message: `I don't see anything wrong with that!`,
        reducers: {
          money: r(+0.3),
          crunchy: r(-0.2),
        }
      },
      no: {
        message: `I'm generally anti-orb, actually...`,
        reducers: {
          crunchy: r(+0.1),
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  topAccelerator: {
    message: `
      Hey, I need you to stop working on the product right now so you can build a
      website for the nonprofit I founded yesterday. Thanks!
    `,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `Uh, I guess I can!`,
        reducers: {
          money: r(-0.3),
          crunchy: r(+0.3),
          innovation: r(-0.3),
        },
      },
      no: {
        message: `Umm, sorry... We're trying to get things ready for the launch.`,
        reducers: {
          crunchy: r(-0.3),
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  twinSisters: {
    message: `
      Hey I heard from a friend that the Brinkledoss sisters love our product
      but only invest in blockchain companies these days. Now's as good a time
      as any to pivot!
    `,
    sender: SENDER_CFO,
    options: {
      yes: {
        message: `Great! Maybe we can steal their ideas while we're at it.`,
        reducers: {
          money: r(+0.3),
          innovation: r(+0.3),
          reputation: r(+0.2),
        }
      },
      no: {
        message: `Eeh, blockchain's not really our thing.`,
        reducers: {
          innovation: r(-0.3),
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  videoGameCoolKids: {
    message: `
      Yo yo yo have you heard about this
      multiplayer-online-battle-royale-horror-sequel-cross-platform
      video game? It just came out for the GuyPhone XSIV (not available for the general public ;)) and I've
      been playing it all day. Let's do some kinda advertising thing with them.
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `Winner winner, chicken dinner!`,
        reducers: {
          money: r(+0.2),
          crunchy: r(-0.2),
          reputation: r(+0.3),
        }
      },
      no: {
        message: `Wait, how's that relevant to our product?`,
        reducers: {
          reputation: r(-0.3),
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  designersVsEngineers: {
    message: (companyName) => `
      Ugh, Morgan from design is SO ANNOYING and keeps saying that designers
      are better than engineers. End this once and for all: who is more important
      to ${companyName}, smart and skilled engineers or stupid designers?
    `,
    sender: SENDER_ENGINEER,
    options: {
      yes: {
        message: `Engineers of course!`,
        reducers: {
          reputation: r(-0.1),
          crunchy: r(-0.1),
          innovation: r(+0.2),
        }
      },
      no: {
        message: `Actually, I kinda like designers better...`,
        reducers: {
          reputation: r(+0.1),
          crunchy: r(+0.1),
          innovation: r(-0.2),
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  researchDevelopment: {
    message: `
      Hey, let's get an experimental projects division started! We need more ways to
      spend money on products we'll never actually launch.
    `,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `Sounds great, which letter sounds best? X? Z? R?`,
        reducers: {
          money: r(-0.3),
          innovation: r(+0.3),
        }
      },
      no: {
        message: `Mm, we should probably hold off for now.`,
        reducers: {},
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  betterPRFirm: {
    message: `
      Yo so my nephew wants to work for your company. You're not
      social-media savvy like this kid is. Let him be your social guy!
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `Let me give that a like and subscribe!`,
        reducers: {
          money: r(-0.1),
          reputation: r(+0.2),
        }
      },
      no: {
        message: `Mmm, I'm gonna have to downvote that.`,
        reducers: {
          reputation: r(-0.1),
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  twoXBuddy: {
    message: (companyName) => `
      You are moving too slowly. The only solution is to double your number
      of engineers. Do this now or ${companyName} will perish.
    `,
    sender: SENDER_INVESTOR_INNOVATION,
    options: {
      yes: {
        message: `You're right, let's do it!`,
        reducers: {
          money: r(-0.7),
          innovation: r(+0.4),
        }
      },
      no: {
        message: `Woah, let's slow down a few clock cycles, buddy.`,
        reducers: {
          innovation: r(-0.2),
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
};
