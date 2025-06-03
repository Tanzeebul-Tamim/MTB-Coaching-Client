import { useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./styles/CheckOutForm.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useTitle from "../../Helmet/useTitle";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./styles/style.css";
import { AuthContext } from "../../providers/AuthProvider";
import { getUserData } from "../../api/authApi";
import { toast } from "react-toastify";

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_GATEWAY_PK}`);

const PaymentConfirmation = () => {
  const [classItem, setClassItem] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const studentName = classItem?.studentName;
  const [focus, setFocus] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const {studentId, itemId} = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [cardDetails, setCardDetails] = useState({
    cvc: "",
    expiry: "",
    name: studentName,
    number: "",
  });
  const { user, loading } = useContext(AuthContext);
  const [loading2, setLoading2] = useState(false);
  useTitle("| Payment");

  useEffect(() => {
    if (user?.email) {
      getUserData(user.email)
        .then((data) => setUserDetails(data));
    }
  } ,[user])

  useEffect(() => {
  if (userDetails?._id && studentId && itemId) {
    setLoading2(true);
    fetch(`${import.meta.env.VITE_API_URL}/book-class/${userDetails._id}/${studentId}/${itemId}`)
      .then(async (res) => {
        if (res.status === 403) {
          toast.warning("You are not authorized to access this page!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          const fallbackLocation = localStorage.getItem("lastLocation") || "/dashboard/profile";
          setLoading2(false);
          navigate(fallbackLocation, { state: { from: location } });
          return; // Stop further execution
        }
        const data = await res.json();
        setClassItem(data);
        setLoading2(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [userDetails, studentId, itemId]);

  const handleNumberChange = (event) => {
    let { value } = event.target;
    const { maxLength } = event.target;

    if (value.length > maxLength) {
      value = value.slice(0, maxLength); // Truncate the value to maxLength characters
    }
    
    setCardDetails((prevState) => ({
      ...prevState,
      number: value,
    }));
    setFocus(event.target.name);
  };

  const handleExpiryChange = (event) => {
    let { value } = event.target;
    const { maxLength } = event.target;

    if (value.length > maxLength) {
      value = value.slice(0, maxLength); // Truncate the value to maxLength characters
    }
    
    setCardDetails((prevState) => ({
      ...prevState,
      expiry: value,
    }));
    setFocus(event.target.name);
  };

  const handleCvcChange = (event) => {
    let { value } = event.target;
    const { maxLength } = event.target;

    if (value.length > maxLength) {
      value = value.slice(0, maxLength); // Truncate the value to maxLength characters
    }
    
    setCardDetails((prevState) => ({
      ...prevState,
      cvc: value,
    }));
    setFocus(event.target.name);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col bg-base-100 w-[410px] py-5 px-6 rounded-2xl bg-opacity-50 description">
        <h1 className="z-[100] text-white text-2xl mb-3 tracking-[9px] text-center uppercase font-extrabold">
          Confirm Payment
        </h1>
        <div className="z-[100] text-xl">
          <div>
            <div>
              <div className={`pay-card-container ${flipped ? "flipped" : ""}`}>
                <div className="pay-card">
                  <div className="front">
                    <div className="z-50 flex justify-center items-center">
                      <img
                        src={loading || loading2 ? "/class-loading.gif" : classItem?.classImage}
                        className={`w-[340px] h-[200px] rounded-2xl ${loading || loading2 && 'object-cover'}`}
                      />
                    </div>
                  </div>
                  <div className="back">
                    <Cards
                      cvc={cardDetails.cvc}
                      expiry={cardDetails.expiry}
                      focused={focus}
                      name={cardDetails.name}
                      number={cardDetails.number}
                      previewIssuer={flipped}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7">
              <div className="z-50 flex items-center">
                <strong className="">Course :</strong>{" "}
                <div className=" ml-1">{classItem?.["class-name"]}</div>
              </div>
              <div className="z-50 flex items-center">
                <strong className="">Instructor :</strong>{" "}
                <div className=" ml-1">{classItem?.instructorName}</div>
              </div>
              <div className="z-50 flex items-center">
                <strong className="">Price :</strong>{" "}
                <div className=" ml-1">{`$ ${classItem?.classFee}`}</div>
              </div>
            </div>
          </div>

          <div className="z-50 mt-3">
            <input
              maxLength={16}
              onInput={handleNumberChange}
              onFocus={() => setFlipped(true)}
              onBlur={() => setFlipped(false)}
              name="number"
              type="number"
              className="rounded-md w-full input input-bordered bg-[#4b4646] h-10 focus:outline-none mb-3 placeholder:text-[#aab7c4] text-[#aab7c4]"
              placeholder="Card number"
            />
            <div className="flex mb-3 gap-1">
              <input
                maxLength={4}
                onInput={handleExpiryChange}
                onFocus={() => setFlipped(true)}
                onBlur={() => setFlipped(false)}
                name="expiry"
                type="number"
                className="rounded-md w-full input input-bordered bg-[#4b4646] h-10 focus:outline-none placeholder:text-[#aab7c4] text-[#aab7c4]"
                placeholder="Expiry date"
              />
              <input
                maxLength={3}
                onInput={handleCvcChange}
                onFocus={() => setFlipped(true)}
                onBlur={() => setFlipped(false)}
                name="cvc"
                type="number"
                className="rounded-md w-full input input-bordered bg-[#4b4646] h-10 focus:outline-none placeholder:text-[#aab7c4] text-[#aab7c4]"
                placeholder="CVC"
              />
            </div>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                setFocus={setFocus}
                cardDetails={cardDetails}
                setFlipped={setFlipped}
                classItem={classItem}
              ></CheckoutForm>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
