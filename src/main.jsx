import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import './index.css'
import App from './App.jsx'
import store from './store/index.jsx';
import { AuthProvider } from "./context/AuthContex.jsx"
import { AppCategoryProvider } from './context/CategoryContex.jsx';
import { AppSubcategoryProvider } from './context/SubcategoryContex.jsx';
import { AppProductProvider } from './context/ProductContex.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <AppCategoryProvider>
        <AppSubcategoryProvider>
          <AppProductProvider>
            <App />
          </AppProductProvider>
        </AppSubcategoryProvider>
      </AppCategoryProvider>

    </AuthProvider>
  </Provider>
)

