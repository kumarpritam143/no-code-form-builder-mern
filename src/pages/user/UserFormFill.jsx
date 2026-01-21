import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";
import "../../styles/user.css";

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

  if (!form) return <p>Loading...</p>;

  return (
    <div className="fill-wrapper">
      <form className="fill-card" onSubmit={handleSubmit}>
        <h2>{form.title}</h2>
        <p className="subtitle">Please fill the form below</p>

        {form.fields.map((field, index) => (
          <div className="fill-field" key={index}>
            <label>{field.label}</label>

            {field.type === "text" && (
              <input
                required={field.required}
                onChange={(e) =>
                  handleChange(field.label, e.target.value)
                }
              />
            )}

            {field.type === "radio" &&
              field.options.map((opt, i) => (
                <div key={i} className="option-row">
                  <input
                    type="radio"
                    name={field.label}
                    value={opt}
                    onChange={() =>
                      handleChange(field.label, opt)
                    }
                  />
                  <span>{opt}</span>
                </div>
              ))}

            {field.type === "checkbox" &&
              field.options.map((opt, i) => (
                <div key={i} className="option-row">
                  <input
                    type="checkbox"
                    value={opt}
                    onChange={(e) => {
                      const prev = answers[field.label] || [];
                      if (e.target.checked) {
                        handleChange(field.label, [...prev, opt]);
                      } else {
                        handleChange(
                          field.label,
                          prev.filter((o) => o !== opt)
                        );
                      }
                    }}
                  />
                  <span>{opt}</span>
                </div>
              ))}

            {field.type === "dropdown" && (
              <select
                onChange={(e) =>
                  handleChange(field.label, e.target.value)
                }
              >
                <option value="">Select</option>
                {field.options.map((opt, i) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
            )}
          </div>
        ))}

        <button className="submit-btn" type="submit">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default UserFormFill;
