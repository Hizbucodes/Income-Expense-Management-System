import React, { useEffect, useState } from "react";

const ExpenseEditForm = ({
  title,
  editTitle,
  editCategory,
  editAmount,
  editDate,
  setEditTitle,
  setEditCategory,
  setEditAmount,
  setEditDate,
  expenseData,
  editDescription,
  setEditDescription,
  handleEdit,
  id,
}) => {
  const [formCategoryData, setFormCategoryData] = useState({
    availableCategories: [
      "Salary",
      "Stocks",
      "Freelancing",
      "Bank Transaction",
      "Investments",
    ],
  });

  const expenseDetails = expenseData.find(
    (incomedtl) => incomedtl.id.toString() === id
  );

  useEffect(() => {
    if (expenseDetails) {
      setEditTitle(expenseDetails.title);
      setEditAmount(expenseDetails.amount);
      setEditCategory(expenseDetails.category);
      setEditDate(expenseDetails.date);
      setEditDescription(expenseDetails.description);
    }
  }, [
    expenseDetails,
    setEditTitle,
    setEditCategory,
    setEditAmount,
    setEditDate,
    setEditDescription,
  ]);

  return (
    <div className="w-[80%] text-center border-2 pb-2 rounded-lg">
      <div className="bg-gray-200 p-2 mb-2 rounded-t-lg">
        <h1 className="font-bold text-xl">{title}</h1>
      </div>

      <form
        className="flex flex-col gap-y-5 px-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          id="title"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Enter title"
          className="border-2 p-2 rounded-lg"
          required
        />
        <input
          type="number"
          id="amount"
          value={editAmount}
          onChange={(e) => setEditAmount(e.target.value)}
          placeholder="Enter amount"
          className="border-2 p-2 rounded-lg"
          required
        />

        <input
          type="date"
          id="date"
          value={editDate}
          onChange={(e) => setEditDate(e.target.value)}
          placeholder="Select Date"
          className="border-2 p-2 rounded-lg"
          required
        />

        <select
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
          id="category"
          className="border-2 p-2 rounded-lg"
          required
        >
          <option>Select the category</option>

          {formCategoryData.availableCategories.map((ctg, index) => (
            <option key={index} value={ctg}>
              {ctg}
            </option>
          ))}
        </select>

        <textarea
          id="description"
          value={editDescription}
          onChange={(e) => setEditTitle(e.target.value)}
          rows={5}
          placeholder="Enter description"
          className="border-2 p-2 resize-none rounded-lg"
          required
        />

        <button
          type="submit"
          onClick={() => handleEdit(expenseDetails.id)}
          className="p-2 bg-slate-600 text-white w-full rounded-lg hover:scale-[101%] overflow-hidden duration-200 ease-linear font-semibold"
        >
          Update Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseEditForm;
