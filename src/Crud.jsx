import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem, updateItem, deleteItem } from "./crudSlice";

export default function Crud() {
  const items = useSelector((state) => state.crud.items);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      dispatch(
        updateItem({
          id: editingId,
          title: title.trim(),
          description: description.trim(),
        })
      );
      setEditingId(null);
    } else {
      dispatch(
        createItem({
          id: Date.now().toString(),
          title: title.trim(),
          description: description.trim(),
        })
      );
    }

    setTitle("");
    setDescription("");
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
    if (editingId === id) {
      handleCancel();
    }
  };

  return (
    <div className="crud-container">
      <h2>CRUD</h2>
      <form onSubmit={handleSubmit} className="crud-form">
        <h3>{editingId ? "Editar" : "Agregar Nuevo"}</h3>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            id="title"
            type="text"
            placeholder="Ej"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripcion:</label>
          <input
            id="description"
            type="text"
            placeholder="Ej"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingId ? "Guardar Cambios" : "Agregar Elemento"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="items-section">
        <h3>Lista de Elementos ({items.length})</h3>
        {items.length === 0 ? (
          <p className="empty-message">No hay elementos registrados.</p>
        ) : (
          <ul className="items-list">
            {items.map((item) => (
              <li key={item.id} className="item-card">
                <div className="item-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
                <div className="item-actions">
                  <button
                    type="button"
                    className="btn btn-edit"
                    onClick={() => handleEdit(item)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
