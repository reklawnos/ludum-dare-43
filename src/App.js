import React, { Component } from 'react';
import cards from './cards';
import MetricMeter from './MetricMeter';
import { getRandomFace } from './avatars/templates';
import SenderMessage from './SenderMessage';
import BasicMessage from './BasicMessage';
import QuackIcon from './QuackIcon';
import InvestorMeter from './InvestorMeter';
import { SENDER_INVESTOR_REPUTATION, SENDER_INVESTOR_CRUNCHY, SENDER_INVESTOR_INNOVATION } from './cards/shared';

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
      <div style={{ display: 'flex' }}>
        <div
          style={{
            backgroundColor: '#703960',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 16,
            flex: '0 0 250px',
            padding: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <QuackIcon />
            <div style={{ color: 'white', fontSize: '22px', marginLeft: 5 }}>
              Quack
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <div>
              Corporate Account
            </div>
            <div style={{ color: 'white', fontSize: '22px'}}>
              <MetricMeter
                prefix="$"
                value={stateSlices.money}
                postfix="M"
                sizeOfEffect={sliceDiffs['money']}
              />
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <div>
              Investors
            </div>
            <InvestorMeter
              {...SENDER_INVESTOR_REPUTATION}
              value={stateSlices.reputation}
              sizeOfEffect={sliceDiffs['reputation']}
            />
            <InvestorMeter
              {...SENDER_INVESTOR_CRUNCHY}
              value={stateSlices.crunchy}
              sizeOfEffect={sliceDiffs['crunchy']}
            />
            <InvestorMeter
              {...SENDER_INVESTOR_INNOVATION}
              value={stateSlices.innovation}
              sizeOfEffect={sliceDiffs['innovation']}
            />
          </div>
        </div>
        <div style={{filter: isPlayerDead ? "blur(4px)" : undefined, paddingRight: 10 }}>
          <div style={{ height: 350, position: 'relative', overflow: 'hidden'}}>
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
          <div
            style={{
              margin: 10,
              borderRadius: 5,
              border: '2px solid #717274',
              padding: 2,
            }}
          >
            {Object.keys(currentCard.options).map(optionId => (
              <button
                style={{
                  margin: 5,
                  padding: 8,
                  borderRadius: 3,
                  border: '1px solid rgb(215, 218, 224)',
                  background:
                    'linear-gradient(rgba(253, 253, 253, 1) 0%, rgb(245, 245, 245) 85%, rgb(224, 226, 230) 100%)',
                }}
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
