export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Home</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
