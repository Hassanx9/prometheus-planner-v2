import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body style={{ margin: 0, background: '#050506' }}>{children}</body>
    </html>
  )
}
