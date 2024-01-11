import { useDispatch, useSelector } from "react-redux";
import { Product, RootState } from "../lib/definition";
import { fetchProductFromCart } from "../api/product";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { cartActions } from "../reducer/cartReducer";
import LoadingSpinner from "../components/LoadingSpinner";

function CartPage() {
  const items = useSelector((state: RootState) => state.cart.items);

  const [data, setData] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const newData = await fetchProductFromCart(items);

      setData(newData);
    })();

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const deleteFromData = (index: number) => {
    setData((prev) => prev!.filter((_, i) => i !== index));
  };

  if (isLoading || !data) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (data && data.length === 0) {
    return (
      <div className="pt-12 text-center text-2xl">Shopping cart is empty</div>
    );
  }

  if (data) {
    const subtotal = data.reduce(
      (acc, cur, index) => acc + cur.price * items[index].quantity,
      0,
    );
    const shipping = 0;

    return (
      <div className="grid grid-cols-12 gap-4 divide-y-2 divide-border pb-8 md:gap-0 md:divide-x-2 md:divide-y-0 dark:divide-dark-border">
        <div className="col-span-12 pt-2 md:col-span-8 lg:col-span-9">
          <h1 className="mb-4 pl-6 text-2xl">Shopping cart</h1>

          <div className="px-4">
            {data.map((product, index) => (
              <CartProductItem
                key={product.id + product.title}
                product={product}
                quantity={items[index].quantity}
                index={index}
                deleteFromData={deleteFromData}
              />
            ))}
          </div>
        </div>

        <div className="col-span-12 px-2 pt-6 text-lg md:col-span-4 md:px-1 md:pt-2 md:text-base lg:col-span-3">
          <h2 className="mb-4 pl-2 text-xl sm:pl-4">Cart Totals</h2>

          <div className="flex justify-between border-y-2 border-border px-4 py-4 dark:border-dark-border">
            <p>Subtotal</p>
            <p>{subtotal.toFixed(2)}$</p>
          </div>

          <div className="flex justify-between border-b-2 border-border px-4 py-4 dark:border-dark-border">
            <p>Shipping</p>
            <p>{shipping}$</p>
          </div>

          <div className="mb-8 flex justify-between border-b-2 border-border px-4 py-4 dark:border-dark-border">
            <p>Total</p>
            <p>{(subtotal + shipping).toFixed(2)}$</p>
          </div>

          <button
            className="block w-full bg-border py-3 dark:bg-dark-border"
            disabled
            title="disabled"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    );
  }
}

const CartProductItem = ({
  product,
  quantity,
  index,
  deleteFromData,
}: {
  product: Product;
  quantity: number;
  index: number;
  deleteFromData: (i: number) => void;
}) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(quantity.toString());

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(-1)[0];

    if (newValue === "0") return;

    dispatch(cartActions.changeQuantity([index, Number(newValue)]));
    setInputValue(newValue);
  };

  const handleInputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") e.preventDefault();
  };

  const handleDelete = () => {
    deleteFromData(index);
    dispatch(cartActions.deleteItem(index));
  };

  return (
    <div className="relative flex items-center gap-8 border-t-2 border-border py-4 dark:border-dark-border">
      <img
        className="h-[80px] w-full max-w-[80px] bg-white object-contain p-2 sm:h-[100px] sm:max-w-[100px]"
        src={product.image}
        alt=""
      />

      <div className="flex w-full flex-col gap-4 text-sm md:w-full md:gap-4">
        <div className="flex w-full items-start justify-between gap-2 pr-2">
          <p
            className="line-clamp-1 text-base sm:text-lg"
            title={product.title}
          >
            {product.title}
          </p>
          <button onClick={handleDelete} className="block">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div>Price: {product.price}$</div>

        <div className="flex items-center gap-2">
          <p>Quantity: </p>
          <input
            type="number"
            className="w-10 border-border text-center outline-none dark:border-dark-border dark:text-copy"
            value={inputValue}
            onChange={handleInputOnChange}
            onKeyDown={handleInputOnKeyDown}
          />
        </div>

        <div>Total: ${product.price * Number(inputValue)}</div>
      </div>
    </div>
  );
};

export default CartPage;
