import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExpensePastList = () => {
  const GET_ALL_EXPENSE_API =
    "http://localhost:8080/api/expense/getAllExpenses";
  const DELETE_API = "http://localhost:8080/api/expense/deleteExpenseById";

  const [expenseData, setExpenseData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllExpense = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(GET_ALL_EXPENSE_API);
        setExpenseData(response.data);
      } catch (err) {
        console.log("Something went wrong", err);
      } finally {
        setIsLoading(false);
      }
    };

    getAllExpense();
  }, []);

  const handleDeleteExpense = async (id) => {
    try {
      if (
        confirm("Are you sure you want to delete this income data?") == true
      ) {
        await axios.delete(`${DELETE_API}/${id}`);
        alert("Expense deleted successfully");
        const newExpenses = expenseData.filter(
          (expensedta) => expensedta.id !== id
        );
        setIncomeData(newExpenses);
      }
    } catch (error) {
      alert("Something went wrong while trying to delete the expense", error);
    }
  };

  return (
    <div className="border-2 w-[700px] h-[550px] rounded-lg overflow-y-scroll">
      <div className="bg-gray-200 text-center p-5 font-bold sticky top-0">
        <p>Previous Expenses</p>
      </div>

      <div className="overflow-x-hidden">
        {expenseData.map((expensedta) => (
          <ul key={expensedta.id} className="p-2 ">
            <li>
              <div className="flex items-center py-2 justify-between hover:scale-[101%] hover:cursor-text hover:shadow-lg duration-100 ease-linear">
                {" "}
                <div className=" flex items-center justify-center gap-x-4 p-2 font-medium">
                  <p>{expensedta.title}</p>
                  <p>LKR {expensedta.amount}</p>
                  <p>{expensedta.date}</p>
                  <p>{expensedta.category}</p>
                </div>
                <div className="flex gap-x-4">
                  <Link
                    to={`editExpense/${expensedta.id}`}
                    className="border-2 w-20 px-2 flex items-center justify-between font-bold text-green-500 hover:bg-gray-100"
                  >
                    <img
                      src="https://cdn-icons-png.freepik.com/256/5828/5828638.png?ga=GA1.1.25224160.1712083754&semt=ais_hybrid"
                      className="w-[1rem]"
                    />{" "}
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDeleteExpense(expensedta.id)}
                    className="border-2 w-24 px-2 flex items-center justify-between font-bold text-red-500 hover:bg-gray-100"
                  >
                    <img
                      src="https://cdn-icons-png.freepik.com/256/17425/17425084.png?ga=GA1.1.25224160.1712083754&semt=ais_hybrid"
                      className="w-[1rem]"
                    />
                    Delete
                  </button>
                </div>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ExpensePastList;
