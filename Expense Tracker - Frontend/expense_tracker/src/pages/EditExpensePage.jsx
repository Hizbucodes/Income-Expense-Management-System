import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import EditForm from "../components/EditForm";
import axios from "axios";
import ExpenseEditForm from "../components/ExpenseEditForm";

const EditExpensePage = () => {
  const GET_ALL_EXPENSES_API =
    "http://localhost:8080/api/expense/getAllExpenses";
  const UPDATE_EXPENSE_API =
    "http://localhost:8080/api/expense/updateExpenseById";
  const { id } = useParams();
  const navigate = useNavigate();

  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editAmount, setEditAmount] = useState(0);
  const [editDate, setEditDate] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [expenseData, setExpenseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllExpenses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(GET_ALL_EXPENSES_API);
        setExpenseData(response.data);
      } catch (err) {
        console.log("Something went wrong", err);
      } finally {
        setIsLoading(false);
      }
    };

    getAllExpenses();
  }, []);

  const handleEdit = async (id) => {
    const updatedExpense = {
      id,
      title: editTitle,
      amount: editAmount,
      category: editCategory,
      date: editDate,
      description: editDescription,
    };
    try {
      const response = await axios.put(
        `${UPDATE_EXPENSE_API}/${id}`,
        updatedExpense
      );
      setExpenseData(
        expenseData.map((expensedta) =>
          expensedta.id === id ? { ...response.data } : expensedta
        )
      );
      alert("Expense Details has been Updated Successfully");
      setEditTitle("");
      setEditAmount(0);
      setEditCategory("");
      setEditDate("");
      setEditDescription("");
      navigate("/expense");
    } catch (err) {
      console.log(
        "Something went wrong while updating the expense details" +
          err +
          `${UPDATE_EXPENSE_API}/${id}`
      );
    }
  };

  return (
    <div className=" p-2 flex ">
      <SideBar />
      <div className="w-[85%] bg-slate-100 flex items-center justify-center rounded-lg shadow-xl m-5 p-5">
        <ExpenseEditForm
          title="Update Expense"
          handleEdit={handleEdit}
          editTitle={editTitle}
          editAmount={editAmount}
          editCategory={editCategory}
          editDate={editDate}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
          setEditTitle={setEditTitle}
          setEditAmount={setEditAmount}
          setEditCategory={setEditCategory}
          setEditDate={setEditDate}
          expenseData={expenseData}
          id={id}
        />
      </div>
    </div>
  );
};

export default EditExpensePage;
