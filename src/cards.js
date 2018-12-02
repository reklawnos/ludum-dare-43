const MUST_SHOW_SCORE = Infinity;
const DO_NOT_SHOW_SCORE = 0;

const STANDARD_SCORE = 1;

function showAfterSpecificChoice(cardId, optionId) {
  return state => hasMadeChoice(state, cardId, optionId) ? MUST_SHOW_SCORE : DO_NOT_SHOW_SCORE;
}

function showSomeTimeAfterSpecificChoice(cardId, optionId, increasePerTurn) {
  return state => {
    const idx = indexOfChoice(state, cardId, optionId);
    if (indexOfChoice < 0) {
      return DO_NOT_SHOW_SCORE;
    }
    return (state.pastChoices.length - idx) * increasePerTurn;
  };
}

function showWithFixedScore(score) {
  return () => score;
}

function hasSeenCard(state, cardId) {
  return state.pastChoices.some(choice => choice.cardId === cardId);
}

function hasMadeChoice(state, cardId, optionId) {
  return state.pastChoices.some(choice => (
    choice.cardId === cardId && choice.optionId === optionId
  ));
}

function indexOfChoice(state, cardId, optionId) {
  return state.pastChoices.findIndex(choice => (
    choice.cardId === cardId && choice.optionId === optionId
  ));
}

const SENDER_FRIEND = {
  name: 'Friend',
};

const SENDER_ENTREPRENEUR = {
  name: 'Entrepreneur',
};

const SENDER_LEGAL = {
  name: 'Legal',
};

const SENDER_CFO = {
  name: 'CFO',
};

const SENDER_DESIGNER = {
  name: 'Lead designer',
};


const SENDER_CTO = {
  name: 'CTO',
};

const SENDER_THOUGHT_LEADER = {
  name: 'Thought Leader'
};

const SENDER_COMMUNICATIONS = {
  name: 'Marketing Manager'
};

const SENDER_EMAIL = {
  name: 'Mail'
};

const r = (quantity) => (val) => val + quantity;

function getRandomTechBuzzword() {
  let r = Math.random();
  if (r < 0.1) {
    return "Elecric cars";
  } else if (r < 0.2) {
    return "Augmented Reality";
  } else if (r < 0.3) {
    return "Blockchain";
  } else if (r < 0.4) {
    return "Voice AI";
  } else if (r < 0.5) {
    return "Machine Learning";
  } else if (r < 0.6) {
    return "Solar Panels";
  } else if (r < 0.7) {
    return "Tunnels";
  } else if (r < 0.8) {
    return "Virtual Reality";
  } else if (r < 0.9) {
    return "Chatbots";
  } else if (r < 1.0) {
    return "Rockets"
  }
}

