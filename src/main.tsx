import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./pages/layout"
import QuizzesIndex from "./pages/quizzes_index"
import ShowQuiz from "./pages/quizzes_index"


const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
          <Route element={<Layout />}>
            <Route index element={<QuizzesIndex />} />
            <Route path=":group" element={<ShowQuiz />} />
          </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
