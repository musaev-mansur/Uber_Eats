import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ReduxProvider } from '../components/providers/redux-provider'
import { AuthProvider } from '../components/providers/auth-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'FoodDelivery - Доставка еды',
  description: 'Быстрая доставка еды из лучших ресторанов города',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ReduxProvider>
          <AuthProvider>
            {children}
            <Analytics />
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
