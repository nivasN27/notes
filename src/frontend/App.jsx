import Notes from '../screens/Notes'
// import Testing from '../components/Testing'
import '../styles/App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {path:"/", element: <Notes/>},
    // {path:"/", element: <Testing/>},
  ])

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
