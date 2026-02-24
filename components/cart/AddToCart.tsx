"use client";

import { useState , useEffect} from "react";
import { Product } from "@/lib/api/types";
import { useCartStore } from "@/store/cartStore";
import { createPortal } from "react-dom";

interface Props {
  product: Product;
}


export default function AddToCart({ product }: Props) {
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((s) => s.addToCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAdd = () => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
      quantity
    );

    setShowModal(false);
    setQuantity(1);
  };

  return (
    <>
      
      <button
        onClick={() => setShowModal(true)}
        className="cursor-pointer mt-3 w-full bg-black text-white py-2 rounded-lg"
      >
        Add to Cart
      </button>

      {/* Modal*/}
      {mounted &&
        showModal &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            {/* Modal */}
            <div
              className="relative bg-white p-6 rounded-xl w-96 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold mb-4">
                Add to Cart
              </h2>

              <p className="text-sm mb-4">{product.title}</p>

              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  className="cursor-pointer px-3 py-1 border rounded"
                >
                  -
                </button>

                <span className="font-semibold">{quantity}</span>

                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="cursor-pointer px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>

              <div className=" flex justify-end gap-3">
                <button className="cursor-pointer" onClick={() => setShowModal(false)}>
                  Cancel
                </button>

                <button
                  onClick={handleAdd}
                  className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}