export default {
  drinksWithAnEntrepreneur_1: {
    message: `Hey, I saw your cool tech! Let's chat about it over drinks!`,
    sender: SENDER_ENTREPRENEUR,
    options: {
      yes: {
        message: `Yeah, let's do it!`,
        reducers: {},
      },
      no: {
        message: `I'll pass.`,
        reducers: {
          reputation: val => val - 0.1,
        },
      },
    },
    getScore(state) {
      return STANDARD_SCORE;
    },
  },

  drinksWithAnEntrepreneur_2: {
    message: `This bar is so cool! Wanna do shots and talk about our tech?`,
    sender: SENDER_ENTREPRENEUR,
    options: {
      yes: {
        message: `Shots, baby!`,
        reducers: {
          money: val => val + 0.1,
        },
      },
      no: {
        message: `Nah, I'm on a no-alchohol cleanse`,
        reducers: {
          reputation: val => val - 0.1,
          crunchy: val => val + 0.1,
        },
      },
    },
    getScore: showAfterSpecificChoice('drinksWithAnEntrepreneur_1', 'yes'),
  },

  drinksWithAnEntrepreneur_3: {
    message: `
      Hey you remember that entreprenur you had drinks yet?
      Now their tech looks suspciciously like the stuff we patented...
    `,
    sender: SENDER_LEGAL,
    options: {
      sueThem: {
        message: `Sue them to hell!`,
        reducers: {
          reputation: val => val - 0.1,
          money: val => val + 0.1,
        },
      },
      doNothing: {
        message: `Ugh, it's ok...`,
        reducers: {
          money: val => val - 0.2,
        },
      },
    },
    getScore: showSomeTimeAfterSpecificChoice('drinksWithAnEntrepreneur_2', 'yes', 0.1),
  },

  cfoKillProduct: {
    message: `Hey, we're losing too much money. We should kill some legacy projects.`,
    sender: SENDER_CFO,
    options: {
      yes: {
        message: `Kill away!`,
        reducers: {
          crunchy: val => val - 0.1,
          money: val => val + 0.1,
        },
      },
      no: {
        message: `We can't, some people DEPEND on those products!`,
        reducers: {
          crunchy: val => val + 0.1,
          money: val => val - 0.1,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  designerMakeAFont: {
    message: `
      Yo, we decided that Helvetica just doesn't cut it.
      Whaddya say we hire a company to build a custom font for us?
    `,
    sender: SENDER_LEGAL,
    options: {
      yes: {
        message: `I mean, we're not a real startup if we don't have our own font.`,
        reducers: {
          crunchy: val => val + 0.1,
          money: val => val - 0.2,
        },
      },
      no: {
        message: `Psh, let's just use Times New Roman instead.`,
        reducers: {
          reputation: val => val + 0.1,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },

  basicSecurityLeak: {
    message: `Dear lord, we've leaked a few thousand passwords! What should we do?`,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `This will not stand, FIRE THE VP OF SECURITY!`,
        reducers: {
          innovation: val => val - 0.1,
          reputation: val => val + 0.1,
        },
      },
      no: {
        message: `Let's put out a press release apology`,
        reducers: {
          reputation: val => val - 0.2,
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  thoughtLeaderProgrammer_1: {
    message: `Hey, this "Thought Leader" on twitter wants to talk to you.`,
    sender: SENDER_COMMUNICATIONS,
    options: {
      yes: {
        message: `Sure, let's grab coffee.`,
        reducers: {}
      },
      no: {
        message: `Nah, I don't have time for this`,
        reducers: {
          innovation: r(-0.1)
        }
      }
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  
  thoughtLeaderProgrammer_2: {
    message: `Ok so let me tell you, I'm an expert in ${getRandomTechBuzzword()} and I'm sure that's the future. Pay me and I'll tell you how to be the first to market.`,
    sender: SENDER_THOUGHT_LEADER,
    options: {
      yes: {
        message: `Oh yeah you totally sound like you know what you're talking about.`,
        reducers: {
          money: r(-0.2),
          innovation: r(0.2)
        }
      },
      no: {
        message: `Sorry I don't have time for this, I gotta go to a meeting.`,
        reducers: {
          innovation: r(-0.1)
        }
      }
    },
    getScore: showAfterSpecificChoice('thoughtLeaderProgrammer_1', 'yes'),
  },
  
  thoughtLeaderProgrammer_3: {
    message: `blablabla ... blablablablablabla ...`,
    sender: SENDER_THOUGHT_LEADER,
    options: {
      yes: {
        message: `Ah yes yes, I understand.`,
        reducers: {}
      },
      no: {
        message: `Mmmh`,
        reducers: {}
      }
    },
    getScore: showAfterSpecificChoice('thoughtLeaderProgrammer_2', 'yes'),
  },
  
  linkedInPhishing: {
    message: `LinkedIn: You have a new connecion from Blarb Shurl`,
    sender: SENDER_EMAIL,
    options: {
      yes: {
        message: `Accept connection`,
        reducers: {}
      },
      no: {
        message: `Refuse connection`
      }
    },
    getScore: (state) => {
      if (state.stateSlices.reputation > 0.75) {
        return 1.5
      } else {
        return 0.5
      }
    }
  },
  
  linkedInPhishing_2: {
    message: `
      We just got hacked! Our systems are down and we lost a bunch of data. 
      Did anybody see any LinkedIn invites recently?
    `,
    sender: SENDER_CTO,
    options: {
      yes: {
        message: `Ooh that's what that was about`,
        reducers: {
          money: r(-0.2),
          innovation: r(-0.2),
          crunchy: r(-0.2),
        }
      },
      no: {
        message: `I really have no idea what you're talking about.`,
        reducers: {
          money: r(-0.2),
          innovation: r(-0.2),
          crunchy: r(-0.2),
        }
      }
    },
    getScore: showSomeTimeAfterSpecificChoice('linkedInPhishing', 'yes', 0.2),
  },
  
  
  
};
