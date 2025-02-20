"use client"

import { useState, useTransition } from "react"
import { clientEditProduct, clientDeleteProduct } from "../clientActions"

export default function ProductItem({ product }: { product: { id: number; name: string; price: number } }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleEdit = async (formData: FormData) => {
    startTransition(async () => {
      await clientEditProduct(formData)
      setIsEditing(false)
    })
  }

  const handleDelete = async (formData: FormData) => {
    startTransition(async () => {
      await clientDeleteProduct(formData)
    })
  }

  return (
    <li className="border p-4 rounded">
      {isEditing ? (
        <form action={handleEdit} className="space-y-2">
          <input type="hidden" name="id" value={product.id} />
          <input type="text" name="name" defaultValue={product.name} className="w-full p-2 border rounded" required />
          <input
            type="number"
            name="price"
            defaultValue={product.price}
            step="0.01"
            className="w-full p-2 border rounded"
            required
          />
          <div className="space-x-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
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
        <>
          <p>
            {product.name} - ${product.price}
          </p>
          <div className="space-x-2 mt-2">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-2 rounded">
              Edit
            </button>
            <form action={handleDelete} className="inline">
              <input type="hidden" name="id" value={product.id} />
              <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded" disabled={isPending}>
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </form>
          </div>
        </>
      )}
    </li>
  )
}

