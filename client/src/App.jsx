
import Body from "./Pages/Body"
import { Provider } from "react-redux"
import store from "./Components/Redux/store"

function App() {
  console.log(`**** App.jsx *****`)
  return (
    <Provider store={store}>
      <Body />
    </Provider>
  )
}

export default App





 












