import ClientRoot from './ClientRoot';
import './globals.css';
export const metadata = {
  title: "Ris Portofolio",
  description: "Portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/assets/favicon.ico" />
      </head>
      <body className="bg-zinc-900 text-white" id="home">
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}


