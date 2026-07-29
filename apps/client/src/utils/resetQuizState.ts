import { useAuthStore } from "../store/authStore";
import { useLiveStore } from "../store/liveStore";
import { useRoomStore } from "../store/roomStore";

export const resetQuizState = () => {
  const resetRole = useAuthStore.getState().setRole;
  const resetLiveSession = useLiveStore.getState().reset;
  const resetRoomCode = useRoomStore.getState().reset;
  console.log("reset ran");
  resetRole(null);
  resetLiveSession();
  resetRoomCode();
  window.location.replace("/home");
  // local storage cleanup + redirecting user back to home
  // for now redirecting user later we would user toast for ux and countdown for redirecting user to the home page for better ux
};
