'use client';

import { useEffect, useState } from 'react';
import { useRegistration } from '@/stores/registration.store';
import { registrationService } from '@/services/registration.service';
import { Registration } from '@/types/registration';

export function ReviewForm() {
  const { registrationId, resetRegistration } = useRegistration();

  const [data, setData] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    async function loadRegistration() {
      if (!registrationId) return;

      const response = await registrationService.findById(registrationId);
      setData(response);
    }

    loadRegistration();
  }, [registrationId]);

  async function handleFinish() {
    if (!registrationId) return;
  
    setLoading(true);
  
    try {
      await registrationService.finish(registrationId);
  
      resetRegistration();
      setFinished(true);
    } finally {
      setLoading(false);
    }
  }
  

  if (!data) {
    return <p>Carregando...</p>;
  }

  if (finished) {
    return (
      <div>
        <h2>✅ Cadastro concluído com sucesso!</h2>
        <p>Obrigado por realizar seu cadastro.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Revisão dos dados</h2>

      <h3>Identificação</h3>
      <p>Nome: {data.name}</p>
      <p>Email: {data.email}</p>

      <h3>Documento</h3>
      <p>{data.document}</p>

      <h3>Contato</h3>
      <p>{data.phone}</p>

      <h3>Endereço</h3>
      <p>CEP: {data.cep}</p>
      <p>Rua: {data.street}</p>
      <p>Número: {data.number}</p>
      <p>Cidade: {data.city}</p>
      <p>Estado: {data.state}</p>

      <button onClick={handleFinish} disabled={loading}>
        {loading ? 'Finalizando...' : 'Concluir cadastro'}
      </button>
    </div>
  );
}
