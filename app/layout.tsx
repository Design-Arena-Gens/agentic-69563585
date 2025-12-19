import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Agents Platform - Yapay Zeka Ajanları Geliştirme',
  description: 'AI ajanlarınızı oluşturun, test edin ve dağıtın',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  )
}
