type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function Button({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const background =
    variant === 'primary' ? '#111' : '#e5e5e5';
  const color =
    variant === 'primary' ? '#fff' : '#111';

  return (
    <button
      {...props}
      style={{
        width: '100%',
        padding: '12px',
        borderRadius: 10,
        border: 'none',
        background,
        color,
        fontSize: 15,
        fontWeight: 600,
        cursor: 'pointer',
        opacity: props.disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
}
