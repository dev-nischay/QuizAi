export default function QuizHome() {
  return (
    <div className="max-w-3xl mx-auto mt-32 h-[40rem] flex flex-col gap-10 items-center justify-center pb-24 p-5">
      <div>
        <button className="uppercase bg-black text-lg font-black tracking-widest    rounded-xl   px-44 py-5 hover:scale-105 transition-all duration-100 hover:border ">
          create quiz
        </button>
      </div>

      <div className="uppercase text-4xl font-black ">or</div>

      <div>
        <button className="uppercase bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-lg font-black text-black tracking-widest    rounded-xl   px-[11.8rem] py-5 hover:scale-105 transition-all duration-100 hover:border  hover:border-green-700 ">
          join quiz
        </button>
      </div>
    </div>
  );
}
