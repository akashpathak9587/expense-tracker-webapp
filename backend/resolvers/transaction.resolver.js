import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transactionResolver = {
    Query: {
        transactions: async (_, __, context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthorized");
                const userId = await context.getUser()._id;
                const transactions = await Transaction.find({ userId });
                return transactions;
            } catch (err) {
                console.error("Error getting transactions: ", err);
                throw new Error(err.message || "Error getting transactions");
            }
        },

        transaction: async (_, { transactionId } ) => {
            try {
                const transaction = await Transaction.findById(transactionId);
                if (transaction) {
                    transaction.user = await User.findById(transaction.userId);
                }
                return transaction;
            } catch (error) {
                console.error("Error getting transaction: ", error);
                throw new Error(error.message || "Error getting transaction");
                
            }
        },

        categoryStatistics: async (_, __, context) => {
            if (!context.getUser()._id) throw new Error("Unauthorized");
            const userId = await context.getUser()._id;
            const transactions = await Transaction.find({ userId });
            const categoryMap = {};

            transactions.forEach((transaction) => {
                if (!categoryMap[transaction.category]) {
                    categoryMap[transaction.category] = 0;
                }
                categoryMap[transaction.category] += transaction.amount;
            })
            console.log(categoryMap);

            return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }));
        }
    },
    Mutation: {
        createTransaction: async (_, { input }, context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthorized");
                const userId = await context.getUser()._id;
                const newTransaction = await new Transaction({...input, userId }).save();
                return newTransaction;
            } catch (error) {
                console.error("Error creating transaction: ", error);
                throw new Error(error.message || "Error creating transaction");
            }
        },
        updateTransaction: async (_, { input }, context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthorized");
                const { transactionId,...updateData } = input;
                const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, updateData, { new: true });
                if (!updatedTransaction) throw new Error("Transaction not found");
                return updatedTransaction;
            } catch (error) {
                console.error("Error updating transaction: ", error);
                throw new Error(error.message || "Error updating transaction");
            }
        },
        deleteTransaction: async (_, { transactionId }, context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthorized");
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
                if (!deletedTransaction) throw new Error("Transaction not found");
                return deletedTransaction;
            } catch (error) {
                console.error("Error deleting transaction: ", error);
                throw new Error(error.message || "Error deleting transaction");
            }
        }
    }
}

export default transactionResolver