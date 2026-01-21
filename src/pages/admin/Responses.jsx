import { useEffect, useState } from "react";
import API from "../../api/api";

const Responses = ({ form, close }) => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    API.get(`/responses/${form._id}`).then((res) =>
      setResponses(res.data)
    );
  }, [form._id]);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{form.title} – Responses</h2>

        {responses.length === 0 && <p>No responses yet.</p>}

        {responses.map((res, i) => (
          <div className="response-card" key={i}>
            {Object.entries(res.answers).map(([key, val]) => (
              <p key={key}>
                <strong>{key}:</strong>{" "}
                {Array.isArray(val) ? val.join(", ") : val}
              </p>
            ))}
          </div>
        ))}

        <button className="close-btn" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Responses;
