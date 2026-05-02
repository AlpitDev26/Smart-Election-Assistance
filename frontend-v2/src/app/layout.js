import "./globals.css";

export const metadata = {
  title: "Smart Election Assistant",
  description: "Official National Election Intelligence Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, height: '100vh', width: '100vw' }}>
        {children}
      </body>
    </html>
  );
}
