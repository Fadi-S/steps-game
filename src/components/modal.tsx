import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/24/outline"
import { Option, QuestionType } from "../features/quizzes/quizzesApiSlice"
import React, { useState } from "react"

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  options: Option[]|null;
  type: QuestionType;
  checkAnswer: (answer: string|number) => void;
}

export default function QuestionModal({ open, setOpen, title, options, type, checkAnswer }: ModalProps) {

  const [answer, setAnswer] = useState<string|number>("");

  function submit(event : React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    checkAnswer(answer);
    setAnswer("");
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-30">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon aria-hidden="true" className="size-6 text-green-600" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                  {title}
                </DialogTitle>
              </div>
            </div>
            {type === QuestionType.Choose && (
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                {options?.map((option) => (
                  <button key={option.id} type="button"
                          onClick={() => checkAnswer(option.order)}
                  >
                    {option.name}
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
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  <button type="submit" className="mt-2 bg-green-600 hover:bg-green-700 transition-colors text-white px-4 py-2 rounded-md text-base font-semibold">
                    Submit
                  </button>
                </form>

              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
