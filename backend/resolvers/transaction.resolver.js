import Transaction from "../models/transaction.model.js";

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

        transaction: async (_, { transactionId }, ) => {
            try {
                const transaction = await Transaction.find({ transactionId });
                return transaction;
            } catch (error) {
                console.error("Error getting transaction: ", error);
                throw new Error(error.message || "Error getting transaction");
                
            }
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