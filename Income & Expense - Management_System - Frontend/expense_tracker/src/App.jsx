import { Route, Router, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import IncomePage from "./pages/IncomePage";
import ExpensePage from "./pages/ExpensePage";
import EditIncomePage from "./pages/EditIncomePage";
import EditExpensePage from "./pages/EditExpensePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/income/editIncome/:id" element={<EditIncomePage />} />
        <Route path="/expense/editExpense/:id" element={<EditExpensePage />} />
      </Routes>
    </div>
  );
}

export default App;
