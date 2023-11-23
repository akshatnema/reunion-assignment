import Navbar from "../Navbar/Navbar"

export default function Layout({children}) {
  return (
    <div className="mx-auto max-w-7xl">
        <Navbar />
        <div className="p-2 md:p-8">
          {children}
        </div>
    </div>
  )
}
