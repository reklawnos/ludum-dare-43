export const MUST_SHOW_SCORE = Infinity;
export const DO_NOT_SHOW_SCORE = 0;
export const STANDARD_SCORE = 1;

export function showAfterSpecificChoice(cardId, optionId) {
  return state => hasMadeChoice(state, cardId, optionId) ? MUST_SHOW_SCORE : DO_NOT_SHOW_SCORE;
}

export function showSomeTimeAfterSpecificChoice(cardId, optionId, increasePerTurn) {
  return state => {
    const idx = indexOfChoice(state, cardId, optionId);
    if (idx < 0) {
      return DO_NOT_SHOW_SCORE;
    }
    return (state.pastChoices.length - idx) * increasePerTurn;
  };
}

export function showSomeTimeAfterSpecificCard(cardId, increasePerTurn) {
  return state => {
    const idx = state.pastChoices.findIndex(choice => choice.cardId === cardId);
    if (idx < 0) {
      return DO_NOT_SHOW_SCORE;
    }
    return (state.pastChoices.length - idx) * increasePerTurn;
  };
}

export function showSomeTimeAfterAllChoices(cardIds, optionIds, increasePerTurn) {
  return state => {
    let lastChoiceYouMade = cardIds.reduce((acc, cardId, index) => {
      if (acc < 0 && index != 0) return -1;
      
      let optionId = optionIds[index];
      const idx = indexOfChoice(state, cardId, optionId);
      if (idx < 0) return -1;
      
      if (idx > acc) {
        return idx;
      }
      
      return acc;
    }, -1);
    
    if (lastChoiceYouMade < 0) {
      return DO_NOT_SHOW_SCORE;
    }
    return (state.pastChoices.length - lastChoiceYouMade) * increasePerTurn;
  };
}

export function showWithFixedScore(score) {
  return () => score;
}
export function showAfterWithFixedScore(cardId, optionId, score) {
  return state => {
    const idx = state.pastChoices.findIndex(choice => (choice.cardId === cardId && choice.optionId === optionId));
    if (idx < 0) {
      return DO_NOT_SHOW_SCORE;
    }
    return score;
  }
}

export function hasSeenCard(state, cardId) {
  return state.pastChoices.some(choice => choice.cardId === cardId);
}

export function hasMadeChoice(state, cardId, optionId) {
  return state.pastChoices.some(choice => (choice.cardId === cardId && choice.optionId === optionId));
}

export function indexOfChoice(state, cardId, optionId) {
  return state.pastChoices.findIndex(choice => (choice.cardId === cardId && choice.optionId === optionId));
}

export const SENDER_FRIEND = {
  name: 'Friend',
};

export const SENDER_ENTREPRENEUR = {
  name: 'Entrepreneur',
};

export const SENDER_LEGAL = {
  name: 'Legal',
};

export const SENDER_CFO = {
  name: 'CFO',
};

export const SENDER_DESIGNER = {
  name: 'Lead designer',
};

export const SENDER_CTO = {
  name: 'CTO',
};

export const SENDER_THOUGHT_LEADER = {
  name: 'Thought Leader'
};

export const SENDER_COMMUNICATIONS = {
  name: 'Marketing Manager'
};

export const SENDER_EMAIL = {
  name: 'Mail'
};

export const SENDER_CHEF = {
  name: 'Head Chef',
};

export const SENDER_INVESTOR_INNOVATION = {
  name: 'TODO: "innovation" investor',
};

export const SENDER_INVESTOR_REPUTATION = {
  name: 'TODO: "reputation" investor',
};

export const SENDER_INVESTOR_CRUNCHY = {
  name: 'TODO: "crunchy" investor',
};

export const SENDER_HEAD_OF_OFFICE_SECURITY = {
  name: 'Head of Office Security',
};

export const SENDER_AI = {
  name: 'AI',
};



export const r = (quantity) => (val) => val + quantity;

export function getRandomTechBuzzword() {
  let r = Math.random();
  if (r < 0.1) {
    return "Elecric cars";
  }
  else if (r < 0.2) {
    return "Augmented Reality";
  }
  else if (r < 0.3) {
    return "Blockchain";
  }
  else if (r < 0.4) {
    return "Voice AI";
  }
  else if (r < 0.5) {
    return "Machine Learning";
  }
  else if (r < 0.6) {
    return "Solar Panels";
  }
  else if (r < 0.7) {
    return "Tunnels";
  }
  else if (r < 0.8) {
    return "Virtual Reality";
  }
  else if (r < 0.9) {
    return "Chatbots";
  }
  else if (r < 1.0) {
    return "Rockets";
  }
}
