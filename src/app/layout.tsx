import './globals.css'
import type { Metadata } from 'next'
import { Inter, Bungee, Barlow } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] });
const barlow = Barlow({ weight:['100' , '200' , '300' , '400' , '500' , '600' , '700' , '800' , '900'], subsets: ['latin','vietnamese'] });
const bungee = Bungee({ weight:'400', subsets: ['latin','vietnamese'] })

export const metadata: Metadata = {
  title: 'Vietnam Hat 2023',
  description: 'Event by Vietnam Ultimate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={barlow.className}>{children}</body>
    </html>
  )
}
