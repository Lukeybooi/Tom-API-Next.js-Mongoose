# 🚀 Next.js TOM API Integration

This is a **Next.js 15.1.6** web application that integrates with the **TOM API** to fetch machine learning models, allow user input, and generate decisions based on the models. It also **stores user inputs and decisions** in a **MongoDB database**.

## 📌 Features

✅ Fetches models from the TOM API  
✅ Displays input fields dynamically based on the selected model  
✅ Submits user inputs to the TOM API for decision-making  
✅ Stores decisions in a MongoDB database  
✅ Uses Next.js App Router (`app/` directory)  
✅ TypeScript support for type safety

---

## 🛠 1️⃣ Clone & Setup

### **Clone the Repository**

```sh
git clone <repository_url>
cd <project_directory>
```

## 2️⃣ Install Dependencies

### **Install node modules**

```sh
npm install
# OR
yarn install
```

## 3️⃣ Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following:

```sh
NEXT_PUBLIC_TOM_API_KEY={{TOM_API_KEY}}
NEXT_PUBLIC_MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
```

Replace <username>, <password>, and <dbname> with your actual MongoDB credentials.
Replace `TOM_API_KEY` with a valid key, example can be seen on [UptotomApi](https://docs.up2tom.com/?shell#introduction)

## 4️⃣ Start the Development Server

```sh
npm run dev
# OR
yarn dev
```
