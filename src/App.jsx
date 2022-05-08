import "./App.css";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import Header from "./components/Header";
import StoreProvider from "./stateManagement/StoreProvider";

/**
 * It is the main component of our application and includes all other components.
 * <p>
 *
 * @author Jhonny Castro <johnny.castro@misena.edu.co>
 * @version 1.0.0 7/05/2022
 * @since 1.0.0
 */
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
