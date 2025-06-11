import { useContext } from "react";
import { SelectedProductsContext } from "../context/SelectedProductsContext";
import type { SelectedProductEntry } from "../context/SelectedProductsContext";

const SelectedProductList = () => {
  const context = useContext(SelectedProductsContext);

  if (!context) {
    throw new Error("SelectedProductList debe estar dentro del SelectedProductsProvider");
  }

  const { selectedProducts, removeSelectedProduct, clearProductSelections } = context;

  const total = selectedProducts.reduce(
    (acc, entry) => acc + entry.product.price * entry.count,
    0
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  return (
    <div
      className={`fixed right-0 top-0 h-full bg-gray-50 border-l shadow-lg transition-all duration-300 ${
        selectedProducts.length > 0 ? "w-80 opacity-100" : "w-0 opacity-0"
      } flex flex-col`}
    >
      {selectedProducts.length > 0 && (
        <>
          {/* Header */}
          <div className="p-4 border-b bg-white sticky top-0 z-10">
            <h3 className="text-lg font-bold">Carrito</h3>
            <p className="text-sm text-gray-500">
              Productos: {selectedProducts.reduce((acc, entry) => acc + entry.count, 0)}
            </p>
          </div>

          {/* Lista con scroll vertical */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {selectedProducts.map((entry: SelectedProductEntry) => (
              <div
                key={entry.product.id}
                className="flex items-start gap-2 border-b pb-2"
              >
                <img
                  src={entry.product.image}
                  alt={entry.product.title}
                  className="w-16 h-16 object-contain rounded bg-white p-1"
                />
                <div className="flex-1 text-sm">
                  <h4 className="font-semibold text-gray-800">{entry.product.title}</h4>
                  <p className="text-gray-600">{formatPrice(entry.product.price)} x {entry.count}</p>
                  <p className="text-gray-900 font-bold">
                    {formatPrice(entry.product.price * entry.count)}
                  </p>
                </div>
                <button
                  onClick={() => removeSelectedProduct(entry.product.id)}
                  className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          {/* Footer fijo con botones */}
          <div className="p-4 border-t bg-white sticky bottom-0 z-10">
            <div className="font-bold text-gray-900 text-right mb-2 text-lg">
              Total: {formatPrice(total)}
            </div>
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors mb-2">
              Tocar para pagar
            </button>
            <button
              onClick={() => clearProductSelections(0)} // Elimina todos los productos
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
            >
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedProductList;