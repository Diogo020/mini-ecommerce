import { useEffect, useState } from "react";
import { createUser, deleteUser, getUsers, updateUser } from "./userService";

const initialForm = {
  name: "",
  email: "",
  password: "",
  active: true
};

export function UserManager() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
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
      if (editingId) {
        await updateUser(editingId, form);
        setMessage("Usuário atualizado com sucesso!");
      } else {
        await createUser(form);
        setMessage("Usuário cadastrado com sucesso!");
      }

      setForm(initialForm);
      setEditingId(null);
      loadUsers();
    } catch (error) {
      setMessage(error.response?.data?.error?.message || "Erro ao salvar usuário.");
    }
  }

  function handleEdit(user) {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      password: user.password,
      active: user.active
    });
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Deseja realmente excluir este usuário?");

    if (!confirmDelete) {
      return;
    }

    await deleteUser(id);
    setMessage("Usuário excluído com sucesso!");
    loadUsers();
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    setMessage("");
  }

  return (
    <section className="card">
      <h2>Usuários</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          name="name"
          placeholder="Nome do usuário"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="text"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
        />

        <label className="checkbox">
          <input
            name="active"
            type="checkbox"
            checked={form.active}
            onChange={handleChange}
          />
          Usuário ativo
        </label>

        <div className="actions">
          <button type="submit">
            {editingId ? "Atualizar usuário" : "Cadastrar usuário"}
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
        {users.map((user) => (
          <div className="item" key={user.id}>
            <div>
              <strong>{user.name}</strong>
              <p>{user.email}</p>
              <small>{user.active ? "Ativo" : "Inativo"}</small>
            </div>

            <div className="item-actions">
              <button onClick={() => handleEdit(user)}>Editar</button>
              <button className="danger" onClick={() => handleDelete(user.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}