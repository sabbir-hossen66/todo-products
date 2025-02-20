import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Management</h1>
      <nav className="space-x-4">
        <Link href="/addProduct" className="text-blue-500 hover:underline">
          Add Product
        </Link>
        <Link href="/products" className="text-blue-500 hover:underline">
          View Products
        </Link>
      </nav>
    </div>
  )
}

