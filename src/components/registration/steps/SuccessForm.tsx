'use client';

import { useRegistration } from '@/stores/registration.store';
import { Button } from '@/components/ui/Button';

export function SuccessForm() {
  const { resetRegistration } = useRegistration();

  function handleRestart() {
    resetRegistration();
  }

  return (
    <div style={styles.container}>
      <div style={styles.icon}>✓</div>

      <h2 style={styles.title}>
        Cadastro concluído!
      </h2>

      <p style={styles.text}>
        Seus dados foram enviados com sucesso.
      </p>

      <div style={{ marginTop: 24, width: '100%' }}>
        <Button variant="success" onClick={handleRestart}>
          Novo cadastro
        </Button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  icon: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    backgroundColor: '#22c55e',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: '#18181b',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#71717a',
  },
};
