import { useEffect, useState } from "react";
import API from "../../api/api";
import Responses from "./Responses";
import { useNavigate } from "react-router-dom";

const FormsList = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const navigate = useNavigate();

  const fetchForms = async () => {
    const res = await API.get("/forms");
    setForms(res.data);
  };

  const deleteForm = async (id) => {
    if (!window.confirm("Delete this form?")) return;
    await API.delete(`/forms/${id}`);
    fetchForms();
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <>
      {/* CREATE BUTTON */}
      <div className="top-actions">
        <button
          className="primary-btn"
          onClick={() => navigate("/admin/create-form")}
        >
          + Create New Form
        </button>
      </div>

      <h2>Your Forms</h2>

      <div className="forms-grid">
        {forms.map((form) => (
          <div className="form-card" key={form._id}>
            <h3>{form.title}</h3>

            <div className="card-actions">
              <button onClick={() => navigate(`/admin/edit-form/${form._id}`)}>
                Edit
              </button>
              <button onClick={() => setSelectedForm(form)}>
                Responses
              </button>
              <button
                className="danger"
                onClick={() => deleteForm(form._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedForm && (
        <Responses
          form={selectedForm}
          close={() => setSelectedForm(null)}
        />
      )}
    </>
  );
};

export default FormsList;
