import type { ServerResponse } from "@common/contracts";
import { useLiveStore } from "../store/liveStore";
import { useResultStore } from "../store/resultStore";

export const messageRouter = (response: ServerResponse) => {
  const { setQuestion, setLivePlayers, setLeaderBoard, setAnswer, setPhase, setQuizDetails } = useLiveStore.getState();
  const { setFinalResult } = useResultStore.getState();
  switch (response.type) {
    case "QUESTION":
      const { text, options, correctOptionIndex } = response; // correctOptionIndex only available for host will remain undefined for other
      setQuestion({ text, options, correctOptionIndex });
      break;

    case "ANSWER_RESULT":
      const { accepted, correct, yourScore, message, correctAnswerIndex } = response;
      setAnswer({ correctAnswerIndex, accepted, yourScore, correct, message });
      break;

    case "LOBBY":
      setLivePlayers(response.users);
      // update lobby
      break;

    case "USER_JOINED":
      setQuizDetails(response.quizDetails);
      break;

    case "FINAL_RESULT":
      setFinalResult(response.result);
      break;

    case "PHASE":
      const phase = response.phase;
      if (phase === "lobby") {
        setPhase("lobby");
      } else if (phase === "active") {
        setPhase("active");
      } else if (phase === "results") {
        window.location.replace("/results");
      } else {
        window.location.replace("/home");
      }
      // handle quiz completed
      break;

    case "QUIZ_STARTED":
      setQuizDetails(response.quizDetails);
      // redirect to live page
      break;

    case "ERROR":
      console.log(response.error);
      // show either error toast or error modal depending upon the server instructions
      break;

    case "LEADERBOARD":
      const { data } = response;
      setLeaderBoard(data);
      // update leaderboard
      break;

    default:
      // handle unkown response
      break;
  }
};
