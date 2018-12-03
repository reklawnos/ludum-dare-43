import React, { Component } from 'react';
import cards from './cards';
import MetricMeter from './MetricMeter';
import { getRandomFace } from './avatars/templates';
import SenderMessage from './SenderMessage';
import BasicMessage from './BasicMessage';
import QuackIcon from './QuackIcon';
import InvestorMeter from './InvestorMeter';
import { SENDER_INVESTOR_REPUTATION, SENDER_INVESTOR_CRUNCHY, SENDER_INVESTOR_INNOVATION } from './cards/shared';
import generateProductName from './generateProductName';
import generateCompanyName from './generateCompanyName';
import BasicButton from './BasicButton';
import Modal from './Modal';


function formatQuarters(quarters) {
  let numberOfYears = Math.floor(quarters / 4);
  if (numberOfYears === 0) return "Q " + (quarters + 1) + "/4";
  
  return "Year " + numberOfYears + ", Q " + (quarters % 4 + 1) + "/4";
}

function getDeathCardID(stateSlices) {
  if (stateSlices.money <= 0) {
    return "moneyDeath";
  } else if (stateSlices.reputation <= 0) {
    return "reputationInvestorDeath";
  } else if (stateSlices.crunchy <= 0) {
    return "crunchyInvestorDeath";
  } else if (stateSlices.innovation <= 0) {
    return "innovationInvestorDeath";
  }
}

function getNextCard(state) {
  const { pastChoices } = state;
  const alreadySeenCardIds = new Set(pastChoices.map(({ cardId }) => cardId));
  const viableCardIds = Object.keys(cards).filter(cardId => !alreadySeenCardIds.has(cardId));

  let sumOfAllScores = 0;
  const allScores = [];
  for (const cardId of viableCardIds) {
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

  console.log({
    state, randomVal, allScores
  });
  throw new Error('could not decide on a card');
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
    
    this.state = this.getNewStartState(true);
  };
  
  getNewStartState = (firstTimePlaying, companyName, productName) => {
    const stateSlices = {
      money: 2,
      reputation: 0.5,
      crunchy: 0.5,
      innovation: 0.5,
    };
    return {
      companyName: !!companyName ? companyName : generateCompanyName(),
      productName: !!productName ? productName : generateProductName(),
      pastChoices: [],
      stateSlices,
      currentCardId: getNextCard({ pastChoices: [], stateSlices, firstTimePlaying }),
      hoverOptionId: null,
      playerFace: getRandomFace(),
      isDead: false,
      quarters: 0,
      firstTimePlaying: !!firstTimePlaying
    };
  };
  
  restart = (companyName, productName) => {
    this.setState(this.getNewStartState(false, companyName, productName));
  };

  chooseItem = (optionId) => {
    this.setState(({ pastChoices, currentCardId, stateSlices, quarters }) => {
      let wasPlayerDead = 
        stateSlices.money <= 0
         || stateSlices.reputation <= 0
         || stateSlices.crunchy <= 0
         || stateSlices.innovation <= 0;

      const newPastChoices = [...pastChoices, { cardId: currentCardId, optionId }];
      const newStateSlices = applyOptionReducers(stateSlices, currentCardId, optionId);
      let isPlayerDead = 
        newStateSlices.money <= 0
         || newStateSlices.reputation <= 0
         || newStateSlices.crunchy <= 0
         || newStateSlices.innovation <= 0;
         
      const nextCardId = isPlayerDead 
        ? getDeathCardID(newStateSlices)
        : getNextCard({ pastChoices: newPastChoices, stateSlices: newStateSlices });
      return {
        pastChoices: newPastChoices,
        currentCardId: nextCardId,
        stateSlices: newStateSlices,
        hoverOptionId: null,
        isDead: wasPlayerDead ? true : false,
        quarters: quarters + 1,
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
    const { 
      currentCardId,
      stateSlices,
      hoverOptionId,
      companyName,
      productName,
      pastChoices,
      playerFace,
      isDead,
      quarters,
      firstTimePlaying,
    } = this.state;
    const currentCard = cards[currentCardId];
     
    let sliceDiffs = [];
    if (hoverOptionId) {
      const newStateSlices = applyOptionReducers(stateSlices, currentCardId, hoverOptionId);
      sliceDiffs = Object.keys(newStateSlices)
        .reduce((acc, k)  => ({
          ...acc,
          [k]: newStateSlices[k] - stateSlices[k],
        }), {});
    }
    
    let [newCompanyName, newProductName] = isDead ? [generateCompanyName(), generateProductName()] : ["", ""];

    return (

      <div style={{ 
        width: 1120,
        position: "absolute",
        top: "50%",
        left: "50%"
      }}>
        <div style={{ 
          display: 'flex',
          position: "absolute",
          transform: "translate(-50%, -50%)",
          width: "100%"
        }}>
        <div
          style={{
            backgroundColor: '#703960',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 16,
            flex: '0 0 250px',
            padding: 10,
            filter: firstTimePlaying ? "blur(4px)" : undefined
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <QuackIcon />
            <div style={{ color: 'white', fontSize: '22px', marginLeft: 5 }}>
              Quack
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <div>{companyName}'s Corporate Account</div>
            <div style={{ color: 'white', fontSize: '22px'}}>
              <MetricMeter
                prefix="$"
                value={stateSlices.money}
                postfix="M"
                sizeOfEffect={sliceDiffs['money']}
                minForFlashing={0.5}
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
            <div>{formatQuarters(quarters)}</div>
          </div>
        </div>
        <div style={{
          filter: firstTimePlaying || isDead ? "blur(4px)" : undefined,
          flexGrow: 1.0,
          height: 560,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: 'hidden'
        }}>
          <div style={{position: 'relative'}}>
            <div style={{ position: 'absolute', bottom: 0, width: "100%" }}>
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
              <BasicButton
                key={optionId + currentCardId}
                onClick={() => this.chooseItem(optionId)}
                onMouseOver={() => this.enterHoverOverOption(optionId)}
                onMouseOut={() => this.leaveHoverOverOption()}
              >
                {typeof currentCard.options[optionId].message === "function" ? currentCard.options[optionId].message(companyName, productName) : currentCard.options[optionId].message}
              </BasicButton>
            ))}
          </div>
        </div>
        {
          !firstTimePlaying ? null :
          <Modal>
            <div style={{fontSize: 20}}>Congratulations!</div>
            <br />
            <div>
                Three angel investors decided to fund your company, <b>{companyName}.</b> Turns out there actually <i>is</i> a lot of money in <b>{productName}!</b>
              </div>
            <br />
            <BasicButton onClick={() => this.setState({firstTimePlaying: false})}>Join Quack Channel</BasicButton>
          </Modal>
        }
        {
          !isDead ? null :
          <Modal>
            <div style={{fontSize: 20}}>You've been <b style={{color: "red"}}>banned</b> from this Quack channel.</div>
            <br />
            <div>Luckily, your side gig working on <b>{productName}</b> at <b>{companyName}</b> is blowing up.</div>
            <br />
            <BasicButton onClick={() => this.restart(newCompanyName, newProductName)}>Join New Channel</BasicButton>
          </Modal>
        }
      </div>
      </div>
    );
  }
}

export default App;
