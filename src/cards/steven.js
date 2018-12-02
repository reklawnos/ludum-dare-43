import {
  STANDARD_SCORE,
  SENDER_CTO,
  SENDER_CHEF,
  SENDER_EMPLOYEE,
  SENDER_COMMUNICATIONS,
  SENDER_INVESTOR_INNOVATION,
  showSomeTimeAfterSpecificChoice,
  showWithFixedScore,
  SENDER_CFO,
  SENDER_INVESTOR_REPUTATION,
  SENDER_HEAD_OF_OFFICE_SECURITY,
  SENDER_INVESTOR_CRUNCHY,
  SENDER_HEAD_OF_FACILITIES,
  SENDER_LEGAL,
  SENDER_SENATOR,
  showAfterSpecificChoice,
  showAfterSpecificCard,
  r
} from "./shared";

export default {
  productRecall_1: {
    message: `QA just discovered that our product contains chemicals known to the state of California to cause cancer. Should we issue a recall?`,
    sender: SENDER_EMPLOYEE,
    options: {
      yes: {
        message: `Of course, the safety of our customers is paramount!`,
        reducers: {
          crunchy: r(0.1),
          money: r(-0.2),
        },
      },
      no: {
        message: `Let's just slap on a warning label`,
        reducers: {
          crunchy: r(-0.2),
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  productRecall_2: {
    message: `Should we set up a PR campaign to apologize for our product recall issues?`,
    sender: SENDER_COMMUNICATIONS,
    options: {
      yes: {
        message: `Sure`,
        reducers: {
          reputation: r(0.2),
          money: r(-0.1),
        },
      },
      no: {
        message: `Keep it quiet`,
        reducers: {
        },
      },
    },
    getScore: showAfterSpecificChoice("productRecall_1", "yes"),
  },
  congress_1: {
    message: `The U.S. Congress wants you to testify in front of a committee investigating the company's marketing towards children.`,
    sender: SENDER_LEGAL,
    options: {
      yes: {
        message: `Go to Washington`,
        reducers: {
          money: r(-0.1),
        },
      },
      no: {
        message: `Ignore subpoena`,
        reducers: {
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  congress_2: {
    message: `Senator McBob is upset that you ignored the Congressional investigation. Should we send him a "campaign donation" to make him forget about it?`,
    sender: SENDER_LEGAL,
    options: {
      yes: {
        message: `Send him a check`,
        reducers: {
          money: r(-0.5),
        },
      },
      no: {
        message: `Ignore it`,
        reducers: {
          reputation: r(-0.2),
          crunchy: r(-0.2),
          innovation: r(-0.2),
        },
      },
    },
    getScore: showAfterSpecificChoice("congress_1", "no"),
  },
  congress_3: {
    message: `Are you aware that your products are being marketed during children's Saturday morning cartoons?`,
    sender: SENDER_SENATOR,
    options: {
      yes: {
        message: `Yes, what's wrong with that?`,
        reducers: {
          crunchy: r(-0.2),
          reputation: r(0.2)
        },
      },
      no: {
        message: `No, not at all`,
        reducers: {
          reputation: r(-0.2),
          crunchy: r(0.2),
        },
      },
    },
    getScore: showAfterSpecificChoice("congress_1", "yes"),
  },
  congress_4: {
    message: `Hmmm, but you sent this message on Chirper yesterday: "Can't wait for the world premiere of our new ad during @MyLittleZebraAnimatedSeries this morning! #hype #blessed"`,
    sender: SENDER_SENATOR,
    options: {
      yes: {
        message: `Whoa, "My Little Zebra" isn't just a kids show`,
        reducers: {
          reputation: r(-0.3),
          crunchy: r(0.1),
        },
      },
      no: {
        message: `It was the Ambien`,
        reducers: {
          reputation: r(0.3),
          crunchy: r(-0.1),
        },
      },
    },
    getScore: showAfterSpecificChoice("congress_3", "no"),
  },
  congress_5: {
    message: `Thank you for your testimony. That will be all.`,
    sender: SENDER_SENATOR,
    options: {
      yes: {
        message: `Thank you, Senators`,
        reducers: {
          reputation: r(-0.1),
          crunchy: r(0.1),
          innovation: r(0.1),
        },
      },
      no: {
        message: `This was a witch hunt!`,
        reducers: {
          reputation: r(0.1),
          crunchy: r(-0.1),
          innovation: r(0.1),
        },
      },
    },
    getScore: showAfterSpecificCard("congress_4"),
  },
  congress_6: {
    message: `I'm shocked at your cavalier attitude. It seems like the whole industry is a wild west in need of regulation.`,
    sender: SENDER_SENATOR,
    options: {
      yes: {
        message: `I guess a bit of regulation wouldn't hurt`,
        reducers: {
          money: r(-0.3),
          reputation: r(-0.1),
          crunchy: r(0.1),
          innovation: r(-0.1),
        },
      },
      no: {
        message: `We can regulate ourselves`,
        reducers: {
          money: r(-0.2),
          crunchy: r(-0.2),
          innovation: r(0.1),
        },
      },
    },
    getScore: showAfterSpecificChoice("congress_3", "yes"),
  },
  congress_7: {
    message: `Thank you for your testimony. That will be all.`,
    sender: SENDER_SENATOR,
    options: {
      yes: {
        message: `Thank you, Senators`,
        reducers: {
          reputation: r(-0.1),
          crunchy: r(0.1),
          innovation: r(0.1),
        },
      },
      no: {
        message: `This was a witch hunt!`,
        reducers: {
          reputation: r(0.1),
          crunchy: r(-0.1),
          innovation: r(0.1),
        },
      },
    },
    getScore: showAfterSpecificCard("congress_6"),
  },
};
