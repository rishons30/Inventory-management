const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection string
const dbPassword = "arjunpk22";
const dbName = "Node-API";
const dbUser = "arjunpk004";
const dbCluster = "backenddb.csjpcsj.mongodb.net";
const dbConnectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://rishsimon5:<rishsimon5>@testing.taoeuoq.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Connection failed", err));

// Item model
const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    name: String,
    quantity: Number,
    status: String,
  })
);

// Sale model
const Sale = mongoose.model(
  "Sale",
  new mongoose.Schema({
    saleId: { type: Number, required: true },
    amount: { type: Number, required: true },
    customer: { type: String, required: true },
  })
);

// User model
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
  })
);

// Serve static files (like your HTML, CSS, and JavaScript files)
app.use(express.static("public"));

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid username or password" });
  }
});

// API routes for inventory items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/items", async (req, res) => {
  const { name, quantity, status } = req.body;
  const newItem = new Item({ name, quantity, status });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/api/items/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Item.findByIdAndDelete(id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API routes for sales
app.get("/api/sales", async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/sales", async (req, res) => {
  const { saleId, amount, customer } = req.body;
  const newSale = new Sale({ saleId, amount, customer });

  try {
    const savedSale = await newSale.save();
    res.status(201).json(savedSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/api/sales/:id", async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const updatedSale = await Sale.findByIdAndUpdate(
      id,
      { amount },
      { new: true }
    );
    res.json(updatedSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/sales/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Sale.findByIdAndDelete(id);
    res.json({ message: "Sale deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API routes for sales totals
app.get("/api/sales/totals", async (req, res) => {
  try {
    const totalSales = await Sale.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$amount" } } },
    ]);

    const monthlySales = await Sale.aggregate([
      { $group: { _id: { $month: new Date() }, total: { $sum: "$amount" } } },
    ]);

    const weeklySales = await Sale.aggregate([
      { $group: { _id: { $week: new Date() }, total: { $sum: "$amount" } } },
    ]);

    res.json({
      totalSales: totalSales[0] ? totalSales[0].totalSales : 0,
      monthlySales: monthlySales[0] ? monthlySales[0].total : 0,
      weeklySales: weeklySales[0] ? weeklySales[0].total : 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
