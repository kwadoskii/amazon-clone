import Product from "./Product";

export default function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-48 lg:-mt-52 mx-auto">
      {products
        .slice(0, 4)
        .map(({ id, title, price, description, category, image, rating: { rate } }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            rating={rate}
          />
        ))}

      <div className="md:col-span-full px-4">
        <img className="" src="https://links.papareact.com/dyz" alt="" />
      </div>

      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, price, description, category, image, rating: { rate } }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
              rating={rate}
            />
          ))}
      </div>

      {products
        .slice(5)
        .map(({ id, title, price, description, category, image, rating: { rate } }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            rating={rate}
          />
        ))}
    </div>
  );
}
