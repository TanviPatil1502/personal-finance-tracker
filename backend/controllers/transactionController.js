const Transaction = require("../models/Transaction");

// ADD TRANSACTION
exports.addTransaction = async (req, res) => {
    try {
        console.log("TOKEN RAW:", req.headers.authorization);

        console.log("DECODED USER:", req.user);  // MUST PRINT

        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "User ID missing from token" });
        }

        const userId = req.user.id;

        const { amount, type, category, date, note } = req.body;

        const transaction = await Transaction.create({
            userId,
            amount,
            type,
            category,
            date,
            note
        });

        res.json({ msg: "Transaction added successfully", transaction });

    } catch (err) {
        console.error("Error in addTransaction:", err);
        res.status(500).json({ msg: err.message });
    }
};


// GET ALL TRANSACTIONS
exports.getTransactions = async (req, res) => {
    try {
        if (!req.user || (!req.user.id && !req.user._id && !req.user.userId)) {
            return res.status(401).json({ msg: "Unauthorized: token missing or invalid" });
        }
        const userId = req.user.id || req.user._id || req.user.userId;
        const data = await Transaction.find({ userId });
        res.json(data);
    } catch (err) {
        console.error("Error in getTransactions:", err);
        res.status(500).json({ msg: err.message });
    }
};


