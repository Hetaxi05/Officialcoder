const payment = require('../model/Payment');
const ModelUser = require('../model/ModelUser');
const express = require('express')
const RouterPayment = express.Router();
const paypal = require('paypal-rest-sdk');
const mongoose = require("mongoose");

paypal.configure({
    "mode": 'sandbox',
    "client_id": "AUR4q6-56OuqgU9Hb3tvhCfhym8WBDuqmPwlrebXuAXSmlCagEagMGw2dHNrmS2pjVPZhBicDGHgsA9Z",
    "client_secret": "ENgAi1TbJjC4rt3SId5YfFPFIoHmhzk80x69jDGvPSvBvYFy-4MCeCfR0dJPAjY_VmqwS9LuDC0U7e42",
})
RouterPayment.get('/test', (req, res) => {
    res.send("Payments router is working!");
});


RouterPayment.get('/all-payments', (req, res) => {
    payment.find().populate("userId")
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error)
        })
})


RouterPayment.post('/', async (req, res) => {
    const { item_name, price, duration, currency, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "User ID is missing in request body." });
    }


    let create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": `http://localhost:5000/payment/success?price=${price}&currency=${currency}&userId=${userId}`,
            "cancel_url": `http://localhost:5000/payment/failed?userId=${userId}&price=${price}&currency=${currency}`,
        },
        "application_context": {

            "shipping_preference": 'NO_SHIPPING',
            "user_action": "commit",
            "brand_name": "programiz",

        },
        "transactions": [{
            "item_list": {
                "items": [{

                    "name": item_name,
                    "sku": "PLAN001",
                    "price": parseFloat(price).toFixed(2),
                    "currency": currency.toUpperCase(),
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": currency.toUpperCase(),
                "total": parseFloat(price).toFixed(2)
            },
            "description": `${item_name} subscription for ${duration}`
        }]

    };

    await paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error);
            res.send(error)
        } else {
            // console.log(payment);
            let data = payment
            res.json(data)
        }
    })
})

RouterPayment.get('/success', async (req, res) => {

    try {
        // console.log(req.query)
        const PayerId = req.query.PayerID;
        const PaymentId = req.query.paymentId;
        const price = req.query.price;
        const currency = req.query.currency;
        const userId = req.query.userId;

        if (!userId) {
            console.error("User ID is missing in query params.");
            return res.redirect(`${process.env.REACT_APP_API_URL}/payment-failed`);
        }
        const express_checkout_json = {
            "payer_id": PayerId,
            "transactions": [{
                "amount": {
                    "currency": currency.toUpperCase(),
                    "total": parseFloat(price).toFixed(2)
                },
                "description": "Payment successful"
            }]
        }
        paypal.payment.execute(PaymentId, express_checkout_json, async function (error, paymentResponse) {
            if (error) {
                console.log(error)
                return res.send(`${process.env.REACT_APP_API_URL}/payment-failed`)
            }

            const response = JSON.stringify(paymentResponse);

            console.log(response)

            const transaction = paymentResponse.transactions[0];
            const newPayment = new payment({
                userId: new mongoose.Types.ObjectId(userId),
                plan: transaction.item_list?.items[0]?.name || "Unknown Plan",
                price: parseFloat(transaction.amount.total),
                currency: transaction.amount.currency,
                transactionId: PaymentId,
                status: paymentResponse.state,
                createdAt: new Date()

            });

            await newPayment.save()
                .then((data) => {
                    console.log(data)
                })
                .catch((error) => {
                    console.log(error);
                })

            await ModelUser.updateOne(
                { _id: userId },
                { $set: { isPremium: true } }
            );

            return res.redirect(`http://localhost:3001/payment-success?price=${transaction.amount.total}&currency=${transaction.amount.currency}&transactionId=${PaymentId}&userId=${userId}`);
        })
    }
    catch (error) {
        console.log(error)
        return res.redirect(`${process.env.REACT_APP_API_URL}/payment-failed`);
        // res.send("failed")
    }
})

RouterPayment.get('/failed', async (req, res) => {
    res.send('<h1>payment failed</h1><p>please try again!</p>')
})

module.exports = RouterPayment;