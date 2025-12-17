type StepContainerProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function StepContainer({
  title,
  description,
  children,
}: StepContainerProps) {
  return (
    <div
      style={{
        maxWidth: 420,
        margin: '24px auto',
        padding: 24,
        borderRadius: 12,
        backgroundColor: '#fff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      }}
    >
      <h2 style={{ marginBottom: 4 }}>{title}</h2>

      {description && (
        <p style={{ color: '#666', marginBottom: 24 }}>
          {description}
        </p>
      )}

      {children}
    </div>
  );
}
