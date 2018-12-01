const MUST_SHOW_SCORE = Infinity;
const DO_NOT_SHOW_SCORE = 0;

function showAfterSpecificChoice(cardId, optionId) {
  return state => hasMadeChoice(state, cardId, optionId) ? MUST_SHOW_SCORE : DO_NOT_SHOW_SCORE;
}

function hasSeenCard(state, cardId) {
  return state.pastChoices.some(choice => choice.cardId === cardId);
}

function hasMadeChoice(state, cardId, optionId) {
  return state.pastChoices.some(choice => (
    choice.cardId === cardId && choice.optionId === optionId
  ));
}

const SENDER_FRIEND = {
  name: 'Friendo',
};

export default {
  helloWorld: {
    message: 'yo sup',
    sender: SENDER_FRIEND,
    options: {
      sayHello: {
        message: 'Hello,',
        reducers: {},
      },
      sayWorld: {
        message: 'world!',
        reducers: {},
      },
    },
    getScore(state) {
      return Math.random();
    },
  },
  someOtherCard: {
    message: 'how is the weather?',
    sender: SENDER_FRIEND,
    options: {
      friendly: {
        message: 'it is nice',
        reducers: {
          money: val => val + 1e7,
        },
      },
      sassy: {
        message: 'dude wow',
        reducers: {
          money: val => val - 1e7,
        },
      },
    },
    getScore(state) {
      return Math.random();
    },
  },
  sassyWeatherResponse: {
    message: 'dude im just asking what the weather is like',
    sender: SENDER_FRIEND,
    options: {
      sayHello: {
        message: 'whatever',
        reducers: {},
      },
      sayWorld: {
        message: 'im sorry',
        reducers: {},
      },
    },
    getScore: showAfterSpecificChoice('someOtherCard', 'sassy'),
  },
  gameOver: {
    message: 'game over!',
    sender: SENDER_FRIEND,
    options: {
      sayCool: {
        message: 'cool',
        reducers: {},
      },
      sayWhatevs: {
        message: 'whatevs',
        reducers: {},
      },
    },
    getScore(state) {
      return 0;
    },
  },
};
