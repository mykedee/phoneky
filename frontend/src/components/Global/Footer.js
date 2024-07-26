
const Footer = () => {
  return (
    <footer className="w-full bg-main-btn-hover py-10 text-white mt-14">
      <div className="w-11/12 mx-auto">
        <div className="text-center">
          <div className="my-4">
            <h1 className="font-bold text-5xl my-2 ">
              Phoneky
            </h1>
            <div className="text-xs">
              <p className="my-1">
                Phoneky is an online e-commerce platform for gadgets.
              </p>
              <p className="my-2">
                You can shop for your affordable and quality gadgets on our site and it will be delivered to
                you anywhere in Nigeria.{" "}
              </p>{" "}
          
            </div>
          </div>
        </div>
        <p className="text-center text-xs">
          Copyright &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
