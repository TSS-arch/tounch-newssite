import { Provider } from "react-redux";
import { store } from "./store";
import FeedPage from "./pages/feed/FeedPage";

export default function App() {
  return (
    <Provider store={store}>
      <FeedPage />
    </Provider>
  );
}
