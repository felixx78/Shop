import { Link } from "react-router-dom";

import tshirt from "../assets/t-shirt-image.jpg";
import manga from "../assets/manga-image.jpg";
import toy from "../assets/toy-image.webp";

function ProductsPage() {
  const products = [
    {
      name: "T-shirts",
      link: "t-shirts",
      image: tshirt,
    },
    {
      name: "Manga",
      link: "manga",
      image: manga,
    },
    {
      name: "Toys",
      link: "toys",
      image: toy,
    },
  ];

  return (
    <div className="container pt-2">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-1 items-start justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <Link
            to={product.link}
            key={product.name}
            className="block h-[300px] w-full bg-foreground lg:h-[400px] dark:bg-dark-foreground"
          >
            <img
              src={product.image}
              className="h-[260px] w-full object-cover lg:h-[360px]"
              alt=""
            />
            <h2 className="py-2 text-center text-lg">{product.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default ProductsPage;
