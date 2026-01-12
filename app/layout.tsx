import './globals.css'

export const metadata = {
  title: 'Prometheus PoE2 Planner',
  description: 'Strategic Build Planner for Path of Exile 2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
