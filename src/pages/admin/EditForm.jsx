import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";
import "../../styles/admin.css";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);

  // FETCH EXISTING FORM
  useEffect(() => {
    const fetchForm = async () => {
      const res = await API.get(`/forms/${id}`);
      setTitle(res.data.title);
      setFields(
        res.data.fields.map((f) => ({
          ...f,
          options: f.options?.join(",") || ""
        }))
      );
    };

    fetchForm();
  }, [id]);

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const addField = () => {
    setFields([...fields, { label: "", type: "text", options: "" }]);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateForm = async () => {
    const formattedFields = fields.map((f) => ({
      label: f.label,
      type: f.type,
      options:
        f.type === "radio" || f.type === "checkbox" || f.type === "dropdown"
          ? f.options.split(",")
          : []
    }));

    await API.put(`/forms/${id}`, {
      title,
      fields: formattedFields
    });

    navigate("/admin");
  };

  return (
    <div className="builder-wrapper">
      <div className="builder-card">
        <h2>Edit Form</h2>
        <p className="builder-subtitle">
          Update form fields and structure
        </p>

        {/* FORM TITLE */}
        <input
          className="builder-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Form Title"
        />

        {/* FIELDS */}
        {fields.map((field, index) => (
          <div className="field-card" key={index}>
            <div className="field-row">
              <input
                value={field.label}
                onChange={(e) =>
                  updateField(index, "label", e.target.value)
                }
                placeholder="Field Label"
              />

              <select
                value={field.type}
                onChange={(e) =>
                  updateField(index, "type", e.target.value)
                }
              >
                <option value="text">Text</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="dropdown">Dropdown</option>
              </select>

              <button
                className="remove-btn"
                onClick={() => removeField(index)}
              >
                ✕
              </button>
            </div>

            {field.type !== "text" && (
              <input
                className="options-input"
                value={field.options}
                onChange={(e) =>
                  updateField(index, "options", e.target.value)
                }
                placeholder="Options (comma separated)"
              />
            )}
          </div>
        ))}

        {/* ACTIONS */}
        <div className="builder-actions">
          <button className="secondary-btn" onClick={addField}>
            + Add Field
          </button>

          <button className="primary-btn" onClick={updateForm}>
            Update Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
