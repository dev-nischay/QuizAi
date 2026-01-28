import BuildNavbar from "./quiz-build-components/BuildNav";
import Input from "../../auth/authComponents/Input";
import { QuestionBuilder } from "./quiz-build-components/QuestionInput";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { QuestionPreview } from "./quiz-build-components/QuestionPreview";
import type { Question } from "../quiz.types";
import { QuestionControls } from "./questionControls";
export default function QuizBuilderPage() {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isEditing, setEditing] = useState<boolean>(false);
  const [editQuestion, setEditQuestion] = useState<Question | null>(null);
  const quesControls = new QuestionControls(questions, setQuestions);

  console.log(questions);

  return (
    <div className="w-full min-h-screen  ">
      <BuildNavbar questionsLength={questions.length} />
      <div className="w-full mt-28 lg:mt-0  lg:max-w-6xl  mx-auto lg:px-4 lg:py-2 ">
        <div className=" bg-gradient-to-br from-gray-900 via-black rounded-xl border border-teal-900 to-slate-900  h-fit  p-4 pb-6 mt-8 ">
          <Input
            id="quiz title"
            ref={titleRef}
            placeholder="Enter your quiz title...."
            className="mt-3  text-lg font-bold"
          />
        </div>
        <div className="mt-5 flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="tracking-wide text-gray-400 text-sm  font-mono font-semibold uppercase">questions</div>
            <div className="bg-emerald-800/50 size-7 rounded-lg font-mono text-emerald-400 font-semibold text-xs flex justify-center items-center  ">
              {questions.length}
            </div>
          </div>
          <div>
            <LocalButton text={"add question"} setActive={setActive} />
          </div>
        </div>
        {/* empty question state */}

        <div
          className={`w-full  flex flex-col gap-4 items-center p-10 h-[20rem] bg-gradient-to-r from-gray-950 via-black/50  to-slate-950 mt-5 rounded-xl border border-dotted border-emerald-800 ${
            isEditing || active || questions.length > 0 ? "hidden" : "flex"
          }`}
        >
          <div className="size-16 bg-emerald-700/10 rounded-full flex justify-center items-center   relative ">
            <Plus size={30} color="#065f46" />
          </div>
          <div className="font-bold text-neutral-300 tracking-wide text-2xl capitalize">no questions yet</div>
          <div className=" text-sm text-gray-600">start building your quiz by adding your first question</div>
          <div>
            <LocalButton text="create first question" setActive={setActive} />
          </div>
        </div>
        {/* question builder */}

        {(isEditing || active) && (
          <QuestionBuilder
            setEditQuestion={setEditQuestion}
            setEditing={setEditing}
            editQuestion={editQuestion}
            isEditing={isEditing}
            setActive={setActive}
            quesControls={quesControls}
          />
        )}
        {questions.length > 0 &&
          questions.map((e, i) => (
            <QuestionPreview
              key={i}
              _id={e._id}
              setEditing={setEditing}
              setEditQuestion={setEditQuestion}
              i={i}
              text={e.text}
              correctOptionIndex={e.correctOptionIndex}
              options={e.options}
              quesControls={quesControls}
            />
          ))}
      </div>
    </div>
  );
}

export const LocalButton = ({
  text,
  setActive,
}: {
  text: string;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => setActive(true)}
      className="bg-emerald-900/50 border-emerald-800 py-3 px-6 capitalize gap-2 flex items-center text-emerald-400 text-lg font-bold rounded-xl border hover:border-emerald-600 transition-all"
    >
      <Plus size={22} />
      <div>{text}</div>
    </button>
  );
};
