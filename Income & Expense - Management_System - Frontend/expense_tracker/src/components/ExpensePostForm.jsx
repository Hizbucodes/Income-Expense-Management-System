import axios from "axios";
import React, { useState } from "react";

const ExpensePostForm = () => {
  const POST_EXPENSE_API = "http://localhost:8080/api/expense/createExpense";
  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
    date: "",
    description: "",
    category: "",
    availableCategories: [
      "Salary",
      "Stocks",
      "Freelancing",
      "Bank Transaction",
      "Investments",
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(POST_EXPENSE_API, formData);
      alert("Successfully Created the Income");
    } catch (err) {
      console.log("Something went wrong while creating the income: " + err);
      alert("oops something went wrong while creating the incom");
    }

    setFormData({
      title: "",
      amount: 0,
      date: "",
      description: "",
      category: "select the category",
      availableCategories: [
        "Salary",
        "Stocks",
        "Freelancing",
        "Bank Transaction",
        "Investments",
      ],
    });
  };
  return (
    <div className="border-2 w-[500px] h-[550px] rounded-lg">
      <div className="bg-gray-200 text-center p-5 font-bold">
        <p>Create New Expense</p>
      </div>

      <div className="p-5">
        <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter title"
            className="border-2 p-2"
          />
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            className="border-2 p-2"
          />

          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            placeholder="Select Date"
            className="border-2 p-2"
          />

          <select
            name="category"
            id="category"
            className="border-2 p-2"
            onChange={handleInputChange}
            value={formData.category}
          >
            <option>Select the category</option>

            {formData.availableCategories.map((ctg, index) => (
              <option key={index} value={ctg}>
                {ctg}
              </option>
            ))}
          </select>

          <textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            className="border-2 p-2 resize-none"
          />

          <button
            type="submit"
            className="p-2 bg-slate-600 text-white w-full rounded-lg hover:scale-105 duration-200 ease-in-out font-semibold"
          >
            Create Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpensePostForm;
