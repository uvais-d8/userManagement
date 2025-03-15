import Approutes from "./routes/Approutes"
import { PersistGate } from "redux-persist/integration/react"
import { store,presistor } from "./redux/store/store"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={presistor}>
      <ToastContainer theme="dark" />
      <Approutes/>
      </PersistGate>

    </Provider>

  )
}

export default App