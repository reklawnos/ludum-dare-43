import React, { Component } from 'react';
import cards from './cards';
import MetricMeter from './MetricMeter';
import { getRandomFace } from './avatars/templates';
import SenderMessage from './SenderMessage';
import BasicMessage from './BasicMessage';

console.log(Object.keys(cards).length);

function generateProductName() {
  return "[Product Name]";
}

function getReasonOfDeath(state) {
  return "You're too much of an asshole";
}

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
    
    this.state = this.getNewStartState();
  };
  
  getNewStartState = () => {
    const stateSlices = {
      money: 2,
      reputation: 0.5,
      crunchy: 0.5,
      innovation: 0.5,
    };
    return {
      companyName: "Tableify",
      productName: generateProductName(),
      pastChoices: [],
      stateSlices,
      currentCardId: getNextCard({ pastChoices: [], stateSlices }),
      hoverOptionId: null,
      playerFace: getRandomFace(),
    };
  };
  
  restart = () => {
    this.setState(this.getNewStartState());
  };

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
    const { currentCardId, stateSlices, hoverOptionId, companyName, productName, pastChoices, playerFace } = this.state;
    const currentCard = cards[currentCardId];

    console.log(currentCard, currentCardId);
    
    let isPlayerDead = 
      stateSlices.money <= 0
       || stateSlices.reputation <= 0
       || stateSlices.crunchy <= 0
       || stateSlices.innovation <= 0;
     
    let reasonOfDeath = isPlayerDead ? getReasonOfDeath(this.state) : "";
     
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
        <div style={{filter: isPlayerDead ? "blur(4px)" : undefined}}>
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
          <div style={{ height: 350, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: 0 }}>
              {pastChoices.slice(-3).map(({ cardId, optionId }) => (
                <>
                  <SenderMessage card={cards[cardId]} companyName={companyName} productName={productName} />
                  <BasicMessage face={playerFace} name="Me" message={cards[cardId].options[optionId].message} isHighlighted />
                </>
              ))}
            </div>
          </div>
          <SenderMessage card={currentCard} companyName={companyName} productName={productName} />
          <div>
            {Object.keys(currentCard.options).map(optionId => (
              <button
                key={optionId}
                onClick={() => this.chooseItem(optionId)}
                onMouseEnter={() => this.enterHoverOverOption(optionId)}
                onMouseLeave={() => this.leaveHoverOverOption()}
              >
                {typeof currentCard.options[optionId].message === "function" ? currentCard.options[optionId].message(companyName, productName) : currentCard.options[optionId].message}
              </button>
            ))}
          </div>
        </div>
        {
          !isPlayerDead ? null :
          <div style={{position: "fixed", left: 0, right: 0, top: 0, bottom: 0, width: "100%", height: "100%"}}>
            <div style={{ position: "relative", padding: "12px 12px 12px 12px", left: "50%", top: "50%",  backgroundColor: "#ccc", width: "220px", transform: "translate(-50%, -50%)"}}>
            <div style={{fontSize: 20}}>You've been banned from this Quack channel.</div>
            <br />
            <b>Reason</b>: {reasonOfDeath}
            <br />
            <button onClick={this.restart}>Restart</button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
