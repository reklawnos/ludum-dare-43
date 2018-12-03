import {
  STANDARD_SCORE,
  SENDER_EMAIL,
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
    message: `We got this strange subpoena from the U.S. Congress. Says they want you to testify about some emails. Something about "My Little Zebra"?`,
    sender: SENDER_LEGAL,
    options: {
      go: {
        message: `I'll go to Washington to do my civic duty`,
        reducers: {
          money: r(-0.2),
        },
      },
      skip: {
        message: `Ignore the subpoena`,
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
    message: `As you know, it's our Constitutional duty as Senators to investigate anything related to emails. Recent news reports have revealed that the "My Little Zebra" fan club's email list was just a front for Russian propaganda. Do you know anything about this?`,
    sender: getRandomSenator(),
    options: {
      yes: {
        message: `Yes, of course`,
        reducers: {
          reputation: r(-0.2),
          crunchy: r(0.1),
        },
      },
      no: {
        message: `(Lie) I've never heard about "My Little Zebra" before`,
        reducers: {
          reputation: r(0.1),
          crunchy: r(-0.2),
        },
      },
    },
    getScore: showAfterSpecificChoice("congress_start", "go"),
  },
  congress_tweet_start: {
    message: `Hmmm, but I see here that you received an email three days ago from <featherflutter@mylittlezebrafanclub.com>. How do you explain that?`,
    sender: getRandomSenator(),
    options: {
      weasel: {
        message: `I just appreciate "My Little Zebra", I didn't know anything about any Russians`,
        reducers: {
          reputation: r(-0.2),
          crunchy: r(0.1),
        },
      },
      hacked: {
        message: `My emails were hacked`,
        reducers: {
          reputation: r(0.2),
          crunchy: r(-0.2),
        },
      },
    },
    getScore: showAfterSpecificChoice("congress_attended", "no"),
  },
  congress_tweet_hacked: {
    message: `I'm a reporter from Worldly World News. Based on some emails from a recent hack, it seems like you're involved in some really weird conspiracy theories. "We need to stop these lizard-people who've infiltrated the government", one of the emails reads. Do you have any comment?`,
    sender: SENDER_EMAIL,
    options: {
      deny: {
        message: `I didn't write any of those emails`,
        reducers: {
          reputation: r(0.1),
          innovation: r(-0.1),
        },
      },
      admit: {
        message: `We need to stop these lizard-people who are posing as senators before they destroy us all`,
        reducers: {
          reputation: r(-0.1),
          innovation: r(0.1),
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice("congress_tweet_start", "hacked", 0.6),
  },
  congress_tweet_weasel: {
    message: `Wait, so you're actually a fan of "My Little Zebra"? That's my daughter's favorite show. Are you saying that you watch the same cartoons as a 9-year-old girl?`,
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
    message: `Parents for Ethical Toon Advocacy (PETA) is upset that you dodged Congress's questions about "My Little Zebra" at the recent Capitol Hill hearing. What should we do?`,
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
        message: `Just ignore them`,
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
    message: (companyName, productName) => `I'm shocked that you can be so calm about these dangerous emails. Maybe we need to start regulating the use of emails in the ${productName} industry.`,
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
    message: (companyName, productName) => `My shaman was telling me about this greener process for producing ${productName}? It uses essence of myrrh and powdered wolfsbane.`,
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
