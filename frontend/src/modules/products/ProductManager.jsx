import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct
} from "./productService";

const initialForm = {
  name: "",
  description: "",
  price: "",
  stockQuantity: "",
  category: "",
  active: true
};

export function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const productData = {
        ...form,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity)
      };

      if (editingId) {
        await updateProduct(editingId, productData);
        setMessage("Produto atualizado com sucesso!");
      } else {
        await createProduct(productData);
        setMessage("Produto cadastrado com sucesso!");
      }

      setForm(initialForm);
      setEditingId(null);
      loadProducts();
    } catch (error) {
      setMessage(error.response?.data?.error?.message || "Erro ao salvar produto.");
    }
  }

  function handleEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      category: product.category,
      active: product.active
    });
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Deseja realmente excluir este produto?");

    if (!confirmDelete) {
      return;
    }

    await deleteProduct(id);
    setMessage("Produto excluído com sucesso!");
    loadProducts();
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    setMessage("");
  }

  return (
    <section className="card">
      <h2>Produtos</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          name="name"
          placeholder="Nome do produto"
          value={form.name}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Preço"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="stockQuantity"
          type="number"
          placeholder="Quantidade em estoque"
          value={form.stockQuantity}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Categoria"
          value={form.category}
          onChange={handleChange}
        />

        <label className="checkbox">
          <input
            name="active"
            type="checkbox"
            checked={form.active}
            onChange={handleChange}
          />
          Produto ativo
        </label>

        <div className="actions">
          <button type="submit">
            {editingId ? "Atualizar produto" : "Cadastrar produto"}
          </button>

          {editingId && (
            <button type="button" className="secondary" onClick={handleCancelEdit}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {message && <p className="message">{message}</p>}

      <div className="list">
        {products.map((product) => (
          <div className="item" key={product.id}>
            <div>
              <strong>{product.name}</strong>
              <p>{product.description}</p>
              <small>
                R$ {product.price} | Estoque: {product.stockQuantity} | Categoria:{" "}
                {product.category} | {product.active ? "Ativo" : "Inativo"}
              </small>
            </div>

            <div className="item-actions">
              <button onClick={() => handleEdit(product)}>Editar</button>
              <button className="danger" onClick={() => handleDelete(product.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}