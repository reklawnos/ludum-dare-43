import React, { Component } from 'react';
import cards from './cards';

function getNextCard(state) {
  const { pastChoices } = state;
  const alreadySeenCardIds = new Set(pastChoices.map(({ cardId }) => cardId));
  const viableCardIds = Object.keys(cards).filter(cardId => !alreadySeenCardIds.has(cardId));

  let maxScore = 0;
  let maxId = null;
  for (const cardId of viableCardIds) {
    const cardScore = cards[cardId].getScore(state);
    if (cardScore < 0) {
      throw new Error(`Card score was negative (${cardScore}) for ${cardId}`);
    }
    if (cardScore > maxScore) {
      maxScore = cardScore;
      maxId = cardId;
    }
  }

  return maxId;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pastChoices: [],
      stateSlices: {
        money: 2e7,
      },
      currentCardId: 'helloWorld',
    };
  }

  chooseItem = (optionId) => {
    this.setState(({ pastChoices, currentCardId, stateSlices }) => {
      const newPastChoices = [...pastChoices, { cardId: currentCardId, optionId }];
      let newStateSlices = stateSlices;
      const reducers = cards[currentCardId].options[optionId].reducers;
      Object.keys(reducers).map((key) => {
        const reducer = reducers[key];
        newStateSlices = {
          ...newStateSlices,
          [key]: reducer(stateSlices[key]),
        };
      });
      const nextCardId = getNextCard({ pastChoices: newPastChoices, stateSlices: newStateSlices });
      return {
        pastChoices: newPastChoices,
        currentCardId: nextCardId,
        stateSlices: newStateSlices,
      };
    });
  };

  render() {
    console.log(this.state);
    const { currentCardId, stateSlices } = this.state;
    const currentCard = cards[currentCardId];

    return (
      <div>
        <div>
          Money: ${(stateSlices.money / 1e7).toFixed()}M
        </div>
        <div>
          From {currentCard.sender.name}
        </div>
        <div>
          {currentCard.message}
        </div>
        <div>
          {Object.keys(currentCard.options).map(optionId => (
            <button key={optionId} onClick={() => this.chooseItem(optionId)}>
              {currentCard.options[optionId].message}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
