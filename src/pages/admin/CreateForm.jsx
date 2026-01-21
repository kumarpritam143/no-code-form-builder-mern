import { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.css";

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  const addField = () => {
    setFields([
      ...fields,
      { label: "", type: "text", options: "" }
    ]);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const saveForm = async () => {
    if (!title) return alert("Form title is required");

    const formattedFields = fields.map((f) => ({
      label: f.label,
      type: f.type,
      options:
        f.type === "radio" || f.type === "checkbox" || f.type === "dropdown"
          ? f.options.split(",")
          : []
    }));

    await API.post("/forms", {
      title,
      fields: formattedFields
    });

    navigate("/admin");
  };

  return (
    <div className="builder-wrapper">
      <div className="builder-card">
        <h2>Create New Form</h2>
        <p className="builder-subtitle">
          Add fields and design your form dynamically
        </p>

        {/* FORM TITLE */}
        <input
          className="builder-title-input"
          placeholder="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* FIELDS */}
        {fields.map((field, index) => (
          <div className="field-card" key={index}>
            <div className="field-row">
              <input
                placeholder="Field Label"
                value={field.label}
                onChange={(e) =>
                  updateField(index, "label", e.target.value)
                }
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
                placeholder="Options (comma separated)"
                value={field.options}
                onChange={(e) =>
                  updateField(index, "options", e.target.value)
                }
              />
            )}
          </div>
        ))}

        {/* ACTIONS */}
        <div className="builder-actions">
          <button className="secondary-btn" onClick={addField}>
            + Add Field
          </button>

          <button className="primary-btn" onClick={saveForm}>
            Save Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
