import React, { useEffect } from "react";
import { initializePaddle } from "@paddle/paddle-js";

const PaddleForm = () => {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_DEMO_CLIENT_TOKEN);
    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_DEMO_CLIENT_TOKEN || "",
      debug: true,
    }).then((instance) => {
      if (instance) {
        instance.Checkout.open({
          items: [
            { priceId: "pri_01kbs4yxadgn17wg2t1zwecfr6", quantity: 1 },
            { priceId: "pri_01kbs4xsh5vj3d6hncc2ryvfdt", quantity: 1 },
          ],
          customer: {
            email: "carovacdavud6@gmail.com",
          },
        });
      } else {
        console.warn("Paddle instance not initialized:", instance);
      }
    });
  }, []);

  return <div>PaddleForm</div>;
};

export default PaddleForm;
