import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";
import "../../styles/userForm.css";

const UserFormFill = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      const res = await API.get(`/forms/${id}`);
      setForm(res.data);
    };
    fetchForm();
  }, [id]);

  const handleChange = (label, value) => {
    setAnswers({ ...answers, [label]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/responses", {
      formId: id,
      answers
    });

    alert("Form submitted successfully 🎉");
    navigate("/user");
  };

  if (!form) return <p className="loading">Loading form...</p>;

  return (
    <div className="form-page">
      <div className="form-card">

        <h2>{form.title}</h2>
        <p className="subtitle">
          Please fill the form below
        </p>

        <form onSubmit={handleSubmit}>
          {form.fields.map((field, i) => (
            <div className="form-group" key={i}>
              <label>{field.label}</label>

              {field.type === "text" && (
                <input
                  type="text"
                  placeholder="Enter answer"
                  onChange={(e) =>
                    handleChange(field.label, e.target.value)
                  }
                  required
                />
              )}

              {field.type === "dropdown" && (
                <select
                  onChange={(e) =>
                    handleChange(field.label, e.target.value)
                  }
                  required
                >
                  <option value="">Select option</option>
                  {field.options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "radio" && (
                <div className="option-group">
                  {field.options.map((opt, idx) => (
                    <label key={idx} className="option-item">
                      <input
                        type="radio"
                        name={field.label}
                        value={opt}
                        onChange={(e) =>
                          handleChange(field.label, e.target.value)
                        }
                        required
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}

              {field.type === "checkbox" && (
                <div className="option-group">
                  {field.options.map((opt, idx) => (
                    <label key={idx} className="option-item">
                      <input
                        type="checkbox"
                        value={opt}
                        onChange={(e) => {
                          const prev = answers[field.label] || [];
                          const updated = e.target.checked
                            ? [...prev, opt]
                            : prev.filter((x) => x !== opt);

                          handleChange(field.label, updated);
                        }}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button className="submit-btn" type="submit">
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserFormFill;
