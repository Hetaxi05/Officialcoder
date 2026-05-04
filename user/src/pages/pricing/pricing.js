import { GoCheck } from "react-icons/go";
import { Spin } from 'antd';
import { useState } from "react";

import './pricing.css';
import FAQ from "../FAQ/FAQ";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Pricing() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const HandleSubmit = async (planName, price, duration) => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user._id) {
            console.error("User ID is missing from localStorage");
            navigate("/userlogin");

            return;
        }

        const requestData = {
            userId: user._id,
            item_name: planName,
            price: price,
            duration: duration,
            currency: "USD"
        };
        setLoading(true);


        console.log("Sending request data:", requestData);

        try {
            let res = await axios.post(`${process.env.REACT_APP_API_URL}/payment`, requestData);
            console.log("Response Data:", res.data);

            if (res.data && res.data.links) {
                let link = res.data.links.find(link => link.rel === "approval_url").href;
                //Append userId to the PayPal URL
                let paymentURL = `${link}&userId=${user._id}`;
                window.open(paymentURL, '_blank');
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false); // Hide loader
        }
    };


    return (
        <>
            <div className="pricing-page">

                <Spin spinning={loading} tip="Processing Payment..." size="large">

                    <div className="container-fluid " style={{ background: "#fff5e7" }}>


                        <div className="container ps-0 ms-5 pe-0" >
                            <div className="row pb-5 m-3 gap-5">
                                <div className="pricingbgimage">
                                    <img style={{ color: "transparent" }} alt="transparent" src="./assets/image/pricing-bg-pattern.9320702e.svg" ></img>
                                </div>
                                <div className="ms-5 ps-5">
                                    <p style={{ fontSize: "34px", color: "rgb(34, 34, 84)", fontWeight: "700", justifyContent: "center", display: "flex" }}>Choose the best plan for you.</p>
                                </div>
                                {/* <div className="col-1" style={{width:"8px"}}></div> */}
                                <div className="col-1" ></div>

                                <div className="col border border-1 shadow pt-4 p-3" style={{ borderRadius: "2%", backgroundColor: "white", position: "relative" }}>
                                    <p style={{ color: "rgb(34, 34, 84)", fontSize: "24px", fontWeight: "700" }}>Half-yearly</p>
                                    <p style={{ color: "rgba(37, 38, 94, .67)", fontsize: "16px", fontWeight: "500", lineheight: "24px" }}>Best for learning a specific course or skill</p>
                                    <div className="line " style={{ height: "0.3px", width: "250px", backgroundColor: "rgba(37, 38, 94, .67)" }}>
                                    </div>


                                    <h1 className=" " style={{ color: "rgb(34, 34, 84)", fontSize: "30px", fontWeight: "700" }}>$49<span className="ps-2" style={{ fontSize: "17px", color: "rgba(31, 32, 75, 0.67)", fontWeight: "500" }}>for 6 months</span></h1>

                                    <span
                                        className="mt-4 pt-2 pb-2 border border-1"
                                        onClick={() => HandleSubmit("Half-Yearly", 49, "6 months")}

                                        onMouseOver={(e) => e.target.style.color = "blue"}
                                        onMouseOut={(e) => e.target.style.color = "black"}
                                        style={{
                                            cursor: "pointer",
                                            color: "black",
                                            fontWeight: "500",
                                            borderRadius: "3.5%",
                                            justifyContent: "center",
                                            display: "flex"
                                        }}
                                    >
                                        Get Half-Yearly
                                    </span>


                                    <ul className="pricing-ul list-unstyled " >
                                        <li> <GoCheck style={{ color: "green", height: "20px", width: "30px" }} />Full course catalog</li>
                                        <li> <GoCheck style={{ color: "green", height: "20px", width: "30px" }} />   Coding challenges</li>
                                        <li> <GoCheck style={{ color: "green", height: "20px", width: "30px" }} /> Practice projects</li>
                                        <li> <GoCheck style={{ color: "green", height: "20px", width: "30px" }} />  Interview preparation courses</li>
                                        <li> <GoCheck style={{ color: "green", height: "20px", width: "30px" }} />  Professional certifications</li>
                                        <li>  <GoCheck style={{ color: "green", height: "20px", width: "30px" }} /> Unlimited coding playground </li>
                                    </ul>
                                </div>



                                <div className="col border-danger shadow pt-4 p-3" style={{ position: "relative", borderRadius: "2%", borderStyle: "solid", borderColor: " linear-gradient(180deg, #ec008c, #fc6767 47.92%);", backgroundColor: "white" }}>
                                    <p style={{ color: "#ec008c", fontSize: "24px", fontWeight: "700" }}>Annual</p>
                                    <p style={{ color: "rgba(37, 38, 94, .67)", fontsize: "16px", fontWeight: "500", lineheight: "24px" }}>Best for building a solid coding foundation</p>
                                    <div className="line" style={{ height: "0.3px", width: "250px", backgroundColor: "rgba(37, 38, 94, .67)" }}>
                                    </div>
                                    <h1 style={{ color: "rgb(34, 34, 84)", fontSize: "30px", fontWeight: "700" }}>$99<span className="ps-2" style={{ fontSize: "17px", color: "rgba(31, 32, 75, 0.67)", fontWeight: "500" }}>for 1 year</span></h1>
                                    <span
                                        className="mt-4 pt-2 pb-2 border border-1"
                                        onClick={() => HandleSubmit("Annual", 99, "1 year")}
                                        style={{
                                            cursor: "pointer",
                                            fontWeight: "500",
                                            borderRadius: "3.5%",
                                            justifyContent: "center",
                                            display: "flex",
                                            background: "linear-gradient(90deg, #ec008c, #fc6767)",
                                            color: "white"
                                        }}
                                    >
                                        Get Annual
                                    </span>
                                    <ul className="pricing-ul list-unstyled " >
                                        <li> <GoCheck style={{ color: "green", height: "20px", width: "30px" }} />Full course catalog</li>
                                        <li> <GoCheck style={{ color: "green", height: "20px", width: "30px" }} />  Coding challenges</li>
                                        <li> <GoCheck style={{ color: "green", height: "20px", width: "30px" }} /> Practice projects</li>
                                        <li> <GoCheck style={{ color: "green", height: "20px", width: "30px" }} />  Interview preparation courses</li>
                                        <li> <GoCheck style={{ color: "green", height: "20px", width: "30px" }} />  Professional certifications</li>
                                        <li>  <GoCheck style={{ color: "green", height: "20px", width: "30px" }} /> Unlimited coding playground </li>
                                    </ul>
                                </div>

                                <div className="col border border-1 shadow pt-4 p-3" style={{ borderRadius: "2%", backgroundColor: "white", position: "relative" }}>
                                    <p style={{ color: "#0556f3", fontSize: "24px", fontWeight: "700" }}>Lifetime</p>
                                    <p style={{ color: "rgba(37, 38, 94, .67)", fontsize: "16px", fontWeight: "500", lineheight: "24px" }}>Best for learning a specific course or skill</p>
                                    <div className="line" style={{ height: "0.3px", width: "250px", backgroundColor: "rgba(37, 38, 94, .67)" }}>
                                    </div>
                                    <h1 style={{ color: "rgb(34, 34, 84)", fontSize: "30px", fontWeight: "700" }}>$199<span className="ps-2" style={{ fontSize: "17px", color: "rgba(31, 32, 75, 0.67)", fontWeight: "500" }}> One-Time</span></h1>
                                    <span
                                        className="mt-4 pt-2 pb-2 border border-1"

                                        onClick={() => HandleSubmit("Lifetime", 199, "Lifetime")}
                                        style={{
                                            cursor: "pointer",
                                            fontWeight: "500",
                                            borderRadius: "3.5%",
                                            justifyContent: "center",
                                            display: "flex",
                                            backgroundColor: "#0556f3",
                                            color: "white"
                                        }}
                                    >
                                        Get Lifetime Access
                                    </span>

                                    <ul className="pricing-ul list-unstyled " >
                                        <li style={{ fontSize: "17px", color: "black" }}>Everything in <span style={{ color: " #ec008c" }}>Annual</span> plus</li>
                                        <li> <GoCheck style={{ color: "green", height: "20px", width: "30px" }} />Lifetime access</li>
                                        <li> <GoCheck style={{ color: "green", height: "20px", width: "30px" }} />   No recurring payments</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Spin>
                <FAQ />
            </div>
        </>
    )
}
export default Pricing;
