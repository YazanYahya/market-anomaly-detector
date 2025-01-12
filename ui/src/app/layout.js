import './globals.css'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}) {
    return (
        <html lang="en" className="dark">
        <body className={`${inter.className} bg-gray-900`}>{children}</body>
        </html>
    )
}