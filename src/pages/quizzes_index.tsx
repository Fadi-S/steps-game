import { useGetGroupsQuery } from "../features/quizzes/quizzesApiSlice"
import { Link } from "react-router"
import hatImage from "../images/hat.png";
import Loading from "../components/loading"
import santaImage from "../images/santa.png"

export default function QuizzesIndex() {

  const { data, isLoading } = useGetGroupsQuery(1)

  if (isLoading || data === undefined) {
    return <Loading/>
  }

  const groups = data.groups

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col space-y-10">
        {groups.map((group) => (
          <Link to={`/${group.slug}`}
                className="relative bg-red-600 hover:bg-red-700 text-3xl font-bold transition-colors px-20 py-6 rounded-lg text-white text-center"
                key={group.id}
          >
            <div className="absolute right-0 top-0 -mt-10 -mr-10 rotate-12">
              <img src={hatImage} alt="Hat" className="w-20 h-20 inline-block" />
            </div>

            {group.name}
          </Link>
        ))}
      </div>

      <div className="absolute right-20 bottom-20 z-0 bg-cover bg-center w-64 rotate-[-15deg] h-auto">
        <img src={santaImage} alt="Santa" />
      </div>
    </div>
  )
}