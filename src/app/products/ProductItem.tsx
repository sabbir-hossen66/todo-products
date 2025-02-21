"use client"

import { useState } from "react"
import { clientEditProduct, clientDeleteProduct } from "../clientActions"
import Image from "next/image"
import type { Product } from "../actions"
import { Heart } from "lucide-react"

interface ProductItemProps {
  product: Product
  isFavorite: boolean
  onFavoriteToggle: () => void
  onDelete: (productId: number) => void
}

export default function ProductItem({ product, isFavorite, onFavoriteToggle, onDelete }: ProductItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = async (formData: FormData) => {
    await clientEditProduct(formData)
    setIsEditing(false)
  }

  const handleDelete = async (formData: FormData) => {
    try {
      setIsDeleting(true)
      await clientDeleteProduct(formData)
      onDelete(product.id)
    } catch (error) {
      console.error("Failed to delete product:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <li className="border p-4 rounded shadow-md">
      {isEditing ? (
        <form action={handleEdit} className="space-y-2">
          <input type="hidden" name="id" value={product.id} />
          <div>
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={product.name}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              defaultValue={product.price}
              step="0.01"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block mb-2">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              defaultValue={product.image}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              defaultValue={product.category}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="status" className="block mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={product.status}
              className="w-full p-2 border rounded"
              required
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Discontinued">Discontinued</option>
            </select>
          </div>
          <div className="space-x-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-48 object-cover mb-2 rounded"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg"
              }}
            />
            <button onClick={onFavoriteToggle} className="absolute top-2 right-2 bg-white rounded-full p-1">
              <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
            </button>
          </div>
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Category: {product.category}</p>
          <p>Status: {product.status}</p>
          <div className="space-x-2 mt-2">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-2 rounded">
              Edit
            </button>
            <form action={handleDelete} className="inline">
              <input type="hidden" name="id" value={product.id} />
              <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded" disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </form>
            <button onClick={() => setShowDetails(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
              Details
            </button>
          </div>
        </div>
      )}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <p className="mb-2">
              <strong>Price:</strong> ${product.price.toFixed(2)}
            </p>
            <p className="mb-2">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {product.status}
            </p>
            <button onClick={() => setShowDetails(false)} className="bg-gray-500 text-white px-4 py-2 rounded mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </li>
  )
}

