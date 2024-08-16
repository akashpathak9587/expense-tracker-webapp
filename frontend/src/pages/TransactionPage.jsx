import { useEffect, useState } from "react";
import TransactionFormSkeleton from "../components/skeletons/TransactionFormSkeleton";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_TRANSACTION } from "../graphql/queries/transaction.query";
import toast from "react-hot-toast";
import { UPDATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import {useNavigate} from "react-router-dom";
import { formatFormDate } from "../utils/formatDate";

const TransactionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, data } = useQuery(GET_TRANSACTION, {
    variables: { transactionId: id },
  });
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: ["GetTransactions", "GetCategoryStatistics"],
  });
  const [formData, setFormData] = useState({
    description: "",
    paymentType: "",
    category: "",
    amount: "",
    location: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);

    try {
      await updateTransaction({
        variables: {
          input: {
            ...formData,
            transactionId: id,
            amount: amount,
          },
        },
      });
      toast.success("Transaction updated successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    if (data) {
      console.log(data);
      setFormData({
        description: data?.transaction?.description,
        paymentType: data?.transaction?.paymentType,
        category: data?.transaction?.category,
        amount: data?.transaction?.amount,
        location: data?.transaction?.location,
        date: formatFormDate(new Date(data?.transaction?.date)),
      });
    }
  }, [data]);
  if (loading) return <TransactionFormSkeleton />;
  return (
    <div className="h-screen max-w-4xl mx-auto flex flex-col items-center">
      <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
        Update this transaction
      </p>
      <form
        className="w-full max-w-lg flex flex-col gap-5 px-3"
        onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          <div className="w-full">
            <label
              htmlFor="description"
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Transaction
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Rent, Groceries, Salary etc."
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              htmlFor="paymentType"
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Payment Type
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="paymentType"
                id="paymentType"
                onChange={handleChange}
                value={formData.paymentType}>
                <option value={"card"}>Card</option>
                <option value={"cash"}>Cash</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              htmlFor="category"
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Category
            </label>
            <div className="relative">
              <select
                name="category"
                id="category"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={handleChange}
                value={formData.category}>
                <option value="saving">Saving</option>
                <option value="expense">Expense</option>
                <option value="investment">Investment</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              htmlFor="amount"
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Amount($)
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="150"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              htmlFor="location"
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="New York"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="w-full flex-1">
            <label
              htmlFor="date"
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Select date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600">
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionPage;
