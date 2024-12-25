import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/24/outline"
import { Option, QuestionType } from "../features/quizzes/quizzesApiSlice"
import React, { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  options: Option[]|null;
  type: QuestionType;
  checkAnswer: (answer: string|number) => boolean;
  answers: string[]|number[]|undefined;
}

export default function QuestionModal({ open, setOpen, title, options, type, checkAnswer, answers }: ModalProps) {

  const [answer, setAnswer] = useState<string|number>("");
  const [correct, setCorrect] = useState<boolean|null>(null);

  function submit(event : React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCorrect(checkAnswer(answer));
  }

  function select(answer: number) {
    setAnswer(answer);
    setCorrect(checkAnswer(answer));
  }

  function onClose() {
    setOpen(false);
    setCorrect(null);
    setAnswer("");
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-30">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 sm:p-6 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                onClick={() => onClose()}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div>
              <div className="mb-3 text-center">
                <DialogTitle as="h3" className="text-3xl font-semibold text-gray-900">
                  {title}
                </DialogTitle>
              </div>
            </div>
            {type === QuestionType.Choose && (
              <div className="mt-5 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-4">
                {options?.map((option) => (
                  <button
                    disabled={correct !== null}
                    className={
                      `px-2 py-3 ring ring-gray-600 rounded-lg transition-colors duration-400 `
                      + (correct === null ? "bg-gray-50 hover:bg-gray-200" : ((answers as number[]).includes(option.order) ? "bg-green-600 text-white" : (answer === option.order ? "bg-red-600 text-white" : "")))
                    } key={option.id} type="button"
                    onClick={() => select(option.order)}
                  >
                    {option.picture && (
                      <img src={option.picture} alt={option.name} className="h-64 mx-auto" />
                    )}
                    <span>{option.name}</span>
                  </button>
                ))}
              </div>
            )}

            {type === QuestionType.Written && (
              <div className="mt-5">
                <form onSubmit={submit}>
                  <input
                    name="answer"
                    type="text"
                    placeholder="......"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className={
                    "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 focus:-outline-offset-2 sm:text-sm/6 "
                  }
                  />
                  <button type="submit"
                          className="mt-2 bg-green-600 hover:bg-green-700 transition-colors text-white px-4 py-2 rounded-md text-base font-semibold">
                    Submit
                  </button>
                </form>

                {correct !== null && (
                  <div className="flex space-x-2 mt-5">
                    {(answers as string[]).map((currentAnswer) => (
                      <div className={
                        "p-2 border border-green-600 rounded " +
                        (currentAnswer === answer ? "bg-green-600 text-white" : "text-green-600")
                      }>
                        <span>{currentAnswer}</span>

                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
