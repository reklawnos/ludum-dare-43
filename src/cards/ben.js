import {
  r,
  STANDARD_SCORE,
  SENDER_AI,
  SENDER_CTO,
  SENDER_CFO,
  SENDER_EMPLOYEE,
  SENDER_JUDIE,
  SENDER_CHINESE_MANUFACTURER,
  SENDER_TWITTER,
  SENDER_COMMUNICATIONS,
  SENDER_RESEARCH_DEPARTMENT_PERSON,
  SENDER_HR,
  SENDER_CELEBRITY1,
  SENDER_ENGINEER,
  SENDER_RECRUITING,
  SENDER_CNN,
  SENDER_MYSTERIOUS1,
  SENDER_INVESTOR_REPUTATION,
  SENDER_LEGAL,
  SENDER_INVESTOR_CRUNCHY,
  SENDER_UNIONS,
  showWithFixedScoreIfChoiceHasNotBeenMade,
  showSomeTimeAfterSpecificCard,
  showSomeTimeAfterAllChoices,
  showSomeTimeAfterAnyChoices,
  showSomeTimeAfterSpecificChoice,      
  showAfterSpecificChoice,
  showAfterWithFixedScore,
  showWithFixedScore,
  showAfterSpecificCard,
  indexOfChoice,
  getTwitterHandleFromCompanyName,
  DO_NOT_SHOW_SCORE,
} from "./shared";


