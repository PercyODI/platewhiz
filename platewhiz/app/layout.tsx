import '@/styles/globals.css'

export const metadata = {
  title: "Plate Whiz",
  description: "Auto generated meal plans"
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className='h-full'>
        <div className='flex flex-col h-full'>
          <h1 className='bg-purple-900 text-white p-3'>Plate Whiz</h1>
          <div>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

export default RootLayout;