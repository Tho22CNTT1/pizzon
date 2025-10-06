import './globals.css';
import { Poppins, Playfair_Display } from 'next/font/google';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700'], variable: '--font-display' });

export const metadata = { title: 'Pizzon', description: 'Pizza ngon nóng hổi' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi" className={`${poppins.variable} ${playfair.variable}`}>
            <body>
                <Navbar />
                <main className="min-h-[60vh]">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
