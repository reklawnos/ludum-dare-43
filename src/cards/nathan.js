import {
  SENDER_CFO,
  SENDER_CTO,
  SENDER_INVESTOR_REPUTATION,
  SENDER_INVESTOR_INNOVATION,
  SENDER_HR,
  STANDARD_SCORE,
  showWithFixedScore,
} from "./shared";

export default {
  billionaireExtremist: {
    message: `
      Hey, quick question... That one guy who paid lots of money for
      bots to spread misinformation during the election REALLY likes our product.
      He wants to invest, what should we say?
    `,
    sender: SENDER_CFO,
    options: {
      yes: {
        message: `Hey, money is money!`,
        reducers: {
          money: val => val + 0.4,
          crunchy: val => val - 0.3,
          reputation: val => val + 0.3,
        },
      },
      no: {
        message: `No thank you.`,
        reducers: {
          crunchy: val => val + 0.3,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  basketballPlayer: {
    message: `
      Famous baskeball player wants to invest in the company but he 
      mandates that you have to write everything in Java because he 
      read that "Nobody Ever Got Fired for Picking Java".  The whole 
      time a basketball was spinning on his finger.
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `You bet!`,
        reducers: {
          money: val => val + 0.3,
          crunchy: val => val - 0.1,
          reputation: val => val + 0.3,
        },
      },
      no: {
        message: `
            I'm not into sports
        `,
        reducers: {
          innovation: val => val + 0.1,
          reputation: val => val - 0.2,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  oligarchMotherland: {
    message: `
      An oligarch from great Motherland says:
      "I have good investment... if, how you say, I scratch back, you also
      scratch back. I hope we have a good business."
    `,
    sender: SENDER_CFO,
    options: {
      yes: {
        message: `Yes!`,
        reducers: {
          money: val => val + 0.4,
          reputation: val => val + 0.2,
          crunchy: val => val - 0.4,
        }
      },
      no: {
        message: `Nyet`,
        reducers: {
          crunchy: val => val + 0.1,
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  wealthyPrinceOrb: {
    message: `
      A wealthy prince wants to invest. But first you'll have to put your
      hands on a glowy orb.
    `,
    sender: SENDER_CFO,
    options: {
      yes: {
        message: `Looks warm`,
        reducers: {
          money: val => val + 0.3,
          crunchy: val => val - 0.2,
        }
      },
      no: {
        message: `What is that`,
        reducers: {
          crunchy: val => val + 0.1,
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  topAccelerator: {
    message: `
      The world's top accelerator decided that they will invest but only
      if you pair up a non-proft company in their portfolio to raise
      awareness.  Your engineering team will have to stop
      working on your product and instead make a website for this
      initiative.
    `,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `Do it!`,
        reducers: {
          money: val => val + 0.3,
          crunchy: val => val + 0.4,
          innovation: val => val - 0.3,
          reputation: val => val - 0.3,
        },
      },
      no: {
        message: `Can't right now`,
        reducers: {
          crunchy: val => val - 0.3,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  twinSisters: {
    message: `
      Angel Investors Duo / twin-sisters love your idea and see big $$$
      in your future.  They'll invest, but they want to replace your
      database with the blockchain.
    `,
    sender: SENDER_INVESTOR_INNOVATION,
    options: {
      yes: {
        message: `Yay, chainblocks!`,
        reducers: {
          money: val => val + 0.3,
          innovation: val => val + 0.3,
          reputation: val => val + 0.1,
          crunchy: val => val - 0.3,
        }
      },
      no: {
        message: `That's not our expertise`,
        reducers: {
          innovation: val => val - 0.3,
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  rapperAPI: {
    message: `
      Houston-based rapper and successful startup investor wants to 
      invest.  But you also have to have an API integration with his app.
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `Word`,
        reducers: {
          money: val => val + 0.2,
          innovation: val => val - 0.1,
          reputation: val => val + 0.3,
        }
      },
      no: {
        message: `No`,
        reducers: {
          reputation: val => val - 0.3,
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  videoGameCoolKids: {
    message: `
      Integrate with this multiplayer-online-battle-royale-horror-sequel-
      cross-platform video game, and it will make us the coolest kids in town
    `,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `W00t`,
        reducers: {
          money: val => val + 0.2,
          innovation: val => val - 0.2,
          crunchy: val => val - 0.2,
          reputation: val => val + 0.3,
        }
      },
      no: {
        message: `Idk if that's our market `,
        reducers: {
          reputation: val => val - 0.3,
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  sameAppButVR: {
    message: `
      Ok so let's redo our product, but this time, in VR
    `,
    sender: SENDER_INVESTOR_INNOVATION,
    options: {
      yes: {
        message: `Far-out`,
        reducers: {
          money: val => val - 0.2,
          crunchy: val => val - 0.2,
          innovation: val => val + 0.2,
          reputation: val => val + 0.1,
        }
      },
      no: {
        message: `I only think in 2D`,
        reducers: {
          innovation: val => val - 0.2,
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  brainToComputer: {
    message: `
      Brain to computer communication is the future.  We need to ride that
      wave.  Don't we want our app to be wavy?
    `,
    sender: SENDER_INVESTOR_INNOVATION,
    options: {
      yes: {
        message: `Surfs up`,
        reducers: {
          money: val => val - 0.2,
          crunchy: val => val - 0.1,
          innovation: val => val + 0.2,
          reputation: val => val - 0.1,
        },
      },
      no: {
        message: `
          Maybe in a couple of decades
        `,
        reducers: {
          innovation: val => val - 0.2,
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  designersVsEngineers: {
    message: `
      Designers and engineers are fighting, they want you to choose who
      you prefer.
    `,
    sender: SENDER_HR,
    options: {
      yes: {
        message: `Designers of course`,
        reducers: {
          reputation: val => val + 0.2,
          innovation: val => val - 0.2,
        }
      },
      no: {
        message: `Engineers of course`,
        reducers: {
          reputation: val => val - 0.2,
          innovation: val => val + 0.2,
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  refactorFun: {
    message: `Engineers want to refactor the code`,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `Smart`,
        reducers: {
          money: val => val - 0.1,
          reputation: val => val + 0.2,
          innovation: val => val - 0.2,
        }
      },
      no: {
        message: `Not now`,
        reducers: {
          reputation: val => val - 0.2,
          innovation: val => val + 0.2,
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  patentQs: {
    message: `Should we patent this thing that one of the engineers made?`,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `Yes I love protecting Intellectual Property.`,
        reducers: {
          money: val => val - 0.3,
          reputation: val => val + 0.2,
          innovation: val => val + 0.3,
        }
      },
      no: {
        message: `That sounds like a stupid waste of time and money`,
        reducers: {
          reputation: val => val - 0.1,
          innovation: val => val - 0.2,
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  researchDevelopment: {
    message: `We should create a Research & Development Team`,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `Agreed`,
        reducers: {
          money: val => val - 0.4,
          reputation: val => val - 0.1,
          innovation: val => val + 0.3,
        }
      },
      no: {
        message: `Negative`,
        reducers: {
          innovation: val => val - 0.3,
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  betterPRFirm: {
    message: `We really need a better PR firm than a young intern.`,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `Upvote`,
        reducers: {
          money: val => val - 0.1,
          reputation: val => val + 0.2,
        }
      },
      no: {
        message: `Downvote`,
        reducers: {
          reputation: val => val - 0.1,
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  twoXBuddy: {
    message: `We're moving too slowly, we need to hire 2x more engineers`,
    sender: SENDER_INVESTOR_INNOVATION,
    options: {
      yes: {
        message: `Let's double`,
        reducers: {
          money: val => val - 0.7,
          innovation: val => val + 0.4,
        }
      },
      no: {
        message: `Slow down, cowboy`,
        reducers: {
          innovation: val => val - 0.1,
        }
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
};
