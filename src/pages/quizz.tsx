import { useGetGroupQuery } from "../features/quizzes/quizzesApiSlice"
import { useParams } from "react-router";
import Loading from "./loading"
import girl from "../images/girl.png";
import boy from "../images/boy.png";
import pyramid from "../images/pyramid.png";

export default function ShowQuiz() {
  let { slug } = useParams();
  slug = slug as string;

  const { data, isLoading } = useGetGroupQuery(slug);

  if (isLoading || data === undefined) {
    return <Loading/>
  }

  const group = data.group;

  return (
    <div className="pt-6 flex flex-col items-center justify-between h-full">
      <h1 className="bg-red-600 text-xl font-bold transition-colors px-12 py-4 rounded-lg text-white text-center">{group.name}</h1>

      <div className="mt-12 flex items-center h-full">
        <img alt="Pyramid" className="z-20" src={pyramid} />
      </div>
    </div>
  )
}