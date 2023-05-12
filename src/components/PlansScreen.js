import React, { useEffect, useState } from "react";
import db from "../Firebase";
import "../components/PlansScreen";
import "../css/PlansScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/counter/userSlice";
import { loadStripe } from "@stripe/stripe-js";

const PlansScreen = () => {
  const user = useSelector(selectUser);
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  //   console.log(products);
  console.log(subscription);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51N4EXwFvhukrx6EvpItHAKDpY5Umcw9a4mnvmM9eOvxs157qH4zAmGfTvLrFcOCjzfvbBEgSUHi4c1dFVmZGd2cw00eGM17Grg"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  return (
    <div className="PlansScreen">
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}{" "}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        // check abonnement user est active
        var isCurrentPackage =
          productData.name &&
          subscription &&
          subscription.role &&
          productData.name
            .toLowerCase()
            .includes(subscription.role.toLowerCase());

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "PlansScreen_plan--disablad"
            } PlansScreen_plan`}
          >
            <div className="plansScreen_Info">
              <h5>{productData.name}</h5>
              <h6>{productData.description} </h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlansScreen;
