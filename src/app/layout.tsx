import { RegistrationProvider } from '@/src/stores/registration.store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <RegistrationProvider>{children}</RegistrationProvider>
      </body>
    </html>
  );
}
