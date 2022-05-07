import "./App.css";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import Header from "./components/Header";
import StoreProvider from "./stateManagement/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <Header />
      <CategoryForm />
      <CategoryList />
    </StoreProvider>
  );
}

export default App;
