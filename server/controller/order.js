const Order = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const controller = {};

controller.payment = async (req, res, next) => {
    const { items, address, payment, subTotal, tax } = req.body;

    try {
        if (items.length <= 0) {
            return res.json({ message: 'no order items found' });
        }
        const token = await stripe.tokens.create({
            card: {
                name: payment.name,
                number: payment.number, // '4242424242424242',
                exp_month: payment.expire.slice(0, 2),
                exp_year: `20${payment.expire.slice(2, 4)}`,
                cvc: payment.cvc,
                address_line1: address.address,
                address_city: address.city,
                address_zip: address.zipcode,
                address_country: address.country,
            },
        });
        const customer = await stripe.customers.create({
            name: payment.name,
            email: address.email,
            source: token.id,
        });

        const charge = await stripe.charges.create({
            amount: (parseInt(subTotal) + parseInt(tax)) * 100,
            currency: 'usd',
            customer: customer.id,
            description: 'Thank you for your purchase',
            receipt_email: payment.email,
            shipping: {
                // todo: change this to user address here
                name: payment.name,
                address: {
                    line1: address.address,
                    city: address.city,
                    postal_code: address.zipcode,
                    country: address.country,
                },
            },
        });
        const products = [];
        items.forEach((itm) => {
            const obj = {};
            obj.name = itm.name;
            obj.qty = itm.count;
            obj.image = itm.image;
            obj.price = itm.price;
            obj.product = itm._id;
            products.push(obj);
        });
        const order = await Order.create({
            user: req.user._id,
            items: products,
            shippingAddress: {
                address: address.address,
                city: address.city,
                postalCode: address.zipcode,
                country: address.country,
            },
            // todo: change the address from user address
            billingAddress: address.address,
            paymentResult: {
                id: charge.id,
                status: charge.status,
                email_address: charge.receipt_email,
            },
            amount: charge.amount,
            isPaid: charge.paid,
        });

		console.log('🎉', order)
        res.json({
            amount: order.amount / 100,
            paymentResult: order.paymentResult,
            orderId: order._id,
            recept: charge.receipt_url,
        });
    } catch (err) {
        if (err.type) {
            return res.json({ error: true, message: err.message });
        } else {
            return next(err.message);
        }
    }
};

controller.getOrderList = async (req, res, next) => {
    const id = req.user._id;
    try {
        const orders = await Order.find({ user: id });
        res.status(200).json(orders);
    } catch (error) {
        next(error.message);
    }
};
module.exports = controller;
