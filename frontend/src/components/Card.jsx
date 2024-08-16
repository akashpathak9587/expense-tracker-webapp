import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { BsCardText } from "react-icons/bs";
import { FaLocationDot, FaSackDollar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdOutlinePayment } from "react-icons/md";
import { formatDate } from "../utils/formatDate";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import toast from "react-hot-toast";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-700 to-pink-400",
  investment: "from-blue-700 to-blue-400",
};
const Card = ({ transaction, authUser }) => {
  const { category, amount, location, date, paymentType, description } =
    transaction;
  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["GetTransactions", "GetCategoryStatistics"],
  });
    
    const handleDelete = async () => {
        try {
            await deleteTransaction({
                variables: {transactionId: transaction._id}
            })
            toast.success("Transaction deleted successfully.");
        } catch (error) {
            console.error("Error deleting transaction:", error);
            toast.error(error.message);
        }
    }
  const cardClass = categoryColorMap[category];
  const formattedDate = formatDate(date);
  return (
    <div className={`rounded-md p-4 bg-gradient-to-r ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <div className="text-lg font-bold text-white">{category}</div>
          <div className="flex items-center gap-2">
            {!loading && <FaTrash className="cursor-pointer" onClick={handleDelete} />}
            {loading && (
              <div className="w-6 h-6 border-t-2 border-b-2 rounded-full animate-spin"></div>
            )}
            <Link to={`/transaction/${transaction._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description: {description}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayment />
          Payment Type: {paymentType}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: ₹{amount}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: {location || "N/A"}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">{formattedDate}</p>
          <img
            src={authUser?.profilePicture}
            className="w-8 h-8 rounded-full border"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
