import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'مطعم قصر جوليا | Qasr Julia',
  description: 'مطعم قصر جوليا - تجربة طعام فاخرة وحجز طاولات واستقبال الشكاوى والاقتراحات',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex flex-col min-h-screen bg-brand-cream text-gray-800 antialiased">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
