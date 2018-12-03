import { getRandomFace, getRandomFormalFace } from "../avatars/templates";
import InvestorBro from "../avatars/templates/investors/investor_bro";
import InvestorFuturist from "../avatars/templates/investors/investor_futurist";
import InvestorHippie from "../avatars/templates/investors/investor_hippie";
import ChirperIcon from "../avatars/ChirperIcon.jsx";
import WwnIcon from "../avatars/WwnIcon";

export const MUST_SHOW_SCORE = Infinity;
export const DO_NOT_SHOW_SCORE = 0;
export const STANDARD_SCORE = 1;

export const LONGER_STORY_SCORE = 1.5;

export function showAfterSpecificChoice(cardId, optionId) {
  return state => hasMadeChoice(state, cardId, optionId) ? MUST_SHOW_SCORE : DO_NOT_SHOW_SCORE;
}

export function showWithFixedScoreIfChoiceHasNotBeenMade(cardId, optionId, score) {
  return state => hasMadeChoice(state, cardId, optionId) ? DO_NOT_SHOW_SCORE : score;
}

export function showAfterSpecificCard(cardId) {
  return state => state.pastChoices.some(choice => choice.cardId === cardId) ? MUST_SHOW_SCORE : DO_NOT_SHOW_SCORE;
}

export function showAfterAnyCard(cardIds) {
  return state => state.pastChoices.some(choice => cardIds.includes(choice.cardId)) ? MUST_SHOW_SCORE : DO_NOT_SHOW_SCORE;
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

export function showSomeTimeAfterAnyChoices(cardIds, optionIds, increasePerTurn) {
  return state => {
    let firstChoiceYouMade = cardIds.reduce((acc, cardId, index) => {
      let optionId = optionIds[index];
      const idx = indexOfChoice(state, cardId, optionId);

      if (idx > -1 && idx < acc) {
        return idx;
      }
      
      return acc;
    }, -1);
    
    if (firstChoiceYouMade < 0) {
      return DO_NOT_SHOW_SCORE;
    }
    return (state.pastChoices.length - firstChoiceYouMade) * increasePerTurn;
  };
}

export function showAfterAnyChoices(cardIds, optionIds) {
  return state => {
    let lastChoiceYouMade = cardIds.reduce((acc, cardId, index) => {
      let optionId = optionIds[index];
      const idx = indexOfChoice(state, cardId, optionId);
      
      if (idx > acc) {
        return idx;
      }
      
      return acc;
    }, -1);
    
    if (lastChoiceYouMade < 0) {
      return DO_NOT_SHOW_SCORE;
    }
    return MUST_SHOW_SCORE;
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
  name: 'XT-9',
  face: {
    Component: InvestorFuturist,
    bgcolor: "linear-gradient(#2c89a0 0%, #afdde9 100%)",
    props: {},
  },
};

export const SENDER_INVESTOR_REPUTATION = {
  name: 'Brad',
  face: {
    Component: InvestorBro,
    bgcolor: "linear-gradient(#784421 0%, #e9c6af 100%)",
    props: {},
  },
};

export const SENDER_INVESTOR_CRUNCHY = {
  name: 'Sandra',
  face: {
    Component: InvestorHippie,
    bgcolor: "linear-gradient(#5aa02c 0%, #c6e9af 100%)",
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

export const SENDER_EMPLOYEE2 = {
  name: getEmployeeName(),
  face: getRandomFace(),
};

export const SENDER_EMPLOYEE3 = {
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
  name: "Chirper Bot",
  face: {
    Component: ChirperIcon,
    bgcolor: "#2ad4ff",
    paddingTop: 0.12,
    paddingBottom: 0.08,
    props: {},
  },
};

export const SENDER_TRANSLATOR = {
  name: "Translator",
  face: getRandomFace(),
};

export const SENDER_SENATOR1 = {
  name: "Senator McBob",
  face: getRandomFormalFace(),
};

export const SENDER_SENATOR2 = {
  name: "Senator Jenkins",
  face: getRandomFormalFace(),
};

export const SENDER_SENATOR3 = {
  name: "Senator Mike",
  face: getRandomFormalFace(),
};

export const SENDER_SENATOR4 = {
  name: "Senator O'Henry",
  face: getRandomFormalFace(),
};

export const SENDER_RESEARCH_DEPARTMENT_PERSON = {
  name: "R&D",
  face: getRandomFace(),
};

// export const SENDER_HEAD_OF_DESIGN = {
//   name: "Head of Design"
// };

export const SENDER_HR = {
  name: "HR",
  face: getRandomFace(),
};

export const SENDER_CELEBRITY1 = {
  name: "Bumblebee Crumplehorn, Hollywood Celebrity",
  face: getRandomFace(),
};

export const SENDER_ENGINEER = {
  name: "Some engineer",
  face: getRandomFace(),
};

export const SENDER_RECRUITING = {
  name: "Head of recruiting",
  face: getRandomFace(),
};

export const SENDER_CNN = {
  name: "Worldly World News Bot",
  face: {
    Component: WwnIcon,
    bgcolor: "#d40000",
    props: {},
  },
};

export const SENDER_MYSTERIOUS1 = {
  name: "Mysterious person",
  face: getRandomFace(),
};

export const SENDER_UNIONS = {
  name: "Unions",
  face: getRandomFace(),
};

export const SENDER_BEEPER_DEEL = {
  name: 'Beeper Deel',
  face: getRandomFace(),
};

export const SENDER_ILYENKOVICH = {
  name: 'Piyotr Ilyenkovich',
  face: getRandomFace(),
};

export function r(quantity) {
  if (quantity >= 0.5) {
    quantity = quantity - 0.2; // 0.5 -> 0.3
  }
  else if (quantity >= 0.3) {
    quantity = quantity - 0.1; // 0.4 -> 0.3, 0.3 -> 0.2, 
  }
  return (val) => val + quantity;
}

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

export function getRandomSenator() {
  const r = Math.random();
  const possibleSenators = [SENDER_SENATOR1, SENDER_SENATOR2, SENDER_SENATOR3, SENDER_SENATOR4];
  return possibleSenators[Math.floor(r * possibleSenators.length)];
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
    return "Cloud";
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
