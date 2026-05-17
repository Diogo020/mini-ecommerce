import { useState } from "react";
import { ProductManager } from "./modules/products/ProductManager";
import { UserManager } from "./modules/users/UserManager";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <main className="container">
      <header className="header">
        <h1>Mini E-commerce</h1>
        <p>Gerenciamento de produtos e usuários</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === "products" ? "active" : ""}
          onClick={() => setActiveTab("products")}
        >
          Produtos
        </button>

        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Usuários
        </button>
      </nav>

      {activeTab === "products" && <ProductManager />}
      {activeTab === "users" && <UserManager />}
    </main>
  );
}

export default App;