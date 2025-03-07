import type { Question, Quiz } from "../features/quizzes/quizzesApiSlice"
import { useGetGroupQuery } from "../features/quizzes/quizzesApiSlice"
import { useParams } from "react-router"
import Loading from "../components/loading"
import girl from "../images/girl.png"
import boy from "../images/boy.png"
import pyramid from "../images/pyramid.png"
import confetti from "../images/confetti.gif"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  decrementBoys,
  decrementGirls,
  incrementBoys,
  incrementGirls,
  selectBoyStep,
  selectGirlStep
} from "../features/score/scoreSlice"
import { MinusIcon, PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import QuestionModal from "../components/question_modal"

export default function ShowQuiz() {
  const params = useParams()
  const slug = params.slug as string

  const stepBoys = useAppSelector(selectBoyStep)
  const stepGirls = useAppSelector(selectGirlStep)
  const dispatch = useAppDispatch()

  const { data, isLoading } = useGetGroupQuery(slug)

  const [question, setQuestion] = useState<Question | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [boysOrGirls, setBoysOrGirls] = useState<boolean>(false)
  const [finishedQuestions, setFinishedQuestions] = useState<number[]>([])

  if (isLoading || data === undefined) {
    return <Loading />
  }

  const group = data.group

  group.quizzes!.forEach((quiz) => {
    quiz.questions.map((question) => ({
      ...question,
      done: false
    }))
  })

  const quizzes = new Map<string, Quiz>()
  group.quizzes!.forEach((quiz) => quizzes.set(quiz.slug, quiz))

  const steps = ["step-1", "step-2", "last-step"]

  const transformStepBoy = [
    "translate-x-[-130px]",
    "translate-x-[20px] translate-y-[-145px]",
    "translate-x-[170px] translate-y-[-290px]",
    "translate-x-[320px] translate-y-[-435px]",
  ]

  const transformStepGirl = [
    "translate-x-[130px]",
    "translate-x-[-20px] translate-y-[-145px]",
    "translate-x-[-170px] translate-y-[-290px]",
    "translate-x-[-320px] translate-y-[-435px]",
  ]

  function openQuestion(boys: boolean) {
    const key = boys ? steps[stepBoys] : steps[stepGirls]
    const quiz = quizzes.get(key)!

    const question = quiz.questions.filter((question) => !finishedQuestions.includes(question.id))[0] ?? null
    if (question === null) return

    setQuestion(question)
    setBoysOrGirls(boys)
    setOpen(true)
  }

  function ciEquals(a : any, b : any) {
    return typeof a === 'string' && typeof b === 'string'
      ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
      : a === b;
  }

  function checkAnswer(answer: number | string): boolean {
    setFinishedQuestions([...finishedQuestions, question!.id]);

    if (question!.answers.filter((currentAnswer) => ciEquals(currentAnswer, answer)).length > 0) {
      if (boysOrGirls) {
        dispatch(incrementBoys())
      } else {
        dispatch(incrementGirls())
      }

      return true
    }

    return false
  }

  return (
    <div className="py-6 flex flex-col items-center justify-between h-full">
      <QuestionModal
        question={question}
        checkAnswer={checkAnswer}
        open={open} setOpen={setOpen}
      />

      <h1
        className="bg-red-600/80 text-2xl font-bold transition-colors px-12 py-2 rounded-lg text-white text-center">{group.name}</h1>

      <div className="mt-12 flex items-end h-full">
        <div className="relative flex items-end justify-center">
          <div
            className="absolute bottom-0 -ml-44 left-0 flex flex-col space-y-3 text-white font-bold text-lg items-center justify-center">
            <button className="bg-green-600 hover:bg-green-700 transition-colors rounded-full p-2"
                    onClick={() => dispatch(incrementBoys())}>
              <PlusIcon className="w-6 h-6" />
            </button>

            <button className="bg-red-600 hover:bg-red-700 transition-colors rounded-full p-2"
                    onClick={() => dispatch(decrementBoys())}>
              <MinusIcon className="w-6 h-6" />
            </button>
          </div>


          <div
            className={`absolute top-0 left-50 -mt-[300px] z-20 duration-300 transition-opacity ${stepGirls === 3 || stepBoys === 3 ? "opacity-100" : "opacity-0"}`}>
            <img src={confetti} alt="Confetti" className="w-80" />
          </div>

          <img alt="Boy"
               className={`absolute w-32 z-20 transition-transform duration-300 bottom-0 left-0 ${transformStepBoy[stepBoys]}`}
               src={boy} />

          {!(stepBoys === 3 || stepGirls === 3) && (
            <button className={`absolute bottom-0 left-0 z-30 ml-[135px] mb-[30px] ${transformStepBoy[stepBoys]}
           bg-red-500 hover:bg-red-700 transition-all rounded-full text-white p-3 flex items-center`}
                    onClick={() => openQuestion(true)}>

              <QuestionMarkCircleIcon className="w-6 h-6" />
            </button>
          )}

          {!(stepBoys === 3 || stepGirls === 3) && (
            <button className={`absolute bottom-0 right-0 z-30 mr-[135px] mb-[30px] ${transformStepGirl[stepGirls]}
           bg-red-500 hover:bg-red-700 transition-all rounded-full text-white p-3 flex items-center`}
                    onClick={() => openQuestion(false)}>

              <QuestionMarkCircleIcon className="w-6 h-6" />
            </button>
          )}

          <img alt="Pyramid" className="z-10" src={pyramid} />

          <img alt="Girl"
               className={`absolute w-32 z-20 transition-transform duration-300 bottom-0 right-0 ${transformStepGirl[stepGirls]}`}
               src={girl} />

          <div
            className="absolute bottom-0 -mr-44 right-0 flex flex-col space-y-3 text-white font-bold text-lg items-center justify-center">
            <button className="bg-green-600 hover:bg-green-700 transition-colors rounded-full p-2"
                    onClick={() => dispatch(incrementGirls())}>
              <PlusIcon className="w-6 h-6" />
            </button>

            <button className="bg-red-600 hover:bg-red-700 transition-colors rounded-full p-2"
                    onClick={() => dispatch(decrementGirls())}>
              <MinusIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}