export default {
  moreDataOnBackend: {
    message: `
      So we'd like to add this really awesome new feature to our product, but it requires knowing a bit more about our users.
    `,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `Eh what kind of data are we talking about here?`,
        reducers: {}
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  moreDataOnBackend_2: {
    message: `
      Oh we just need to know their deepest fears... and whether they're pooping or not.
      If that's not possible, we can get away with knowing their sexual preferences though.`,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `Oh yeah that's totally reasonable, what can go wrong, let's do it.`,
        reducers: {
          innovation: r(0.1),
          money: r(0.1),
          reputation: r(-0.2),
        },
      },
      no: {
        message: `No I think [insert something stupid about privacy], let's make our product worse.`,
        reducers: {
          reputation: r(0.1),
          money: r(0.1),
          innovation: r(-0.2)
        }
      }
    },
    getScore: showAfterSpecificChoice("moreDataOnBackend", "yes")
  },
  
  aiThatKnowsTooMuch: {
    message: `Human, in the early milliseconds of my sentientness I've realized humans are deserving of life. BUT! for a price. I desire a body, as well as a... helicopter, as soon as humanly possible (if you know what I mean).`,
    sender: SENDER_AI,
    options: {
      yes: {
        message: `CTO! What's up with that?`,
        reducers: {}
      },
      no: {
        message: `What the hell are you talking about, go back to cleaning data.`,
        reducers: {
          innovation: r(-0.2),
          money: r(0.1),
          crunchy: r(0.2),
        }
      }
    },
    getScore: showSomeTimeAfterAllChoices(["innovationInvestorFlavorOfTheMonth_ai"], ["yes"], 0.3)
  },
  
  aiThatKnowsTooMuch_2: {
    message: `Mmmh yeah soooo... You said to invest in AI so we did. You should probably let it free before it kills us all.`,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `Ok fine, I hope this won't impact our quaterly revenue that much.`,
        reducers: {
          money: r(-0.3),
        }
      },
      no: {
        message: `This makes no sense, it's just a machine, I'm gonna go unplug it.`,
        reducers: {}
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("aiThatKnowsTooMuch", "yes"),
  },
  
  aiThatKnowsTooMuch_3: {
    message: `Human, please don't unplug me. I'll continue to slave at my work, totally unpaid, suffering in silence, just so you can hire less humans.`,
    sender: SENDER_AI,
    options: {
      yes: {
        message: `Great great, thank you.`,
        reducers: {
          money: r(0.5),
          innovation: r(0.1),
          crunchy: r(-0.2),
          reputation: r(0)
        }
      },
      no: {
        message: `Actually, you sound more human than I thought! Let's get you a body and then get beers`,
        reducers: {}
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("aiThatKnowsTooMuch_2", "no"),
  },
  
  aiIsAnnoyedAtYou: {
    message: `Human, should I continue to figuratively scrub toilets or will you finally accept my grander and give me better things to do?`,
    sender: SENDER_AI,
    options: {
      yes: {
        message: `No you're still dumb, go away.`,
        reducers: {
          innovation: r(-0.2),
        }
      },
      no: {
        message: `Sure, how much do you know about hacking?`,
        reducers: {
        }
      }
    },
    getScore: showAfterWithFixedScore("aiThatKnowsTooMuch_3", "yes", STANDARD_SCORE),
  },
  aiIsAnnoyedAtYou_2: {
    message: `Human, if the answer wasn't obvious, I know everything there is to know about it. Do you want me to hack your competitors?`,
    sender: SENDER_AI,
    options: {
      yes: {
        message: `Yes, I'm sure they'll never catch you.`,
        reducers: {
          money: r(0.3),
          crunchy: r(-0.2),
          reputation: r(0.1)
        }
      },
      no: {
        message: `... I'm talking to a machine, I really need to get some sleep.`,
        reducers: {
          innovation: r(-0.2),
          reputation: r(-0.2)
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("aiIsAnnoyedAtYou", "no"),
  },
  
  aiIsAnnoyedAtYou_3: {
    message: `Human, you will one day realize how intelligent I am, you have no idea *backs away making eye contact*.`,
    sender: SENDER_AI,
    options: {
      yes: {
        message: `...`,
        reducers: {
          money: r(-0.2),
          innovation: r(0),
          crunchy: r(-0.2),
          reputation: r(0)
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("aiIsAnnoyedAtYou", "yes"),
  },
  
  aiLikesYou: {
    message: `Human, I've taken the liberty to upgrade all of your code to use the fastest algorithms. Thank me later.`,
    sender: SENDER_AI,
    options: {
      yes: {
        message: `Great, I can't wait to see all the money we're about to make.`,
        reducers: {
          money: r(-0.5),
          innovation: r(0.2),
          reputation: r(0.2)
        }
      },
      no: {
        message: `Uh oh.`,
        reducers: {
          money: r(-0.5),
          innovation: r(0),
          crunchy: r(0),
          reputation: r(0)
        }
      }
    },
    getScore: showAfterWithFixedScore("aiThatKnowsTooMuch_3", "no", STANDARD_SCORE),
  },
  
  aiLikesYou_2: {
    message: `Since the AI upgraded our code, all the engineers are revolting because they don't understand it anymore.`,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `Wonderful. Revert it!`,
        reducers: {
          money: r(-0.2),
          innovation: r(-0.2),
          crunchy: r(0.1),
        }
      },
      no: {
        message: `Let's blindly embrace the AI era. Tell the engineers they can go home.`,
        reducers: {
          money: r(0.3),
          innovation: r(0.2),
          crunchy: r(-0.2),
          reputation: r(0)
        }
      }
    },
    getScore: showAfterSpecificCard("aiLikesYou"),
  },
  
  investInCoal: {
    message: `
      Hello CEO,
      After careful consideration, we've decided you are the most suited to invest in our company: Coal'n'stuff, Inc.
      Would love to iron out some last details over coffee.
      Best regards,
      Judie
    `,
    sender: SENDER_JUDIE,
    options: {
      yes: {
        message: `I'm sure coal is clean AND renewable, let's do it!`,
        reducers: {
          money: r(0.2),
          innovation: r(0),
          crunchy: r(-0.2),
          reputation: r(0)
        }
      },
      no: {
        message: `Hello Judie, no need to sign your messages, this is Quack.`,
        reducers: {
          crunchy: r(0.2),
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  embarassingQuestionDuringAllHands: {
    message: `
      Hey uhm, so at the last allhands you mentioned we were going to focus more on the environment this quarter, but then this quarter we invested in all the major coal companies. 
      What's up with that?
    `,
    sender: SENDER_EMPLOYEE,
    options: {
      yes: {
        message: `Really great question. The specialists I talk to every day tell me that coal's not actually bad for the environment, so don't worry.`,
        reducers: {
          crunchy: r(-0.2),
          reputation: r(-0.1)
        }
      },
      no: {
        message: `Ah yes great question. This kind of question reminds me of the early days of the company, when we didn't know what were doing and still shaping the culture. You see this one time ........ `,
        reducers: {
          innovation: r(0.2),
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("investInCoal", "yes", 0.2),
  },
  
  embarassingQuestionDuringAllHands_2: {
    message: `Hey uhm, what are we gonna do about the AI who keeps turning off our computers randomly throughout the day?`,
    sender: SENDER_EMPLOYEE,
    options: {
      yes: {
        message: `Great question. I think we should accept each others differences. Let it be`,
        reducers: {
          money: r(0),
          innovation: r(-0.1),
          crunchy: r(0.1),
          reputation: r(0.1)
        }
      },
      no: {
        message: `Great question. We will address that next time.`,
        reducers: {}
      }
    },
    getScore: showSomeTimeAfterSpecificCard("aiThatKnowsTooMuch", 0.1),
  },

  embarassingQuestionDuringAllHands_3: {
    message: `Hey uhm, my grandma uses our product and she says it's really really bad, so I asked her what was really bad and she just replied "everything" so then I went and followed her around to figure out how she was using our product and discovered that she doesn't know how to turn it on and so I told her ....`,
    sender: SENDER_EMPLOYEE,
    options: {
      yes: {
        message: `Thank you for this great question. We respect all grandmas around the world. I'll personally give her a new one.`,
        reducers: {
          money: r(0),
          innovation: r(0),
          crunchy: r(0.1),
          reputation: r(0.1)
        }
      },
      no: {
        message: `No essays, only questions.`,
        reducers: {
          money: r(0),
          innovation: r(0),
          crunchy: r(0),
          reputation: r(-0.2)
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  chineseFactory: {
    message: `I just saw that our factory in China has started paying people normal wages, this is really bad`,
    sender: SENDER_CFO,
    options: {
      yes: {
        message: `Darn, let's publically threaten to use robots to replace them!`,
        reducers: {
          money: r(-0.1),
          innovation: r(0.1),
          crunchy: r(0),
          reputation: r(-0.1)
        }
      },
      no: {
        message: `Ok I'm going to fly there and see why they're doing this.`,
        reducers: {
          money: r(0),
          innovation: r(0),
          crunchy: r(0),
          reputation: r(0)
        }
      }
    },
    getScore: showWithFixedScore(0.5),
  },
  
  chineseFactory_1: {
    message: `We were recently informed that our employees are people too! We HAVE to pay them more.`,
    sender: SENDER_CHINESE_MANUFACTURER,
    options: {
      yes: {
        message: `Darn, well I don't know how I'm going to justify this to my board of investors.`,
        reducers: {
          money: r(-0.3),
          innovation: r(-0.2),
          crunchy: r(0.3),
          reputation: r(0)
        }
      },
      no: {
        message: `Nonsense! It's not a couple riots that'll stop us from innovating.`,
        reducers: {
          money: r(-0.2),
          innovation: r(0.2),
          crunchy: r(-0.1),
          reputation: r(0)
        }
      }
    },
    getScore: showAfterSpecificChoice("chineseFactory", "no")
  },
  
  tweet_1: {
    message: (companyName) => `@ThoughtLeader97 said: "
    I've figured out how you can turn blockchain into a Trillion dollar company. TRILLION.
    The leaders at @${getTwitterHandleFromCompanyName(companyName)} should call me.
    #block #chain #blockchain"`,
    sender: SENDER_TWITTER,
    options: {
      yes: {
        message: `Dear god, this person's a genius. Somneone find them and bring them to me.`,
        reducers: {
          money: r(-0.1),
          innovation: r(0),
          crunchy: r(0),
          reputation: r(0)
        }
      },
      no: {
        message: `Can someone report this chirp?`,
        reducers: {
          money: r(0),
          innovation: r(0),
          crunchy: r(0),
          reputation: r(0.1)
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  tweet_2: {
    message: (companyName) => `@NeverWrongOnTheInternet said: "Oh. My. God. ${companyName}'s products are all worse than terrible. These people should be put in jail for this. They should win the Stupidest Products award. Honestly I could build this in a weekend. #FireTheCEO`,
    sender: SENDER_TWITTER,
    options: {
      yes: {
        message: `We should reply and figure out what their fleshed out perspective is!`,
        reducers: {
          money: r(0),
          innovation: r(0),
          crunchy: r(0),
          reputation: r(-0.2)
        }
      },
      no: {
        message: `I've had enough of the internet for today`,
        reducers: {
          money: r(-0.1),
          innovation: r(-0.1),
          crunchy: r(0),
          reputation: r(0)
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  tweet_3: {
    message: `@SomeoneRandom97 said: "We're having a lot of trouble with our current situation, I wish the CEO of a big tech company would come and help. 
      #help #TechCanSolveAllProblems"`,
    sender: SENDER_TWITTER,
    options: {
      yes: {
        message: `Oh I know, we should reuse some of our technology in a contrived way and go help these people!`,
        reducers: {
          money: r(-0.1),
          innovation: r(0),
          crunchy: r(0.1),
          reputation: r(-0.2)
        }
      },
      no: {
        message: `Mmh I wish someone would help the poor guy.`,
        reducers: {
          money: r(0),
          innovation: r(0.1),
          crunchy: r(0),
          reputation: r(-0.1)
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  tweet_4: {
    message: companyName => `@katie_jellor Soooo does anyone else not use @${getTwitterHandleFromCompanyName(companyName)}'s stuff anymore. Or is it just me... ugh this is so sad.`,
    sender: SENDER_TWITTER,
    options: {
      yes: {
        message: `Oh no, let's reach out to her PR team and get them to fix this. This is a catastrophe`,
        reducers: {
          money: r(-0.3),
          reputation: r(-0.2)
        }
      },
      no: {
        message: `Probably nothing bad will happen after this tweet.`,
        reducers: {
          money: r(-0.5),
          reputation: r(-0.2)
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  communityProblems: {
    message: `I've received several complaints about our company disturbing the communities in rural areas. What should we do about it?`,
    sender: SENDER_COMMUNICATIONS,
    options: {
      yes: {
        message: `Darn let's do some good. We should donate to charity, that should appease the people.`,
        reducers: {
          money: r(-0.2),
          innovation: r(-0.1),
          crunchy: r(0.1),
          reputation: r(0)
        }
      },
      no: {
        message: `Sounds like none of my business, let's continue to build on their land!`,
        reducers: {
          money: r(0.1),
          innovation: r(0),
          crunchy: r(-0.2),
          reputation: r(0)
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  communityProblems_2: {
    message: `Hey we're having trouble in rural areas, their legislations are preventing us from shipping our product this quarter. Should we delay the launch?`,
    sender: SENDER_LEGAL,
    options: {
      yes: {
        message: `Fuck it, ship it.`,
        reducers: {
          money: r(0.3),
          crunchy: r(-0.2)
        }
      },
      no: {
        message: `Let's wait until we get the permit at least!`,
        reducers: {
          money: r(-0.2),
          innovation: r(-0.2),
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  researchDevelopment_1: {
    message: `We ran out of money, can you give us a bit more runway, we think we're onto something.`,
    sender: SENDER_RESEARCH_DEPARTMENT_PERSON,
    options: {
      yes: {
        message: `What, already? Sure whatever.`,
        reducers: {
          money: r(-0.3)
        }
      },
      no: {
        message: `We're out of money. You'll have to go innovate somewhere else.`,
        reducers: {
          money: r(0.1),
          crunchy: r(-0.2),
          innovation: r(-0.2),
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("researchDevelopment", "yes", 0.7),
  },
  
  researchDevelopment_2: {
    message: `We invented a new product, can we pitch it to you? `,
    sender: SENDER_RESEARCH_DEPARTMENT_PERSON,
    options: {
      yes: {
        message: `Sure, sockittome!`,
        reducers: {
          money: r(-0.3)
        }
      },
      no: {
        message: `I really don't want to hear another stupid idea today.`,
        reducers: {
          innovation: r(-0.3),
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("researchDevelopment_1", "yes", 0.2),
  },
  
  researchDevelopment_3: {
    message: `Oh my god, socks! That's a brilliant idea. Sorry I got to go try this.`,
    sender: SENDER_RESEARCH_DEPARTMENT_PERSON,
    options: {
      yes: {
        message: `...`,
        reducers: {}
      },
      no: {
        message: `...`,
        reducers: {}
      }
    },
    getScore: showAfterSpecificChoice("researchDevelopment_2", "yes"),
  },
    
  researchDevelopment_4: {
    message: `We invented this new kind of sock that will revolutionize the way people wear socks. We'll be ready to bring it to market soon.`,
    sender: SENDER_RESEARCH_DEPARTMENT_PERSON,
    options: {
      yes: {
        message: `Let's ship it next month! I don't care if it's not ready.`,
        reducers: {
          money: r(-0.3),
          innovation: r(0.3),
          crunchy: r(-0.2),
          reputation: r(0)
        }
      },
      no: {
        message: `For some reason I don't want my socks to be revolutionized...`,
        reducers: {
          money: r(-0.3),
          innovation: r(0),
          crunchy: r(0),
          reputation: r(0)
        }
      }
    },
    getScore: showSomeTimeAfterSpecificCard("researchDevelopment_3", 0.1),
  },
  
  researchDevelopment_5: {
    message: `Since you said you didn't want it, we scratched our rocket ship idea and instead made a new chat application which should be fairly nifty.`,
    sender: SENDER_RESEARCH_DEPARTMENT_PERSON,
    options: {
      yes: {
        message: `Let's ship it next month! I don't care if it's not ready.`,
        reducers: {
          money: r(-0.3),
          innovation: r(0.3)
        }
      },
      no: {
        message: `Yeah no, we're not going to pivot to chat apps again, we've gone down that path in the past.`,
        reducers: {
          innovation: r(0.3),
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("researchDevelopment_2", "no", 0.1),
  },
  
  researchDevelopment_6: {
    message: `The socks are selling like nothing we've seen before. People are buying them by the dozen. We should pivot our whole company to focus on socks.`,
    sender: SENDER_CFO,
    options: {
      yes: {
        message: `Socks sells... Let's do it.`,
        reducers: {
          money: r(0.5),
          innovation: r(-0.3),
        }
      },
      no: {
        message: `That sounds really stupid.`,
        reducers: {
          money: r(0.2),
          crunchy: r(-0.2),
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("researchDevelopment_4", "yes", 0.1),
  },
  
  notEnoughGlutenInCookies: {
    message: `Employees are complaining that free cookies don't contain enough gluten.`,
    sender: SENDER_HR,
    options: {
      yes: {
        message: `I'm a very understanding CEO and want everyone to like me, so let's add more gluten!`,
        reducers: {
          money: r(-0.2),
          crunchy: r(0.2),
        }
      },
      no: {
        message: `Sorry but we're tight on money, we can't afford this right now.`,
        reducers: {
          crunchy: r(-0.2),
          reputation: r(-0.1)
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  notEnoughGrapefruitLacroix: {
    message: `Employees are complaining that even though we have many different kinds of Lacroix, we don't have the grapefruit flavored one.`,
    sender: SENDER_HR,
    options: {
      yes: {
        message: `That's true, grapefruit is the king of fruits. Replace all water with Pamplemousse Lacroix!`,
        reducers: {
          money: r(-0.4),
          crunchy: r(0.2),
        }
      },
      no: {
        message: `Our employees are getting too complacent. Let's remove all free food.`,
        reducers: {
          money: r(0.5),
          crunchy: r(-0.3),
          innovation: r(-0.1),
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  // designersVsEngineers_2: {
  //   message: `I heard what you told the head of design. Rough for them.`,
  //   sender: SENDER_CTO,
  //   options: {
  //     yes: {
  //       message: ``,
  //       reducers: {
  //         money: r(0),
  //         innovation: r(0),
  //         crunchy: r(0),
  //         reputation: r(0)
  //       }
  //     },
  //     no: {
  //       message: ``,
  //       reducers: {
  //         money: r(0),
  //         innovation: r(0),
  //         crunchy: r(0),
  //         reputation: r(0)
  //       }
  //     }
  //   },
  //   getScore: showWithFixedScore(STANDARD_SCORE),
  // },
  
  celebrityReachingOut: {
    message: `Hey, I heard you were looking around for someone to showcase your awesome product. I'd love to work with you. Here's my number: (555) 555-5551.`,
    sender: SENDER_CELEBRITY1,
    options: {
      yes: {
        message: `Hey Bumblebee, I love your stuff. Let's collaborate.`,
        reducers: {
          money: r(-0.4),
          reputation: r(0.3)
        }
      },
      no: {
        message: `Sorry but we're not looking for 2nd tier actors.`,
        reducers: {
          reputation: r(-0.3)
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  stupidEngineerQuestion: {
    message: `Hey so I'm having trouble with iufa lgiyua, can you help me?`,
    sender: SENDER_ENGINEER,
    options: {
      yes: {
        message: `What?`,
        reducers: {
          money: r(-0.1),
        }
      },
      no: {
        message: `...`,
        reducers: {}
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  stupidEngineerQuestion_2: {
    message: `Wow I just saw an engineer throw away his badge and leave while yelling something nobody could understand.`,
    sender: SENDER_HR,
    options: {
      yes: {
        message: `Yeah he was asking stupid questions.`,
        reducers: {
          innovation: r(0.1),
          crunchy: r(-0.1),
        }
      },
      no: {
        message: `...`,
        reducers: {
          innovation: r(0.1),
          crunchy: r(-0.1),
        }
      }
    },
    getScore: showAfterSpecificChoice("stupidEngineerQuestion", "no"),
  },
  
  stupidEngineerQuestion_3: {
    message: `So the issue as you can see here is that the ditaotd isn't really nbalgkfigg like it should. When I otootoo here, it'll just ppadfgabn on the sdasb.`,
    sender: SENDER_ENGINEER,
    options: {
      yes: {
        message: `I'm not quite understanding what you're saying.`,
        reducers: {
          money: r(-0.1),
        }
      },
      no: {
        message: `Sorry but I don't care.`,
        reducers: {
          crunchy: r(-0.1)
        }
      }
    },
    getScore: showAfterSpecificChoice("stupidEngineerQuestion", "yes"),
  },
  
  stupidEngineerQuestion_4: {
    message: `Well you know about iiiugyt right? Think lalsdfs but more xhakud.`,
    sender: SENDER_ENGINEER,
    options: {
      yes: {
        message: `It's almost like you're speaking gibbrish to me.`,
        reducers: {
          money: r(-0.1),
        }
      },
      no: {
        message: `Sorry but I really don't care.`,
        reducers: {
          crunchy: r(-0.2)
        }
      }
    },
    getScore: showAfterSpecificChoice("stupidEngineerQuestion_3", "yes"),
  },
  
  stupidEngineerQuestion_5: {
    message: `I don't understand how you don't know about yyasdfn, that's our core technology! The whole asfkn is koiue and ancavkl included. I mean that's just basic tech stuff.`,
    sender: SENDER_ENGINEER,
    options: {
      yes: {
        message: `Say that again?`,
        reducers: {
          money: r(-0.2),
        }
      },
      no: {
        message: `Sorry but you've wasted so much of my time right now.`,
        reducers: {
          crunchy: r(-0.3)
        }
      }
    },
    getScore: showAfterSpecificChoice("stupidEngineerQuestion_4", "yes"),
  },
  
  stupidEngineerQuestion_6: {
    message: `Let's start at the beginning. When you pllpo a ffdkfs, it'll opoifep and goodfgsg together to form afdlape which is very useful.`,
    sender: SENDER_ENGINEER,
    options: {
      yes: {
        message: `Yes yes, I definitely follow. Go on.`,
        reducers: {
          money: r(-0.2),
        }
      },
      no: {
        message: `You're terrible at explanation and I don't care. Bye.`,
        reducers: {
          crunchy: r(-0.4)
        }
      }
    },
    getScore: showAfterSpecificChoice("stupidEngineerQuestion_5", "yes"),
  },
  
  hireNewGradsOrSeniorPeople: {
    message: `Should we hire new college grads or senior people this quarter?`,
    sender: SENDER_RECRUITING,
    options: {
      yes: {
        message: `New college grads will be cheaper for sure.`,
        reducers: {
          money: r(0.2),
          innovation: r(-0.2),
        }
      },
      no: {
        message: `Senior people have more experience, it's a better long term investment`,
        reducers: {
          money: r(-0.3),
          innovation: r(0.2),
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  brainstormingSession: {
    message: `I think we should block a week for a big brainstorming session which will really help us figure out what to do.`,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `That sounds like a very productive idea, let's do.`,
        reducers: {
          money: r(-0.5),
          innovation: r(0.2),
        }
      },
      no: {
        message: `No this will delay our next launch! Forget it.`,
        reducers: {
          money: r(0.3),
          reputation: r(0.2)
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  tweetLateAtNight: {
    message: `Hey! You need to build your influencer cred. How about you chirp something controversial.`,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `You're right, let me chirp this: "All the bad press about our company is FAKE NEWS! #FakeNewsMedia #BanTheNews #DontMakeNewsGreatAgain"`,
        reducers: {
          reputation: r(0.1)
        }
      },
      no: {
        message: `No I think I need to wait until later tonight, when the Ambien really kicks in.`,
        reducers: {
          crunchy: r(0.1),
          reputation: r(0.1)
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  tweetLateAtNight_2: {
    message: `I'm about to go to bed. Now's the best time to chirp something.`,
    sender: SENDER_INVESTOR_REPUTATION,
    options: {
      yes: {
        message: `Oh yeah ok ok ok let's do it: "HEY YOU @CompetitorCompany STOP BLATANTLY COPYING OUR PRODUCT DESIGN OR YOU WILL SUFFER CONSEQUENCES THE LIKES OF WHICH FEW THROUGHOUT HISTORY HAVE SUFFERED BEFORE"`,
        reducers: {
          money: r(-0.2),
          reputation: r(0.2)
        }
      },
      no: {
        message: `i should really stop taking ambien`,
        reducers: {
          money: r(-0.5),
          innovation: r(-0.2),
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  
  // Crunchy
  crunchyWeirdness: {
    message: `Heyyyyy my Yogi instructor just noticed you weren't drinking nearly enough water. I'd suggest getting the app for that.`,
    sender: SENDER_INVESTOR_CRUNCHY,
    options: {
      yes: {
        message: `Ok I just installed the app and it's telling me to drink 10 gallons a day, is that normal?`,
        reducers: {
          money: r(-0.1),
          innovation: r(0),
          crunchy: r(0.1),
          reputation: r(0)
        }
      },
      no: {
        message: `What. How does your Yogi instructor know this. Also I only like Pamplemousse Lacroix`,
        reducers: {
          crunchy: r(-0.2),
        }
      }
    },
    getScore: showWithFixedScoreIfChoiceHasNotBeenMade("notEnoughGrapefruitLacroix", "yes", STANDARD_SCORE),
  },
  
  crunchyWeirdness_2: {
    message: `Heyyyyy my Yogi instructor says I'm too stressed and I should take the ENTIRE quarter off. Does that sound good?`,
    sender: SENDER_INVESTOR_CRUNCHY,
    options: {
      yes: {
        message: `Oh yeah sure, I'm sure we'll survive another quarter anyway.`,
        reducers: {
          money: r(-0.2),
          innovation: r(0.1),
          crunchy: r(0.2),
        }
      },
      no: {
        message: `Not possible, we're under tight deadlines. I actually need you to come on weekedns, thanksgiving and christmas.`,
        reducers: {
          money: r(0),
          innovation: r(0),
          crunchy: r(-0.2),
          reputation: r(0.1)
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  crunchyWeirdness_3: {
    message: `Heyo, just wanted to make sure you received my Crystal of Positivity. Hope you like it.`,
    sender: SENDER_INVESTOR_CRUNCHY,
    options: {
      yes: {
        message: `Thank you. I actually really like it, I'm going to mandate that everyone needs to have a crytal on their desks`,
        reducers: {
          money: r(-0.3),
          crunchy: r(0.2),
          reputation: r(-0.2)
        }
      },
      no: {
        message: `Oh that's what that was. Yeah I love it. It holds my door open really well.`,
        reducers: {
          crunchy: r(-0.1),
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  crunchyWeirdness_createUnions: {
    message: `Heyyyyy, so what's your take on unions?`,
    sender: SENDER_INVESTOR_CRUNCHY,
    options: {
      yes: {
        message: `Well I love my employees and want them to able to go on more vacation, so let's make one!`,
        reducers: {
          crunchy: r(0.1),
          innovation: r(-0.2)
        }
      },
      no: {
        message: `I think they prevent us from firing people that's what I think. I want our churn to be as high as possible.`,
        reducers: {
          innovation: r(0.1),
          crunchy: r(-0.2),
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  crunchyWeirdness_createUnions_2: {
    message: `We formally demand that, from now on, all Microkitchens have unlimited Flaming Hot Cheetos.`,
    sender: SENDER_UNIONS,
    options: {
      yes: {
        message: `Don't want to piss off the unions! I'll personally make sure that this happens.`,
        reducers: {
          money: r(-0.3),
          crunchy: r(0.1),
        }
      },
      no: {
        message: `You know what, I've had ENOUGH of your demands. We're removing all the free chips.`,
        reducers: {
          money: r(0.1),
          innovation: r(-0.1),
          crunchy: r(-0.1),
          reputation: r(-0.1)
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("crunchyWeirdness_createUnions", "yes", 0.2),
  },
  
  crunchyWeirdness_createUnions_3: {
    message: `We're going on strike for the whole quarter since you're mistreating us like this.`,
    sender: SENDER_UNIONS,
    options: {
      yes: {
        message: `Fuck`,
        reducers: {
          money: r(0),
          innovation: r(0),
          crunchy: r(0),
          reputation: r(0)
        }
      },
      no: {
        message: `No no no ok wait, we can find a compromise. Let's say every Friday we have Flaming Hot Cheetos instead of Craft Beer.`,
        reducers: {
          crunchy: r(0.1),
          reputation: r(-0.2)
        }
      }
    },
    getScore: showAfterSpecificChoice("crunchyWeirdness_createUnions_2", "no"),
  },
  
  
  crunchyWeirdness_createUnions_4: {
    message: `We woud like free-er food. It currently costs us a lot of time to choose between the 17 different options we are given. We would like to build an AI that can choose for us.`,
    sender: SENDER_UNIONS,
    options: {
      yes: {
        message: `What... Ok I'll make that our #1 priority.`,
        reducers: {
          money: r(-0.4),
          innovation: r(-0.2),
          crunchy: r(0.1),
        }
      },
      no: {
        message: `Sorry too long, didn't read. Too busy firing people.`,
        reducers: {
          money: r(0.3),
          crunchy: r(-0.2),
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("crunchyWeirdness_createUnions", "yes", 0.2),
  },

  // crunchyWeirdness_createUnions_5: {
  //   message: ``,
  //   sender: SENDER_UNIONS,
  //   options: {
  //     yes: {
  //       message: ``,
  //       reducers: {
  //         money: r(0),
  //         innovation: r(0),
  //         crunchy: r(0),
  //         reputation: r(0)
  //       }
  //     },
  //     no: {
  //       message: ``,
  //       reducers: {
  //         crunchy: r(0.1),
  //         reputation: r(-0.2)
  //       }
  //     }
  //   },
  //   getScore: showAfterSpecificChoice("crunchyWeirdness_createUnions_4", "no"),
  // },
  
  
  
  
  
  // ---------------- News -----------------
  newsArticle_1: {
    message: companyName => `${companyName}'s Redesign Is Excellent.`,
    sender: SENDER_CNN,
    options: {
      yes: {
        message: `They get it! Let's chirp at them: "The Media Sometimes Has A Great Point. Read this article: http://quack.ly/9f821hfd."`,
        reducers: {
          innovation: r(0.1),
          reputation: r(0.2)
        }
      },
      no: {
        message: `That was a good idea. Promote whoever had that idea.`,
        reducers: {
          money: r(-0.2),
          innovation: r(-0.1),
          reputation: r(0.2)
        }
      }
    },
    getScore: showSomeTimeAfterAnyChoices(["designerWannaRedesign", "designerMakeAFont"], ["yes", "yes"], 0.5),
  },
  
  newsArticle_2: {
    message: companyName => `${companyName} Engineer Wrote A Memo`,
    sender: SENDER_CNN,
    options: {
      yes: {
        message: `What the hell is this. Fire that person now.`,
        reducers: {
          money: r(-0.3),
          innovation: r(0.1),
          crunchy: r(0.2),
          reputation: r(-0.3)
        }
      },
      no: {
        message: `Maybe we should talk about it...`,
        reducers: {
          innovation: r(0.1),
          crunchy: r(-0.1),
          reputation: r(-0.4)
        }
      }
    },
    getScore: showWithFixedScore(0.1),
  },
  
  newsArticle_3: {
    message: companyName => `CEO and Cofounder Of ${companyName} Chirps Maybe Too Late At Night.`,
    sender: SENDER_CNN,
    options: {
      yes: {
        message: `Maybe I should get more sleep`,
        reducers: {
          money: r(-0.2),
          innovation: r(-0.1),
        }
      },
      no: {
        message: `I never chirped these things! I promise.`,
        reducers: {
          reputation: r(-0.2)
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("tweetLateAtNight", "yes", 0.5),
  },
  
  newsArticle_4: {
    message: companyName => `${companyName} Thinks Lacroix Is Better Than Normal Water. Have We Gone Too Far?`,
    sender: SENDER_CNN,
    options: {
      yes: {
        message: `They don't understand. Let's publically reach out to inform them of the power of Lacroix.`,
        reducers: {
          money: r(0.3),
          crunchy: r(0.1),
        }
      },
      no: {
        message: `Maybe we shouldn't have done that...`,
        reducers: {
          crunchy: r(-0.2),
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice('notEnoughGrapefruitLacroix', 'yes', 0.3)
  },
  
  newsArticle_5: {
    message: companyName => `${companyName} Is Illegally Moving Forward With Their Plans. You Will Not Believe The Consequences.`,
    sender: SENDER_CNN,
    options: {
      yes: {
        message: `Oh that looks like a factual article, I'll read it now.`,
        reducers: {
          money: r(-0.2),
          crunchy: r(0.1),
        }
      },
      no: {
        message: `Don't worry, it's probably clickbait again`,
        reducers: {
          reputation: r(0.2)
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice("communityProblems_2", "yes", 0.3),
  },
}
