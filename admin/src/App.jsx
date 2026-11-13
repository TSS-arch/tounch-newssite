import { Provider } from "react-redux";
import { store } from "./store";
import AdminPage from "./pages/admin/AdminPage";

export default function App() {
  return (
    <Provider store={store}>
      <AdminPage />
    </Provider>
  );
}
