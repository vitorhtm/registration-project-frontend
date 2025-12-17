type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: 'block',
          marginBottom: 6,
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {label}
      </label>

      <input
        {...props}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 8,
          border: '1px solid #ccc',
          fontSize: 14,
        }}
      />
    </div>
  );
}
