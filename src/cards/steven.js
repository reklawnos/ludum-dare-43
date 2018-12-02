import {
  STANDARD_SCORE,
  SENDER_CNN,
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
  getRandomSenator,
  showAfterSpecificChoice,
  showAfterSpecificCard,
  showAfterAnyCard,
  r
} from "./shared";

export default {
  productRecall_1: {
    message: `An engineer in my yoga group told me that your product contains chemicals known to the state of California to cause cancer. I think you should consider a recall.`,
    sender: SENDER_INVESTOR_CRUNCHY,
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
  congress_start: {
    message: `The U.S. Congress wants you to testify in front of a committee investigating the company's marketing towards children.`,
    sender: SENDER_LEGAL,
    options: {
      go: {
        message: `Go to Washington`,
        reducers: {
          money: r(-0.1),
        },
      },
      skip: {
        message: `Ignore subpoena`,
        reducers: {
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  congress_skipped: {
    message: `Senator McBob is upset that you ignored the Congressional investigation. Should we send him a "campaign donation" to make him forget about it?`,
    sender: SENDER_LEGAL,
    options: {
      bribe: {
        message: `Send him a check`,
        reducers: {
          money: r(-0.4),
        },
      },
      ignore: {
        message: `Ignore it`,
        reducers: {
          reputation: r(-0.2),
          crunchy: r(-0.2),
          innovation: r(-0.2),
        },
      },
    },
    getScore: showAfterSpecificChoice("congress_start", "skip"),
  },
  congress_taxation: {
    message: (companyName, productName) => `As a result of your antics in front of Congress, the government has passed a new law imposing a 20% tax on ${productName}.`,
    sender: SENDER_CFO,
    options: {
      ok: {
        message: `Ugh, great...`,
        reducers: {
          money: r(-0.6)
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice("congress_skipped", "ignore", 0.6),
  },
  congress_campaign_finance: {
    message: `Hey, did you make some weird donations? We're being investigated for campaign finance law violations.`,
    sender: SENDER_LEGAL,
    options: {
      pay_fine: {
        message: `Pay the fine to make it go away`,
        reducers: {
          money: r(-0.1),
          reputation: r(-0.1),
          crunchy: r(0.1),
          innovation: r(0.1),
        },
      },
      lawyer_up: {
        message: `Hire some lawyers to take care of this`,
        reducers: {
          money: r(-0.1),
          reputation: r(0.1),
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice("congress_skipped", "bribe", 0.6),
  },
  congress_attended: {
    message: `Are you aware that your products are being marketed during children's Saturday morning cartoons?`,
    sender: getRandomSenator(),
    options: {
      yes: {
        message: `Yes, what's wrong with that?`,
        reducers: {
          crunchy: r(-0.1),
          reputation: r(0.1)
        },
      },
      no: {
        message: `No, not at all`,
        reducers: {
          reputation: r(-0.1),
          crunchy: r(0.1),
        },
      },
    },
    getScore: showAfterSpecificChoice("congress_start", "go"),
  },
  congress_tweet_start: {
    message: `Hmmm, but you posted this message on Chirper yesterday: "Can't wait for the world premiere of our new ad during @MyLittleZebraAnimatedSeries this morning! #hype #blessed #hustle"`,
    sender: getRandomSenator(),
    options: {
      weasel: {
        message: `Whoa, "My Little Zebra" isn't just a kids show`,
        reducers: {
          reputation: r(-0.2),
          crunchy: r(0.1),
        },
      },
      ambien: {
        message: `It was the Ambien I took`,
        reducers: {
          reputation: r(0.2),
          crunchy: r(-0.1),
        },
      },
    },
    getScore: showAfterSpecificChoice("congress_attended", "no"),
  },
  congress_tweet_ambien: {
      message: (companyName) => `News Alert: CEO of ${companyName} being investigated for erratic behavior under the influence of Ambien`,
      sender: SENDER_CNN,
      options: {
        flip_channel: {
          message: `Switch the TV channel`,
          reducers: {
            reputation: r(0.1),
          },
        },
        take_more_ambien: {
          message: `Take another Ambien`,
          reducers: {
            money: r(-0.1),
          },
        },
      },
      getScore: showSomeTimeAfterSpecificChoice("congress_tweet_start", "ambien", 0.6),
  },
  congress_tweet_weasel: {
    message: `"My Little Zebra" is my daughter's favorite show. Are you saying that you watch the same cartoons as a 9-year-old girl?`,
    sender: getRandomSenator(),
    options: {
      yes: {
        message: `Yes`,
        reducers: {
        },
      },
      fifth: {
        message: `I'm taking the 5th Amendment and will no longer be answering questions`,
        reducers: {
        },
      },
    },
    getScore: showAfterSpecificChoice("congress_tweet_start", "weasel"),
  },
  congress_tweet_peta: {
    message: `Parents for Ethical Toon Advertising (PETA) is upset that you dodged Congress's questions at the recent hearing on Capitol Hill.`,
    sender: SENDER_COMMUNICATIONS,
    options: {
      pay_off: {
        message: `Pledge donation to PETA`,
        reducers: {
          money: r(-0.1),
          reputation: r(-0.1),
        },
      },
      ignore: {
        message: `Ignore PETA`,
        reducers: {
          reputation: r(0.1),
          innovation: r(-0.1),
          crunchy: r(-0.1),
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice("congress_tweet_weasel", "fifth", 0.6),
  },
  congress_tweet_brony: {
    message: `From a fellow My Little Zebra fan, who is your favorite zebra?`,
    sender: SENDER_EMPLOYEE,
    options: {
      none: {
        message: `I don't watch My Little Zebra`,
        reducers: {
          reputation: r(0.2),
          innovation: r(-0.2),
        },
      },
      lightglow: {
        message: `Lightglow, because he's so happy`,
        reducers: {
          reputation: r(-0.2),
          innovation: r(0.2),
        },
      },
      skychaser: {
        message: `Skychaser, because she's so friendly`,
        reducers: {
          reputation: r(-0.2),
          innovation: r(0.2),
        },
      },
      featherflutter: {
        message: `Featherflutter, because he's always loyal`,
        reducers: {
          reputation: r(-0.2),
          innovation: r(0.2),
        },
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("congress_tweet_weasel", "yes", 0.6),
  },
  congress_admitted: {
    message: `I'm shocked at your cavalier attitude. It seems like the whole industry is a wild west in need of regulation.`,
    sender: getRandomSenator(),
    options: {
      regulate: {
        message: `I guess a bit of regulation wouldn't hurt`,
        reducers: {
          money: r(-0.3),
          reputation: r(-0.1),
          crunchy: r(0.1),
          innovation: r(-0.1),
        },
      },
      self_regulate: {
        message: `We can regulate ourselves`,
        reducers: {
          money: r(-0.2),
          crunchy: r(-0.2),
          innovation: r(0.1),
        },
      },
    },
    getScore: showAfterSpecificChoice("congress_attended", "yes"),
  },
  congress_end: {
    message: `Thank you for your testimony. That will be all.`,
    sender: getRandomSenator(),
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
    getScore: showAfterAnyCard(["congress_tweet_start", "congress_admitted", "congress_tweet_weasel"]),
  },
  patentInfringement_1: {
    message: `One of the engineers thinks that we might be using a patented process without a license.`,
    sender: SENDER_LEGAL,
    options: {
      yes: {
        message: `License the patent`,
        reducers: {
          money: r(-0.3),
          innovation: r(0.1)
        },
      },
      no: {
        message: `Ignore it`,
        reducers: {
          money: r(0.1),
          innovation: r(-0.1)
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  patentInfringement_2: {
    message: `Remember that patent that we never licensed? The inventors just filed a lawsuit.`,
    sender: SENDER_LEGAL,
    options: {
      yes: {
        message: `Fight them in court`,
        reducers: {
          money: r(-0.4),
          reputation: r(-0.2),
        },
      },
      no: {
        message: `Settle out of court`,
        reducers: {
          money: r(-0.6),
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice("patentInfringement_1", "no", 0.6),
  },
};
