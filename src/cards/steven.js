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
  r,
  showSomeTimeAfterAnyChoices,
  showAfterAnyChoices,
  SENDER_TWITTER,
  getTwitterHandleFromCompanyName,
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
          money: r(-0.3),
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
          money: r(-0.2),
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
          money: r(-0.2),
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
    message: `Hey, did you make some weird donations to Senator McBob's campaign? We're being investigated for campaign finance law violations.`,
    sender: SENDER_LEGAL,
    options: {
      pay_fine: {
        message: `Pay the fine to make it go away`,
        reducers: {
          money: r(-0.3),
          reputation: r(-0.1),
          crunchy: r(0.1),
          innovation: r(0.1),
        },
      },
      lawyer_up: {
        message: `Hire some lawyers to take care of this`,
        reducers: {
          money: r(-0.3),
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
          crunchy: r(-0.2),
          reputation: r(0.1)
        },
      },
      no: {
        message: `No, not at all`,
        reducers: {
          reputation: r(-0.2),
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
          crunchy: r(-0.2),
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
          money: r(-0.2),
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
    message: `From a fellow "My Little Zebra" fan, who is your favorite zebra?`,
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
    message: `We got an anonymous call on the whistleblower hotline that said we might be using a patented process without paying for it.`,
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
        message: `It's anonymous, so we can just ignore it, right?`,
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
  plasticStraws: {
    message: `On the news, it said that five million dolphins die each year from plastic straws. We should be a leader and replace them with paper straws in the cafeteria.`,
    sender: SENDER_INVESTOR_CRUNCHY,
    options: {
      paper: {
        message: `Switch to paper straws`,
        reducers: {
          money: r(-0.2),
          crunchy: r(0.2),
        }, 
      },
      plastic: {
        message: `Keep plastic straws`,
        reducers: {
          crunchy: r(-0.2),
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  paperStraws: {
    message: `Hey, the paper straws in the cafeteria break down too quickly and make drinks taste like wood. Can we go back to the plastic straws?`,
    sender: SENDER_EMPLOYEE,
    options: {
      paper: {
        message: `Stick with paper straws`,
        reducers: {
          money: r(-0.2),
        },
      },
      plastic: {
        message: `Go back to plastic straws`,
        reducers: {
          money: r(0.1),
          crunchy: r(-0.4),
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice("plasticStraws", "paper", 0.6),
  },
  greenProduction: {
    message: (companyName, productName) => `My shaman was telling me about this greener production process for ${productName}? It uses essence of myrrh and powdered wolfsbane.`,
    sender: SENDER_INVESTOR_CRUNCHY,
    options: {
      switch: {
        message: `Sounds good, we should switch to it`,
        reducers: {
          money: r(-0.2),
          crunchy: r(0.1),
        },
      },
      skip: {
        message: `It's too expensive for us`,
        reducers: {
          crunchy: r(-0.2),
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  meditation: {
    message: `I want to increase my investment in your company. But I need you to provide Transcendental Meditation training to all your employees first. I can connect you with a yogi.`,
    sender: SENDER_INVESTOR_CRUNCHY,
    options: {
      accept: {
        message: `I'm grateful for your continued investment, please connect me to this yogi`,
        reducers: {
          money: r(0.5),
          crunchy: r(0.2),
        },
      },
      reject: {
        message: `Thanks, but no thanks`,
        reducers: {
          money: r(-0.2),
          crunchy: r(-0.2),
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE,)
  },
  meditation_cult_1: {
    message: `Hey, do you think that yogi friend of Sandra's is a bit... cult-leader-y?`,
    sender: SENDER_EMPLOYEE,
    options: {
      yes: {
        message: `I had a funny feeling about him, what's he up to?`,
        reducers: {},
      },
      no: {
        message: `No, let's drop the subject`,
        reducers: {},
      },
    },
    getScore: showSomeTimeAfterSpecificChoice("meditation", "accept", 0.6),
  },
  meditation_cult_2: {
    message: `He's telling us that we need to praise Cthulhu in order to achieve eternal salvation.`,
    sender: SENDER_EMPLOYEE,
    options: {
      yikes: {
        message: `Wat. That's it. He's fired.`,
        reducers: {
          crunchy: r(-0.4),
          reputation: r(0.1),
        },
      },
      ignore: {
        message: `I think you might be taking that a bit too literally`,
        reducers: {
          money: r(-0.2),
          reputation: r(-0.1),
        },
      },
    },
    getScore: showAfterSpecificChoice("meditation_cult_1", "yes"),
  },
  meditation_cult_3: {
    message: `We have a bad situation here... some employees have just filed a class-action lawsuit alleging a hostile work environment. Have you heard anything about a yogi and this Cthulhu they're talking about?`,
    sender: SENDER_LEGAL,
    options: {
      fire_yogi: {
        message: `Fire the yogi before things get any worse`,
        reducers: {
          crunchy: r(-0.4),
          reputation: r(0.1),
        },
      },
      pay_off_yogi: {
        message: `Let's pay the yogi off and hope he goes away quietly`,
        reducers: {
          money: r(-0.3),
          reputation: r(-0.2),
        },
      },
    },
    getScore: showSomeTimeAfterAnyChoices(["meditation_cult_1", "meditation_cult_2"], ["no", "ignore"], 0.6),
  },
  meditation_cult_end: {
    message: `I'm really offended that you've decided to end the Transecendatal Meditation training. Why shouldn't I pull my investment?`,
    sender: SENDER_INVESTOR_CRUNCHY,
    options: {
      honest: {
        message: `I have to be honest with you, the yogi was kind of a creep`,
        reducers: {
          money: r(-0.5),
          crunchy: r(-0.3),
          reputation: r(0.2),
        },
      },
      diplomatic: {
        message: `I don't think Transcendental Meditation was for me`,
        reducers: {
          money: r(-0.2),
          crunchy: r(-0.2),
        },
      },
    },
    getScore: showAfterAnyChoices(
      ["meditation_cult_3", "meditation_cult_3", "meditation_cult_2"],
      ["fire_yogi", "pay_off_yogi", "yikes"]),
  },
  celebrity_endorsement: {
    message: (companyName, productName) => `DM from @katie_jellor: Hey @${getTwitterHandleFromCompanyName(companyName)}! I'd love to give you my celebrity endorsement. Let's work out a deal, and I'll chirp about your ${productName} to my 25 million followers!`,
    sender: SENDER_TWITTER,
    options: {
      yes: {
        message: `Let me get my checkbook out`,
        reducers: {
          money: r(-0.4),
          crunchy: r(0.3),
          reputation: r(0.3),
        },
      },
      no: {
        message: `You're not a big enough influencer`,
        reducers: {
          crunchy: r(-0.3),
          reputation: r(-0.3),
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  }
};
