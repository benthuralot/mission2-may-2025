import React from "react";
import "./InputCard.css"; // ✅ Make sure this import is included

export default function InputCar({ title, inputs, onSubmit, result, error }) {
  return (
    <div className="input-card">
      <h3 className="input-card-title">{title}</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {inputs.map((input, index) => (
          <div key={index} className="input-group">
            <label className="input-label">{input.label}</label>
            {input.type === "textarea" ? (
              <textarea
                value={input.value}
                onChange={input.onChange}
                className="input-textarea"
                rows={4}
              />
            ) : (
              <input
                type={input.type}
                value={input.value}
                onChange={input.onChange}
                className="input-field"
              />
            )}
          </div>
        ))}

        <button type="submit" className="input-submit">
          Submit
        </button>
      </form>

      <div className="input-result">
        {error && <div className="input-error">Error: {error}</div>}
        {result && <div className="input-success">{result}</div>}
      </div>
    </div>
  );
}
