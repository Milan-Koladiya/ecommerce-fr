import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import './index.css'
import App from './App.js'
import store from './store/index.js';
import { AuthProvider } from "./context/AuthContex.js"
// import { AppCategoryProvider } from './context/CategoryContex.jsx';
// import { AppSubcategoryProvider } from './context/SubcategoryContex.jsx';
// import { AppProductProvider } from './context/ProductContex.jsx'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AuthProvider>
      {/* <AppCategoryProvider> */}
        {/* <AppSubcategoryProvider> */}
          {/* <AppProductProvider> */}
            <App />
          {/* </AppProductProvider> */}
        {/* </AppSubcategoryProvider> */}
      {/* </AppCategoryProvider> */}

    </AuthProvider>
  </Provider>
)

