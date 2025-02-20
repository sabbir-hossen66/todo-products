"use client"

import { editProduct, deleteProduct } from "./actions"

export function clientEditProduct(formData: FormData) {
  return editProduct(formData)
}

export function clientDeleteProduct(formData: FormData) {
  return deleteProduct(formData)
}

