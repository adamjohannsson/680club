import './App.css';
import Login from './components/Login/Login';
import NotFoundPage from './components/Global/NotFoundPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/finishSignUp',
    element: <div>Finish your sign up 🚧</div>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
