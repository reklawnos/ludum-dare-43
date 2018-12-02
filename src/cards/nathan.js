import {
  SENDER_CFO,
  SENDER_CTO,
  SENDER_INVESTOR_REPUTATION,
  SENDER_INVESTOR_INNOVATION,
  showWithFixedScore,
} from "./shared";

export default {
    billionaireExtremist: {
        message: `
            A billionaire / political extremist wants to invest
        `,
        sender: SENDER_CFO,
        options: {
            yes: {
                messaging:  `
                    Money is apolitical
                `,
                reducers: {
                    money: val => val + 0.6,
                    crunchy: val => val - 0.3,
                    innovation: val => val + 0.6,
                    reputation: val => val - 0.3,
                }
            },
            no: {
                message: `
                    No thank you
                `,
                reducers: {
                    exactOpposite(),
                }
            },
        getScore: showWithFixedScore(STANDARD_SCORE),
    momAndDad: {
        message: `
            Your Mom and Dad demand to be able to invest and be on the board 
            because they want to retire soon.
        `,
        sender: SENDER_CFO,
        options: {
            yes: {
                messaging:  `
                    Yes Mom...
                `,
                reducers: {
                    money: val => val + 0.3,
                    crunchy: val => val + 0.3,
                    innovation: val => val - 0.3,
                    reputation: val => val - 0.6,
                }
            },
            no: {
                message: `
                    I'M AN ADULT
                `,
                reducers: {
                    exactOpposite(),
                }
            },
        getScore: showWithFixedScore(STANDARD_SCORE),
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
                messaging:  `
                    You bet!
                `,
                reducers: {
                    money: val => val + 0.6,
                    crunchy: val => val + 0.0,
                    innovation: val => val - 6.0,
                    reputation: val=> val + 0.6,
                }
            },
            no: {
                message: `
                    I'm not into sports
                `,
                reducers: {
                    exactOpposite(),
                }
            },
        getScore: showWithFixedScore(STANDARD_SCORE),
    oligarchMotherland: {
        message: `
            An oligarch from great Motherland says:
            "I have good investment... if, how you say, I scratch back, you also
            scratch back. I hope we have a good business."
        `,
        sender: SENDER_CFO,
        options: {
            yes: {
                messaging: `
                    Yes!
                `,
                reducers: {
                    money: val => val + 0.6,
                    crunchy: val => val - 0.6,
                    innovation: val => + 0.3,
                    reputation: val => val + 0.0,
                }
            },
            no: {
                message: `
                    Nyet
                `,
                reducers: {
                    exactOpposite(),
                }
            },
        getScore: showWithFixedScore(STANDARD_SCORE),
    wealthyPrinceOrb: {
        message: `
            A wealthy prince wants to invest. But first you'll have to put your
            hands on a glowy orb.
        `,
        sender: SENDER_CFO,
        options: {
            yes: {
                messaging: `
                    Looks warm
                `,
                reducers: {
                    money: val => val + 0.6,
                    crunchy: val => val - 0.6,
                    innovation: val => val   0.0,
                    reputation: val => val + 0.0,
                }
            },
            no: {
                message: `
                    What is that
                `,
                reducers: {
                    exactOpposite(),
                }
            },
        getScore: showWithFixedScore(STANDARD_SCORE),
    name: {
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
                messaging: `
                    Do it!
                `,
                reducers: {
                    money: val => val + 0.3,
                    crunchy: val => val + 0.6,
                    innovation: val => val - 0.6,
                    reputation: val => val + 0.6,
                }
            },
            no: {
                message: `
                    Can't right now
                `,
                reducers: {
                    exactOpposite(),
                }
            },
        getScore: showWithFixedScore(STANDARD_SCORE),
    twinSisters: {
        message: `
            Angel Investors Duo / twin-sisters love your idea and see big $$$
            in your future.  They'll invest, but they want to replace your
            database with the blockchain.
        `,
        sender: SENDER_INVESTOR_INNOVATION,
        options: {
            yes: {
                messaging: `
                    Yay, chainblocks!
                `,
                reducers: {
                    money: val => val + 0.6,
                    crunchy: val => val + 0.0,
                    innovation: val => val + 0.6,
                    reputation: val => val - 0.6,
                }
            },
            no: {
                message: `
                    That's not our expertise
                `,
                reducers: {
                    exactOpposite(),
                }
            },
        getScore: showWithFixedScore(STANDARD_SCORE),
    rapperAPI: {
        message: `
            Houston-based rapper and successful startup investor wants to 
            invest.  But you also have to have an API integration with his app.
        `,
        sender: SENDER_INVESTOR_REPUTATION,
        options: {
            yes: {
                messaging: `
                    Word
                `,
                reducers: {
                    money: val => val + 0.3,
                    crunchy: val => val + 0.3,
                    innovation: val => val - 0.6,
                    reputation: val => val + 0.6,
                }
            },
            no: {
                message: `
                    No 
                `,
                reducers: {
                    exactOpposite(),
                }
            },
        getScore: showWithFixedScore(STANDARD_SCORE),
    }
};