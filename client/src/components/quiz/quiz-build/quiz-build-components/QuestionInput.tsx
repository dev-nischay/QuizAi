import Input from "../../../auth/authComponents/Input";
import { useState, useRef, forwardRef, useEffect } from "react";
import type { OptionProps, Question } from "../../quiz.types";
import { Check } from "lucide-react";
import { X } from "lucide-react";
import type { QuestionBuilderProps } from "../../quiz.types";
import type { FormEvent } from "react";
export const QuestionBuilder = ({
  setActive,
  quesControls,
  isEditing,
  editQuestion,
  setEditQuestion,
  setEditing,
}: QuestionBuilderProps) => {
  const { addQuestion, updateQuestion, removeQuestion } = quesControls;
  const questionRef = useRef<HTMLInputElement | null>(null);
  const [correctIndex, setCorrectIndex] = useState<0 | 1 | 2 | 3>(0);
  const optionsText = ["option a", "option b", "option c", "option d"];
  const optionsRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isEditing) {
      const question = editQuestion;

      if (question) {
        questionRef.current!.value = question.text;
        optionsRefs.current[0]!.value = question.options[0];
        optionsRefs.current[1]!.value = question.options[1];
        optionsRefs.current[2]!.value = question.options[2];
        optionsRefs.current[3]!.value = question.options[3];
      }
    }
  }, [isEditing]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // text: string;
    // options: [string, string, string, string];
    // correctOptionIndex: Options;

    if (isEditing) {
      const update: Question = {
        _id: crypto.randomUUID(),
        text: questionRef.current!.value,
        options: [
          optionsRefs.current[0]!.value,
          optionsRefs.current[1]!.value,
          optionsRefs.current[2]!.value,
          optionsRefs.current[3]!.value,
        ] as [string, string, string, string],
        correctOptionIndex: correctIndex,
      };

      updateQuestion(update._id, update);
      removeQuestion(editQuestion!._id);
      setEditQuestion(null);

      setEditing(false);
    }

    const question: Question = {
      _id: crypto.randomUUID(),
      text: questionRef.current!.value,
      options: [
        optionsRefs.current[0]!.value,
        optionsRefs.current[1]!.value,
        optionsRefs.current[2]!.value,
        optionsRefs.current[3]!.value,
      ] as [string, string, string, string],
      correctOptionIndex: correctIndex,
    };

    addQuestion(question);
    setActive(false);
  };

  return (
    <div className="w-full relative h-fit bg-gradient-to-r px-5 lg:px-10 py-4 from-gray-950 via-black/50 to-slate-950 rounded-2xl border-emerald-800 border mt-5   ">
      <div className="absolute  border-b border-emerald-950 inset-x-0 top-16"></div>
      <div className="h-16 bg-black/5 ">
        <div className="font-bold text-emerald-500 uppercase  mt-1  tracking-wider ">
          {isEditing ? "edit question" : "new question"}
        </div>
      </div>

      {/* Question title */}
      <form onSubmit={handleSubmit}>
        <Input id="question text" ref={questionRef} placeholder="Enter your question..." className="mt-2 " />

        <div className=" mt-5 2xl:text-sm text-gray-400  uppercase tracking-wider  font-semibold">answer options</div>

        {/* Options */}
        <div className="grid lg:grid-cols-2 gap-6 mt-3 ">
          {optionsText.map((e, index) => (
            <Option
              placeholder={e}
              setCorrectIndex={setCorrectIndex}
              key={index}
              optionIndex={index}
              selectedOption={correctIndex}
              ref={(el) => {
                optionsRefs.current[index] = el;
              }}
            />
          ))}
        </div>

        <div className="text-gray-400 tracking-wide font-bold mt-3">Click the checkmark to set the correct answer</div>

        {/* bottom button layer */}
        <div className="flex gap-5  justify-end items-center mt-8 mb-10">
          <div className="flex-1">
            <button
              type="submit"
              className="w-full  bg-gradient-to-r hover:scale-105 text-sm lg:text-base transition-all   py-4 flex justify-center gap-2  font-extrabold   tracking-wider from-emerald-600 via-teal-600 to-emerald-600 "
            >
              {
                <div className="hidden md:flex">
                  <Check />
                </div>
              }
              <div className="uppercase">{isEditing ? "update question" : "add quesiton"}</div>
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setActive(false);

                console.log(isEditing);
              }}
              className="px-6 py-4  gap-2  border flex justify-center items-center bg-gray-900 border-gray-700 rounded-xl font-extrabold text-gray-400 uppercase transition-all duration-200 hover:border-gray-500"
            >
              <div>
                <X />
              </div>
              <div>cancel</div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const Option = forwardRef<HTMLInputElement, OptionProps>(
  ({ placeholder, setCorrectIndex, optionIndex, selectedOption }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          type="text"
          required
          className={`w-full  px-4 py-5 capitalize rounded-lg outline-none mt-1  ring-0 bg-black border border-emerald-950  placeholder:text-gray-500 focus:ring-2 flex justify-between transition-all hover:border-gray-500 ${
            optionIndex === selectedOption ? "border-emerald-400" : "border-gray-700"
          }`}
          placeholder={placeholder}
        ></input>
        <button
          type="button"
          onClick={() => setCorrectIndex(optionIndex as 0 | 1 | 2 | 3)}
          className={`absolute right-2 p-[0.40rem] bottom-4  rounded-lg transition-all ${
            optionIndex === selectedOption ? "bg-emerald-400" : "bg-gray-900"
          }`}
        >
          <Check size={18} />
        </button>
      </div>
    );
  }
);

Option.displayName = "Option";
