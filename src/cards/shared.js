import { getRandomFace } from "../avatars/templates";
import InvestorBro from "../avatars/templates/investors/investor_bro";
import InvestorFuturist from "../avatars/templates/investors/investor_futurist";
import InvestorHippie from "../avatars/templates/investors/investor_hippie";

export const MUST_SHOW_SCORE = Infinity;
export const DO_NOT_SHOW_SCORE = 0;
export const STANDARD_SCORE = 1;

export function showAfterSpecificChoice(cardId, optionId) {
  return state => hasMadeChoice(state, cardId, optionId) ? MUST_SHOW_SCORE : DO_NOT_SHOW_SCORE;
}

export function showAfterSpecificCard(cardId) {
  return state => state.pastChoices.some(choice => choice.cardId === cardId) ? MUST_SHOW_SCORE : DO_NOT_SHOW_SCORE;
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
  face: getRandomFace(),
};

export const SENDER_ENTREPRENEUR = {
  name: 'Entrepreneur',
  face: getRandomFace(),
};

export const SENDER_LEGAL = {
  name: 'Legal',
  face: getRandomFace(),
};

export const SENDER_CFO = {
  name: 'CFO',
  face: getRandomFace(),
};

export const SENDER_DESIGNER = {
  name: 'Lead designer',
  face: getRandomFace(),
};

export const SENDER_CTO = {
  name: 'CTO',
  face: getRandomFace(),
};

export const SENDER_THOUGHT_LEADER = {
  name: 'Thought Leader',
  face: getRandomFace(),
};

export const SENDER_COMMUNICATIONS = {
  name: 'CMO',
  face: getRandomFace(),
};

export const SENDER_EMAIL = {
  name: 'Mail',
  face: getRandomFace(),
};

export const SENDER_CHEF = {
  name: 'Head Chef',
  face: getRandomFace(),
};

export const SENDER_INVESTOR_INNOVATION = {
  name: 'TODO: "innovation" investor',
  face: {
    Component: InvestorFuturist,
    props: {},
  },
};

export const SENDER_INVESTOR_REPUTATION = {
  name: 'TODO: "reputation" investor',
  face: {
    Component: InvestorBro,
    props: {},
  },
};

export const SENDER_INVESTOR_CRUNCHY = {
  name: 'TODO: "crunchy" investor',
  face: {
    Component: InvestorHippie,
    props: {},
  },
};

export const SENDER_HEAD_OF_OFFICE_SECURITY = {
  name: 'Head of Office Security',
  face: getRandomFace(),
};

export const SENDER_HEAD_OF_FACILITIES = {
  name: 'Head of Facilities',
  face: getRandomFace(),
};

export const SENDER_AI = {
  name: 'AI',
  face: getRandomFace(),
};

export const SENDER_EMPLOYEE = {
  name: getEmployeeName(),
  face: getRandomFace(),
};

export const SENDER_JUDIE = {
  name: "Judie",
  face: getRandomFace(),
};

export const SENDER_CHINESE_MANUFACTURER = {
  name: "Chinese Manufacturer",
  face: getRandomFace(),
};

export const SENDER_TWITTER = {
  name: "Chirper",
  face: getRandomFace(),
};



export const r = (quantity) => (val) => val + quantity;

export function getEmployeeName() {
  const r = Math.random();
  const possibleNames = [
    "Bob",
    "Alice",
    "Cal",
    "Al",
    "Ben",
    "Wen",
    "Gertrude",
    "Sam",
    "Imram",
    "Arjun",
  ];
  return possibleNames[Math.floor(r * possibleNames.length)];
}

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

export function getTwitterHandleFromCompanyName(companyName) {
  return companyName.split(" ").join("_").replace(/'"\.,;/g, '')
}
