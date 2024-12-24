import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ROOT_URL, API_KEY, API_SECRET } from "../../app/consts";

interface Group {
  id: number
  slug: string
  name: string
  quizzes: Quiz[]|null
}

interface Quiz {
  id: number
  name: string
  group: Group
  questions: Question[]|null
}

interface Question {
  id: number
  title: string
  picture: string|null
  type: QuestionType

}

enum QuestionType {
  Choose = 1,
  Written = 2,
}

interface GroupsApiResponse {
  groups: Group[]
}

interface QuizApiResponse {
  quiz: Quiz
}

// Define a service using a base URL and expected endpoints
export const quizzesApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: ROOT_URL,
    prepareHeaders: (headers, {}) => {
      const key = btoa(API_KEY + ":" + API_SECRET);
      headers.set("Authorization", `Basic ${key}`);

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  reducerPath: "quizzesApi",
  tagTypes: ["Quizzes"],
  endpoints: build => ({
    getGroups: build.query<GroupsApiResponse, number>({
      query: () => `/groups`,
      providesTags: (result, error, id) => [{ type: "Quizzes", id }],
    }),
  }),
})

export const { useGetGroupsQuery } = quizzesApiSlice