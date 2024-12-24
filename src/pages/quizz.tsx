import { useGetGroupQuery, Quiz, Question } from "../features/quizzes/quizzesApiSlice"
import { useParams } from "react-router";
import Loading from "../components/loading"
import girl from "../images/girl.png";
import boy from "../images/boy.png";
import pyramid from "../images/pyramid.png";
import confetti from "../images/confetti.gif";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { incrementBoys, incrementGirls, decrementBoys, decrementGirls, selectBoyStep, selectGirlStep } from "../features/score/scoreSlice";
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import Modal from "../components/modal"
import { useState } from "react"

export default function ShowQuiz() {
  const params = useParams();
  const slug = params.slug as string;

  const stepBoys = useAppSelector(selectBoyStep);
  const stepGirls = useAppSelector(selectGirlStep);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetGroupQuery(slug);

  const [question, setQuestion] = useState<Question|null>(null);

  if (isLoading || data === undefined) {
    return <Loading/>
  }

  const group = data.group;

  const quizzes = new Map<string, Quiz>();
  group.quizzes!.forEach((quiz) => quizzes.set(quiz.slug, quiz))

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

  function openQuestion(boys: boolean) {
    const key = boys ? steps[stepBoys] : steps[stepGirls];
    const quiz = quizzes.get(key)!;

    const question = quiz.questions.filter((question) => question.done)[0];
    question.done = true;
    setQuestion(question);
  }

  return (
    <div className="py-6 flex flex-col items-center justify-between h-full">
      <Modal isOpen={question !== null}>

      </Modal>

      <h1
        className="bg-red-600/80 text-2xl font-bold transition-colors px-12 py-2 rounded-lg text-white text-center">{group.name}</h1>

      <div className="mt-12 flex items-end h-full">
        <div className="relative flex items-end justify-center">
          <div
            className="absolute bottom-0 -ml-44 left-0 flex flex-col space-y-3 text-white font-bold text-lg items-center justify-center">
            <button className="bg-green-600 hover:bg-green-700 transition-colors rounded-full p-3"
                    onClick={() => dispatch(incrementBoys())}>
              +
            </button>

            <button className="bg-red-600 hover:bg-red-700 transition-colors rounded-full p-3"
                    onClick={() => dispatch(decrementBoys())}>
              -
            </button>
          </div>


          <div
            className={`absolute top-0 left-50 -mt-64 z-20 duration-300 transition-opacity ${stepGirls === 4 || stepBoys === 4 ? 'opacity-100' : 'opacity-0'}`}>
            <img src={confetti} alt="Confetti" className="w-80" />
          </div>

          <img alt="Boy"
               className={`absolute w-32 z-20 transition-transform duration-300 bottom-0 left-0 ${transformStepBoy[stepBoys]}`}
               src={boy} />

          <button className={`absolute bottom-0 left-0 z-30 ml-[130px] ${transformStepBoy[stepBoys]}
           bg-red-500 hover:bg-red-700 transition-colors rounded-md text-white px-2 py-3 flex items-center`}
                  onClick={() => openQuestion(true)}>

            <QuestionMarkCircleIcon className="w-6 h-6 mr-2" />
            <span>Open question</span>
          </button>

          <img alt="Pyramid" className="z-10" src={pyramid} />

          <img alt="Girl"
               className={`absolute w-32 z-20 transition-transform duration-300 bottom-0 right-0 ${transformStepGirl[stepGirls]}`}
               src={girl} />

          <div
            className="absolute bottom-0 -mr-44 right-0 flex flex-col space-y-3 text-white font-bold text-lg items-center justify-center">
            <button className="bg-green-600 hover:bg-green-700 transition-colors rounded-full p-3"
                    onClick={() => dispatch(incrementGirls())}>
              +
            </button>

            <button className="bg-red-600 hover:bg-red-700 transition-colors rounded-full p-3"
                    onClick={() => dispatch(decrementGirls())}>
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}