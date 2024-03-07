import { MenuItem } from './../../../frontend/src/types';


import Stripe from "stripe";
import { Request, Response} from "express";
import Restaurant from '../models/restaurant';

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;

type CheckoutSessionRequest = {
 CartItems:{
    MenuItemId: string,
    name: string,
    quantity: string,
 }[];
 deliveryDetails:{
    email: string;
    name: string;
    addressLine1: string;
    city: string;
 };
 restaurantId: string;
};

const createCheckoutSession = async(req: Request, res: Response) => {
    try {
        const CheckoutSessionRequest: CheckoutSessionRequest = req.body;

        const restaurant = await Restaurant.findById(CheckoutSessionRequest.restaurantId);

        if(!restaurant) {
            throw new Error("Restaurant not found");
        }

        const lineItems = createLineItems(CheckoutSessionRequest, restaurant.menuItems)


    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.raw.message});

    }
};

// const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems) =>{

// }