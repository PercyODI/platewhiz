import '@/styles/globals.css'

export const metadata = {
    title: "Plate Whiz",
    description: "Auto generated meal plans"
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <h1>Plate Whiz</h1>
                {children}
            </body>
        </html>
    )
}

export default RootLayout;