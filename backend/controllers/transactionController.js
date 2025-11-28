const Transaction = require("../models/Transaction");

// CREATE TRANSACTION
exports.createTransaction = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const userId = req.user;  // ⭐ FIXED — req.user is string not object

    const { amount, type, category, date, note } = req.body;

    const tx = await Transaction.create({
      userId,
      amount,
      type,
      category,
      date,
      note
    });

    res.json(tx);

  } catch (err) {
    console.error("Error in createTransaction:", err);
    res.status(500).json({ msg: err.message });
  }
};



// GET ALL TRANSACTIONS
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user;  // ⭐ FIXED
    const tx = await Transaction.find({ userId });
    res.json(tx);
  } catch (err) {
    console.error("Error in getTransactions:", err);
    res.status(500).json({ msg: err.message });
  }
};



// DELETE TRANSACTION
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);

        if (!transaction) {
            return res.status(404).json({ msg: "Transaction not found" });
        }

        res.json({ msg: "Transaction deleted successfully" });

    } catch (err) {
        console.error("Error in deleteTransaction:", err);
        res.status(500).json({ msg: err.message });
    }
};
