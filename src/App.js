import React, { Component } from 'react';
import cards from './cards';
import MetricMeter from './MetricMeter';

function getNextCard(state) {
  const { pastChoices } = state;
  const alreadySeenCardIds = new Set(pastChoices.map(({ cardId }) => cardId));
  const viableCardIds = Object.keys(cards).filter(cardId => !alreadySeenCardIds.has(cardId));

  let sumOfAllScores = 0;
  const allScores = [];
  for (const cardId of viableCardIds) {
    console.log(cardId);
    const cardScore = cards[cardId].getScore(state);
    if (cardScore < 0) {
      throw new Error(`Card score was negative (${cardScore}) for ${cardId}`);
    }
    if (cardScore === Infinity) {
      return cardId;
    }

    if (cardScore === 0) {
      continue;
    }

    sumOfAllScores += cardScore;
    allScores.push({ cardId, cardScore });
  }

  const randomVal = Math.random() * sumOfAllScores;

  let sum = 0;
  for (const {cardId, cardScore} of allScores) {
    sum += cardScore;
    if (randomVal < sum) {
      return cardId;
    }
  }

  throw new Error({
    message: 'could not decide on a card',
    state,
    randomVal,
    allScores,
  });
}

function applyOptionReducers(stateSlices, cardId, optionId) {
  let newStateSlices = stateSlices;
  const reducers = cards[cardId].options[optionId].reducers;
  Object.keys(reducers).map((key) => {
    const reducer = reducers[key];
    newStateSlices = {
      ...newStateSlices,
      [key]: reducer(stateSlices[key]),
    };
  });
  return newStateSlices;
}

class App extends Component {
  constructor(props) {
    super(props);
    const stateSlices = {
      money: 2,
      reputation: 0.5,
      crunchy: 0.5,
      innovation: 0.5,
    };
    this.state = {
      companyName: "Tableify",
      pastChoices: [],
      stateSlices,
      currentCardId: getNextCard({ pastChoices: [], stateSlices }),
      hoverOptionId: null,
    };
  }

  chooseItem = (optionId) => {
    this.setState(({ pastChoices, currentCardId, stateSlices }) => {
      const newPastChoices = [...pastChoices, { cardId: currentCardId, optionId }];
      const newStateSlices = applyOptionReducers(stateSlices, currentCardId, optionId);
      const nextCardId = getNextCard({ pastChoices: newPastChoices, stateSlices: newStateSlices });
      return {
        pastChoices: newPastChoices,
        currentCardId: nextCardId,
        stateSlices: newStateSlices,
        hoverOptionId: null,
      };
    });
  };

  enterHoverOverOption = (hoverOptionId) => {
    this.setState({ hoverOptionId });
  };

  leaveHoverOverOption = () => {
    this.setState({ hoverOptionId: null });
  };

  render() {
    console.log(this.state);
    const { currentCardId, stateSlices, hoverOptionId, companyName } = this.state;
    const currentCard = cards[currentCardId];

    console.log(currentCard, currentCardId);

    let sliceDiffs = [];
    if (hoverOptionId) {
      const newStateSlices = applyOptionReducers(stateSlices, currentCardId, hoverOptionId);
      sliceDiffs = Object.keys(newStateSlices)
        .reduce((acc, k)  => ({
          ...acc,
          [k]: newStateSlices[k] - stateSlices[k],
        }), {});
      console.log(sliceDiffs, newStateSlices, stateSlices);
    }

    return (
      <div>
        <MetricMeter
          prefix="Money: "
          value={stateSlices.money}
          postfix="M"
          sizeOfEffect={sliceDiffs['money']}
        />
        <MetricMeter
          prefix="Reputation: "
          value={stateSlices.reputation}
          sizeOfEffect={sliceDiffs['reputation']}
        />
        <MetricMeter
          prefix="Crunchy: "
          value={stateSlices.crunchy}
          sizeOfEffect={sliceDiffs['crunchy']}
        />
        <MetricMeter
          prefix="Innovation: "
          value={stateSlices.innovation}
          sizeOfEffect={sliceDiffs['innovation']}
        />
        <hr />
        <div>
          From {currentCard.sender.name}
        </div>
        <div>
          {typeof currentCard.message === "function" ? currentCard.message(companyName) : currentCard.message}
        </div>
        <div>
          {Object.keys(currentCard.options).map(optionId => (
            <button
              key={optionId}
              onClick={() => this.chooseItem(optionId)}
              onMouseEnter={() => this.enterHoverOverOption(optionId)}
              onMouseLeave={() => this.leaveHoverOverOption()}
            >
              {currentCard.options[optionId].message}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
