import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { CREATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
const TransactionForm = () => {
  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: ["GetTransactions", "GetCategoryStatistics"]
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const transactionData = {
      description: formData.get("description"),
      amount: parseFloat(formData.get("amount")),
      paymentType: formData.get("paymentType"),
      category: formData.get("category"),
      location: formData.get("location"),
      date: formData.get("date")
    }

    try {
      await createTransaction({variables: {input: transactionData}})
      form.reset();
      toast.success("Transaction created successfully!");
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
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
            required
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
              name="paymentType"
              id="paymentType"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option value="card">Card</option>
              <option value="cash">Cash</option>
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
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
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
            Amount(₹)
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="150"
            required
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
            required
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
            required
          />
        </div>
      </div>

      <button className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600 disabled:opactiy-70 disabled:cursor-not-allowed" disabled={loading}>
        {loading ? "Loading..." : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
