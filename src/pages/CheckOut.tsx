import { useContext } from "react";
import { SelectedProductsContext } from "../context/SelectedProductsContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useTranslation } from "react-i18next";
import type { SelectedProductEntry } from "../context/SelectedProductsContext";

const Checkout = () => {
  const context = useContext(SelectedProductsContext);
  const { t } = useTranslation();

  if (!context) {
    return <p>Error: no context found</p>;
  }

  const { selectedProducts } = context;

  const total = selectedProducts.reduce(
    (acc, entry) => acc + entry.product.price * entry.count,
    0
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">{t("checkout_title")}</h2>

      {selectedProducts.map((entry: SelectedProductEntry) => (
        <div
          key={entry.product.id}
          className="flex justify-between items-center border-b py-2"
        >
          <div className="flex items-center">
            <img
              src={entry.product.image}
              alt={entry.product.title}
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div>
              <p className="font-medium">{entry.product.title}</p>
              <p className="text-sm text-gray-600">
                {formatPrice(entry.product.price)} x {entry.count}
              </p>
            </div>
          </div>
          <p className="font-semibold">
            {formatPrice(entry.product.price * entry.count)}
          </p>
        </div>
      ))}

      <div className="text-right font-bold text-xl">
        {t("total")}: {formatPrice(total)}
      </div>

      {total > 0 && (
        <div className="mt-4">
          <PayPalButtons
            style={{ layout: "vertical", label: "pay", color: "blue", shape: "pill" }}
            createOrder={(_data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: total.toFixed(2),
                    },
                  },
                ],
              });
            }}
            onApprove={async (_data, actions) => {
              if (!actions.order) {
                alert(t("paypal_error_order"));
                return;
              }
              try {
                const details = await actions.order.capture();
                const givenName = details?.payer?.name?.given_name || t("customer_default");
                alert(t("payment_completed", { name: givenName }));
              } catch (error) {
                alert(t("paypal_capture_error"));
                console.error(error);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Checkout;