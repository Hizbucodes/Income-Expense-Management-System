import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import EditForm from "../components/EditForm";
import axios from "axios";

const EditIncomePage = () => {
  const GET_ALL_INCOMES_API = "http://localhost:8080/api/income/getAllIncomes";
  const UPDATE_INCOME_API = "http://localhost:8080/api/income/updateIncomeById";
  const { id } = useParams();
  const navigate = useNavigate();
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editAmount, setEditAmount] = useState(0);
  const [editDate, setEditDate] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [incomeData, setIncomeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllIncomes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(GET_ALL_INCOMES_API);
        setIncomeData(response.data);
      } catch (err) {
        console.log("Something went wrong", err);
      } finally {
        setIsLoading(false);
      }
    };

    getAllIncomes();
  }, []);

  const handleEdit = async (id) => {
    const updatedIncome = {
      id,
      title: editTitle,
      amount: editAmount,
      category: editCategory,
      date: editDate,
      description: editDescription,
    };
    try {
      const response = await axios.put(
        `${UPDATE_INCOME_API}/${id}`,
        updatedIncome
      );
      setIncomeData(
        incomeData.map((incomedta) =>
          incomedta.id === id ? { ...response.data } : incomedta
        )
      );
      alert("Income Details has been Updated Successfully");
      setEditTitle("");
      setEditAmount(0);
      setEditCategory("");
      setEditDate("");
      setEditDescription("");
      navigate("/income");
    } catch (err) {
      console.log(
        "Something went wrong while updating the income details" +
          err +
          `${UPDATE_INCOME_API}/${id}`
      );
    }
  };

  return (
    <div className=" p-2 flex ">
      <SideBar />
      <div className="w-[85%] bg-slate-100 flex items-center justify-center rounded-lg shadow-xl m-5 p-5">
        <EditForm
          title="Update Income"
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
          incomeData={incomeData}
          id={id}
        />
      </div>
    </div>
  );
};

export default EditIncomePage;
