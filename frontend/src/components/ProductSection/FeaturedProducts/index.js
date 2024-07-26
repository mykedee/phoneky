import { Swiper, SwiperSlide } from "swiper/react";
import { useGetFeaturedQuery } from "../../../slices/featuredApiSlice";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";

const Index = () => {
  const { data, isLoading, error } = useGetFeaturedQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <>{error.message}</>
      ) : (
        <Swiper
          navigation={true}
          pagination={true}
          modules={[Navigation, Pagination]}
          className="featured-card mySwiper  my-0 lg:my-1 min-h-full h-full lg:h-auto bg-white rounded-lg"
        >
          {data?.featured?.map((feature) => (          
              <SwiperSlide>
                {feature.title !== "" ? (
                  <div className="text-white absolute w-full lg:w-9/12 mx-auto p-2 lg:p-5  right-0 left-0 text-center top-[250px] bg-main-btn-hover text-base lg:text-lg z-40 lg:rounded">
                    <Link to={feature.url}>{feature.title}</Link>
                  </div>
                ) : (
                  ""
                )}

                <Link to={feature.url}>
                  <img
                    src={feature.photo}
                    className="featured-card md:w-full" alt="featured product"
                  />
                </Link>
              </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Index;
