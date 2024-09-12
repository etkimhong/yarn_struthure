import connectToMongoDB from "../connection"; // Mongoose connection function
import ItemModel from "../model/product.model";
import mongoose from "mongoose";

// Sample data to insert
const products = [
  { name: "Apple MacBook Air", category: "Electronics", price: 999.99 },
  { name: "Nike Running Shoes", category: "Footwear", price: 89.99 },
];

const insertData = async () => {
  try {
    await connectToMongoDB();

    // Insert the sample products
    const insertedProducts = await ItemModel.insertMany(products);
    console.log("Data inserted successfully:", insertedProducts);
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
  }
};

insertData();
