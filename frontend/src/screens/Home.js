import ProductCards from "../components/Global/ProductCards";
import MetaData from "../components/MetaData";
import ScrollToTop from "../components/Global/ScrollToTop";
import Index from "../components/ProductSection/FeaturedProducts/index";


const Home = () => {
  return (
    <section className="w-11/12 mx-auto">
      <MetaData />
        <div className="w-full mt-20 lg:mt-0">
          <Index/>
      </div>
      <ProductCards />
      <ScrollToTop />
    </section>
  );
};

export default Home;
