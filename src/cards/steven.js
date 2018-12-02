import {
  STANDARD_SCORE,
  SENDER_CTO,
  SENDER_CHEF,
  SENDER_EMPLOYEE,
  SENDER_COMMUNICATIONS,
  SENDER_INVESTOR_INNOVATION,
  showSomeTimeAfterSpecificChoice,
  showWithFixedScore,
  SENDER_CFO,
  SENDER_INVESTOR_REPUTATION,
  SENDER_HEAD_OF_OFFICE_SECURITY,
  SENDER_INVESTOR_CRUNCHY,
  SENDER_HEAD_OF_FACILITIES,
  showAfterSpecificChoice,
  r
} from "./shared";

export default {
  productRecall_1: {
    message: `QA just discovered that our product contains chemicals known to the state of California to cause cancer. Should we issue a recall?`,
    sender: SENDER_EMPLOYEE,
    options: {
      yes: {
        message: `Of course, the safety of our customers is paramount!`,
        reducers: {
          crunchy: r(0.1),
          money: r(-0.2),
        },
      },
      no: {
        message: `Let's just slap on a warning label`,
        reducers: {
          crunchy: r(-0.2),
        },
      },
    },
    getScore: showWithFixedScore(STANDARD_SCORE),
  },
  productRecall_2: {
      message: `Should we set up a PR campaign to apologize for our product recall issues?`,
      sender: SENDER_COMMUNICATIONS,
      options: {
      yes: {
        message: `Sure`,
        reducers: {
          reputation: r(0.2),
          money: r(-0.1),
        },
      },
      no: {
        message: `Keep it quiet`,
        reducers: {
        },
      },
    },
    getScore: showAfterSpecificChoice("productRecall_1", "yes"),
  }
};
