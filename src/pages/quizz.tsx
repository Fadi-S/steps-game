import { useGetGroupQuery, Quiz } from "../features/quizzes/quizzesApiSlice"
import { useParams } from "react-router";
import Loading from "./loading"
import girl from "../images/girl.png";
import boy from "../images/boy.png";
import pyramid from "../images/pyramid.png";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { incrementBoys, incrementGirls, selectBoyStep, selectGirlStep } from "../features/score/scoreSlice";

export default function ShowQuiz() {
  const params = useParams();
  const slug = params.slug as string;

  const stepBoys = useAppSelector(selectBoyStep);
  const stepGirls = useAppSelector(selectGirlStep);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetGroupQuery(slug);

  if (isLoading || data === undefined) {
    return <Loading/>
  }

  const group = data.group;

  const quizzes = new Map<string, Quiz>();
  group.quizzes!.map((quiz) => {
    quizzes.set(quiz.slug, quiz);
  })
  const steps = ["step-1", "step-2", "step-3", "last-step"];

  const transformStepBoy = [
    "translate-x-[-130px]",
    "translate-x-[-20px] translate-y-[-110px]",
    "translate-x-[90px] translate-y-[-220px]",
    "translate-x-[200px] translate-y-[-330px]",
    "translate-x-[320px] translate-y-[-440px]",
  ];

  const transformStepGirl = [
    "translate-x-[130px]",
    "translate-x-[20px] translate-y-[-110px]",
    "translate-x-[-90px] translate-y-[-220px]",
    "translate-x-[-200px] translate-y-[-330px]",
    "translate-x-[-320px] translate-y-[-440px]",
  ];

  return (
    <div className="py-6 flex flex-col items-center justify-between h-full">
      <h1
        className="bg-red-600 text-2xl font-bold transition-colors px-12 py-4 rounded-lg text-white text-center">{group.name}</h1>

      <button onClick={() => dispatch(incrementGirls())}>
        Increase Girls
      </button>
      <button onClick={() => dispatch(incrementBoys())}>
        Increase Boys
      </button>

      <div className="mt-12 flex items-end h-full">
        <div className="relative flex items-end justify-center">
          <img alt="Boy"
               className={`absolute w-32 z-20 transition-transform duration-300 bottom-0 left-0 ${transformStepBoy[stepBoys]}`}
               src={boy} />

          <img alt="Pyramid" className="z-10" src={pyramid} />

          <img alt="Girl"
               className={`absolute w-32 z-20 transition-transform duration-300 bottom-0 right-0 ${transformStepGirl[stepGirls]}`}
               src={girl} />
        </div>
      </div>
    </div>
  )
}