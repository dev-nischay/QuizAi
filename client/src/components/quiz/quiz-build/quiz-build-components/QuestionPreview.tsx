import { Trash2 } from "lucide-react";
import { Edit2 } from "lucide-react";
import type { Question, QuestionPreviewProps } from "../../quiz.types";
export const QuestionPreview = ({
  options,
  correctOptionIndex,
  text,
  _id,
  quesControls,
  i,
  setEditing,
  setEditQuestion,
}: QuestionPreviewProps) => {
  const { removeQuestion } = quesControls;

  const handleEdit = (_id: string) => {
    // const question = getQuestion(_id);

    const question: Question = { _id, text, correctOptionIndex, options };
    // handle undefined

    if (question) {
      setEditing(true);
      setEditQuestion(question);
    }
  };

  return (
    <div className="w-full relative h-fit bg-gradient-to-r px-10 py-4 from-gray-950 via-black/50 to-slate-950 rounded-2xl border-emerald-800 border mt-5  ">
      <div className="flex justify-between ">
        <div className="bg-emerald-800/50 w-10 uppercase h-6 rounded-lg font-mono text-emerald-400 font-semibold text-xs flex justify-center items-center  ">
          q{Number(i) + 1}
        </div>

        {/* edit and delete questions */}
        <div className="flex gap-2 items-center">
          <div>
            <button
              onClick={() => handleEdit(_id)}
              className="p-2 bg-emerald-500/10 border border-teal-500/30 rounded-lg hover:bg-teal-500/20 transition-all text-teal-400"
            >
              <Edit2 size={18} />
            </button>
          </div>
          <div className="text-red-400">
            <button
              onClick={() => removeQuestion(_id)}
              className="p-2 bg-red-950 border border-red-900 hover:bg-red-900 rounded-lg hover:bg-teal-500/20 transition-all text-red-400"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* question title */}

      <div className="text-xl font-bold">{text}</div>

      {/* options */}

      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        {options.map((e, index) => (
          <OptionPreview text={e} index={index} correctOptionIndex={correctOptionIndex} />
        ))}
      </div>
    </div>
  );
};

const OptionPreview = ({
  text,
  index,
  correctOptionIndex,
}: {
  text: string;
  index: number;
  correctOptionIndex: 0 | 1 | 2 | 3;
}) => {
  return (
    <div
      className={`w-full relative  px-4 py-2  rounded-lg  mt-1   border    focus:ring-2 flex gap-2 transition-all  ${
        index == correctOptionIndex
          ? "text-emerald-400 border-emerald-800 bg-emerald-950"
          : "text-gray-500 border-gray-800 bg-black"
      }`}
    >
      <span>{String.fromCharCode(65 + index)}.</span>
      {text}
    </div>
  );
};
