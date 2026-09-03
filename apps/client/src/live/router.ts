import type { ServerResponse } from "@common/contracts";
import { useLiveStore } from "../store/liveStore";
import { useResultStore } from "../store/resultStore";
import toast from "react-hot-toast";

export const messageRouter = (response: ServerResponse) => {
  const { setQuestion, setLivePlayers, setLeaderBoard, setAnswer, setPhase, setQuizDetails, setVotes } =
    useLiveStore.getState();
  const { setFinalResult } = useResultStore.getState();
  switch (response.type) {
    case "QUESTION":
      const { text, options, correctOptionIndex, currentQuestionIndex } = response; // correctOptionIndex only available for host will remain undefined for other
      setQuestion({ text, options, correctOptionIndex, currentQuestionIndex });
      setVotes([]); // reset votes on new question
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

    case "NOTIFICATION":
      toast(response.message, {
        className:
          "!bg-white dark:!bg-[#141821] !text-slate-900 dark:!text-[#F1F3F7] !border !border-indigo-200 dark:!border-indigo-500/30 !rounded-xl !shadow-lg",
      });
      break;

    case "ERROR":
      console.log(response.error);
      toast.error(response.error ?? "Something went wrong", {
        className:
          "!bg-white dark:!bg-[#141821] !text-slate-900 dark:!text-[#F1F3F7] !border !border-red-200 dark:!border-rose-400/20 !rounded-xl !shadow-lg",
      });

      break;

    case "LEADERBOARD":
      const { data } = response;
      setLeaderBoard(data);
      // update leaderboard
      break;

    case "POLLS":
      setVotes(response.votes);
      break;

    default:
      // handle unkown response
      break;
  }
};
