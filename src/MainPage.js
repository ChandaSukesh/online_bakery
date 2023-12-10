import React, { useEffect } from "react";
import BarChart from "./BarChart";
import DateTimeRangeSelector from "./DateTimeRangeSelector";

let orderData = [];
const MainPage = () => {
  useEffect(() => {
    orderApiHandler();
  }, []);

  const orderApiHandler = async () => {
    const res = await fetch("http://localhost:9000/api/orders");
    orderData = await res?.json();
  };
  console.log("suk1", orderData);

  // item type labels
  const bakeryTypeLabel = [
    ...new Set(orderData?.map((option) => option?.itemType)),
  ];
  // order state labels
  const orderStateLabel = [
    ...new Set(orderData?.map((option) => option?.orderState)),
  ];

  // count of each order with item type
  const cookiesCount = orderData?.filter(
    (cookiesOption) => cookiesOption?.itemType === "Cookies"
  );
  const cakeCount = orderData?.filter(
    (cakeOption) => cakeOption?.itemType === "Cake"
  );
  const muffinCount = orderData?.filter(
    (muffinOption) => muffinOption?.itemType === "Muffins"
  );

  const eachBakeryTypeCount = [
    cookiesCount?.length,
    cakeCount?.length,
    muffinCount?.length,
  ];

  // count of each order with status type
  const createdCount = orderData?.filter(
    (createdOption) => createdOption?.orderState === "Created"
  );
  const shippedCount = orderData?.filter(
    (shippedOption) => shippedOption?.orderState === "Shipped"
  );
  const deliveredCount = orderData?.filter(
    (deliveredOption) => deliveredOption?.orderState === "Delivered"
  );
  const cancelledCount = orderData?.filter(
    (cancelledOption) => cancelledOption?.orderState === "Cancelled"
  );

  const eachOrderStateCount = [
    createdCount?.length,
    shippedCount?.length,
    deliveredCount?.length,
    cancelledCount?.length,
  ];

  return (
    <>
      <div>
        <DateTimeRangeSelector />
      </div>
      <div style={{ display: "flex", margin: "20px" }}>
        <div style={{ marginRight: "10px" }}>
          <BarChart
            label={bakeryTypeLabel}
            data={eachBakeryTypeCount}
            dataSetLabel="Orders Type vs Count"
          />
        </div>
        <div style={{ marginLeft: "10px", marginRight: "10px" }}>
          <BarChart
            label={orderStateLabel}
            data={eachOrderStateCount}
            dataSetLabel="Orders State vs Count"
          />
        </div>
      </div>

      <div style={{ display: "flex", margin: "20px" }}>
        <BarChart
          label="All Orders"
          data={orderData?.length}
          dataSetLabel="Orders Count"
        />
      </div>
    </>
  );
};

export default MainPage;
