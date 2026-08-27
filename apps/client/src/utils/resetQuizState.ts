import { useAuthStore } from "../store/authStore";
import { useLiveStore } from "../store/liveStore";
import { useResultStore } from "../store/resultStore";

export const resetQuizState = () => {
  const resetRole = useAuthStore.getState().setRole;
  const resetResult = useResultStore.getState().reset;
  const resetLiveSession = useLiveStore.getState().reset;
  console.log("reset ran");
  resetRole(null);
  resetResult();
  resetLiveSession();

  // local storage cleanup + redirecting user back to home
  // for now redirecting user later we would user toast for ux and countdown for redirecting user to the home page for better ux
};
