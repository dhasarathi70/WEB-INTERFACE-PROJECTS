function FormSection({ title, description, children }) {
  return (
    <section className="form-section">
      <div className="form-section-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

export default FormSection;