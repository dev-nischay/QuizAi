import { Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RoomProps } from "../QuizHome";
import { JoinQuizModal } from "../../../modals/JoiningRoomModal";
export const JoinQuiz = ({ onClose }: RoomProps) => {
  const [roomCode, setRoomCode] = useState("");
  const [isJoining, setJoining] = useState(false);
  const nav = useNavigate();

  const handleJoinRoom = async () => {
    if (roomCode.trim().length >= 5) {
      console.log("Joining room:", roomCode);
      setJoining(true);
    }
  };

  if (isJoining)
    return <JoinQuizModal onClose={() => setJoining(false)} onJoin={() => nav("/live")} roomCode={roomCode} />; // component

  return (
    <div className="w-full  max-w-lg mt-20 lg:mt-28 2xl:mt-44   mx-auto relative">
      <div className="w-full  relative  p-4   overflow-hidden z-10 ">
        <div className="bg-gradient-to-br from-slate-900 via-black to-slate-900 rounded-3xl p-8 border border-emerald-950 relative">
          {/* Border accents */}
          <div className="absolute -top-[1px] inset-x-0 h-[1px] max-w-52 mx-auto bg-gradient-to-r from-emerald-950 via-teal-500 to-emerald-950" />
          <div className="absolute -bottom-[1px] inset-x-0 h-[1px] max-w-52 mx-auto bg-gradient-to-r from-emerald-950 via-teal-500 to-emerald-950" />
          <div className="absolute w-[1px] max-h-52 top-20 bottom-0 -right-[1px] bg-gradient-to-b from-emerald-950 via-teal-500 to-emerald-950" />
          <div className="absolute w-[1px] max-h-52 bottom-0 top-48 -left-[1px] bg-gradient-to-b from-emerald-950 via-teal-500 to-emerald-950" />

          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-emerald-600 via-teal-400 to-emerald-600 p-3 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wider">Join Room</h1>
          </div>

          <p className="text-gray-400 mb-6 font-mono tracking-wide">Enter the room code to join an existing quiz</p>

          <div className="mb-6">
            <label className="block text-gray-400 text-xs uppercase tracking-wider font-semibold mb-2">Room Code</label>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="w-full bg-black border border-emerald-950 rounded-lg px-4 py-3 text-white font-mono text-lg tracking-wider focus:outline-none focus:border-emerald-700 hover:border-emerald-700 transition-all"
            />
          </div>

          <button
            onClick={handleJoinRoom}
            disabled={roomCode.trim().length < 6}
            className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white font-black uppercase tracking-widest py-3 px-4 rounded-xl hover:scale-105 transition-all duration-100 mb-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Join Room
          </button>

          <button
            onClick={() => {
              onClose();
              setRoomCode("");
            }}
            className="w-full bg-black border border-emerald-950 text-white font-black uppercase tracking-widest py-3 px-4 rounded-xl hover:border-emerald-700 hover:scale-105 transition-all duration-100"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinQuiz;
