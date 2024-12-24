import { useGetGroupsQuery } from "../features/quizzes/quizzesApiSlice"
import { Link } from "react-router"
import { useParams } from "react-router";
import { useEffect } from "react"

export default function QuizzesIndex() {
  let { group } = useParams();
  useEffect(() => {
    console.log(group);
  });


  // const { data, isLoading } = useGetGroupsQuery(1)
  //
  // if (isLoading || data === undefined) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   )
  // }


  return (
    <div >
      <h1>{group}</h1>
    </div>
  )
}