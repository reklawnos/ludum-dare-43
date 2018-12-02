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
};
