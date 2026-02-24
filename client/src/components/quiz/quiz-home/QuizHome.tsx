import { useState } from "react";
import Button from "../../globals/Button";
import JoinQuiz from "./quiz-home-components/JoinRoom";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
export type RoomProps = {
  onClose: () => void;
};

export default function QuizHome() {
  const setRole = useAuthStore((state) => state.setRole);
  const nav = useNavigate();
  const [joining, setJoining] = useState<boolean>(false);

  const handleCreate = () => {
    console.log("redirecting to quiz builder");
    setRole("host");
    nav("/build");
  };

  if (joining) {
    setRole("guest");
    return <JoinQuiz onClose={() => setJoining(false)} />;
  }

  return (
    <div className="w-full   lg:px-4 lg:py-2 lg:max-w-3xl mx-auto mt-32 h-[40rem] flex flex-col gap-10 items-center justify-center pb-24 p-5">
      <div>
        <button
          onClick={handleCreate}
          className="uppercase bg-black text-lg font-black tracking-widest    rounded-xl   px-44 py-5 hover:scale-105 transition-all duration-100 hover:border "
        >
          create quiz
        </button>
      </div>
      <div className="uppercase text-4xl font-black ">or</div>

      <div>
        <Button
          onClick={() => setJoining(true)}
          className="uppercase  text-lg font-black text-black tracking-widest    rounded-xl   px-[11.8rem] py-5  transition-all border-none duration-100 hover:scale-105   hover:border-green-700 "
        >
          join quiz
        </Button>
      </div>
    </div>
  );
}
