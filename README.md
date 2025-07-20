# 📦 Inventory Management System

This is a full-stack **Inventory Management System** built with **Node.js**, **Express**, **MongoDB Atlas**, and **Chart.js**, designed to help track stock levels, item status, and sales metrics. The system provides an intuitive and responsive **dashboard UI**, and is hosted on **AWS** for cloud accessibility.

---

## 🔧 Project Description

This web-based inventory management application allows users to **add**, **update**, **delete**, and **view inventory items** with real-time data visualization. The frontend uses HTML, CSS, and JavaScript with **Chart.js** for analytics, while the backend uses **Node.js** and **Express.js** to serve and manage data via RESTful APIs.

All inventory data is stored in **MongoDB Atlas**, a cloud-hosted NoSQL database. The project is deployed on an **AWS EC2 instance**, ensuring scalability and remote access.


---

## 🚀 Features

- 📋 Add new inventory items with quantity and status
- 🖊 Edit or delete existing items
- 📉 View stock analytics via **Chart.js** charts
- 📦 Identify low-stock items
- 🛠 Built-in status management (In Stock / Low Stock)
- ☁️ MongoDB Atlas for persistent cloud data storage
- 🌐 Hosted on AWS for online access

---

## 📁 Tech Stack

| Layer       | Technologies                                |
|-------------|---------------------------------------------|
| Frontend    | HTML, CSS, JavaScript, Chart.js             |
| Backend     | Node.js, Express.js                         |
| Database    | MongoDB Atlas (Cloud NoSQL Database)        |
| Hosting     | AWS EC2                                     |

---

## 🖼 UI Screens (inventory.html)

- **Dashboard Cards** for Total Items, Low Stock, Orders, and Sales
- **Chart Visualizations** for stock and sales trends
- **Dynamic Table** for inventory items
- **Form** to add new inventory entries
- **Edit/Delete** options per item row

---

## 🗃 MongoDB Schema (Example)

```js
{
  name: String,
  quantity: Number,
  status: String
}
