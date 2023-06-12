import LeafletMap from "./LeafletMap/LeafletMap";

const Footer = () => {
  return (
    <div
      className="relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.700), rgba(0, 0, 0, 0.500)), url('https://img.redbull.com/images/c_crop,x_0,y_870,h_6750,w_15000/c_fill,w_1680,h_780/q_auto,f_auto/redbullcom/2022/7/21/khux2edp5aura3i0uy7g/red-bull-rampage')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <footer className="footer p-10 bg-transparent text-base-content">
        <div>
          <span className="uppercase text-lg lg:text-xl text-yellow-500 lg:text-yellow-500">
            Our Location
          </span>
          <LeafletMap></LeafletMap>
        </div>
        <div>
          <span className="uppercase text-lg lg:text-xl text-yellow-500 lg:text-yellow-500">
            Opening Hours
          </span>
          <span className="text-sm lg:text-lg">
            Monday - Friday: 8:00 AM - 10:00 PM
          </span>
          <span className="text-sm lg:text-lg">
            Saturday: 10:00 AM - 11:00 PM
          </span>
          <span className="text-sm lg:text-lg">Sunday: 12:00 PM - 9:00 PM</span>
        </div>
        <div>
          <span className="uppercase text-lg lg:text-xl text-yellow-500 lg:text-yellow-500">
            Services
          </span>
          <a className="text-sm lg:text-lg link link-hover">Branding</a>
          <a className="text-sm lg:text-lg link link-hover">Design</a>
          <a className="text-sm lg:text-lg link link-hover">Marketing</a>
          <a className="text-sm lg:text-lg link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="uppercase text-lg lg:text-xl text-yellow-500 lg:text-yellow-500">
            Contact Us
          </span>
          <span className="text-sm lg:text-lg">
            Duifkruid 84, 4007 SZ Tiel
            <br />
            Netherlands
          </span>
          <span className="text-sm lg:text-lg"> Phone: +31644460635</span>
          <span className="text-sm lg:text-lg">
            Email:{" "}
            <a className="underline" id="email" href="">
              info@pmbia.com
            </a>
          </span>
        </div>
        <div>
          <span className="uppercase text-lg lg:text-xl text-yellow-500 lg:text-yellow-500">
            Legal
          </span>
          <a className="text-sm lg:text-lg link link-hover">Terms of use</a>
          <a className="text-sm lg:text-lg link link-hover">Privacy policy</a>
          <a className="text-sm lg:text-lg link link-hover">Cookie policy</a>
        </div>
      </footer>
      <footer className="footer border-t border-slate-500 px-10 py-6 bg-transparent text-base-content">
        <div className="items-center grid-flow-col">
          <img
            style={{ height: "60px" }}
            src="https://www.pmbia.org/img/icons/PMBIA-Icon-Rev-192x192.png"
            alt=""
          />
          <p className="text-sm lg:text-lg">
            PMBIA Ltd. <br /> Delivering exceptional services since 2005.
          </p>
        </div>
        <div>
          <h4 className="text-center text-xs lg:text-md tracking-widest">
            © 2023 PMBIA. All rights reserved. Designed by
            <a
              href="https://www.facebook.com/tanzeebul.tamim"
              className="uppercase ms-1 font-bold text-yellow-500 underline"
            >
              Tanzeebul Tamim
            </a>
          </h4>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-current h-6 w-6"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-current h-6 w-6"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-current h-6 w-6"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
