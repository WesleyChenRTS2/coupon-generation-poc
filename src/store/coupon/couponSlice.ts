import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Design } from "../../types/Design";
import { Review } from "../../types/Review";
import { Coupon } from "../../types/Coupon";
import { ReviewSource } from "../../enums/ReviewSource";

export interface CouponState {
  coupons: Coupon[];
  design: Design;
  expiration: string;
  image: string | null;
  logo: string | null;
  nap: {
    name: string;
    address: string;
    phone: string;
  };
  reviews: Review[];
  services: string[];
  tagline: string;
  website: string;
}

const initialState: CouponState = {
  design: {
    name: "",
    backgroundPrimaryColor: "bg-[#FACA15]",
    backgroundSecondaryColor: "bg-[#38BDF8]",
    borderSecondaryColor: "border-y-[#38BDF8]",
    fontBaseColor: "text-[#FF0000]",
    fontContrastColor: "text-[#F9FAFB]",
    size: 0,
  },
  expiration: "",
  image: null,
  logo: null,
  nap: {
    name: "",
    address: "",
    phone: "",
  },
  reviews: [
    {
      source: ReviewSource.Google,
      rating: 5,
      comment: "Awesome service!",
    },
  ],
  services: [""],
  tagline: "",
  website: "",
  coupons: [],
};

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    reset: () => initialState,
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    removeReview: (state, action: PayloadAction<number>) => {
      state.reviews.splice(action.payload, 1);
    },
    updateCoupon: (
      state,
      action: PayloadAction<{ index: number; value: Coupon }>,
    ) => {
      state.coupons[action.payload.index] = {
        ...state.coupons[action.payload.index],
        ...action.payload.value,
      };
    },
    addCoupon: (state, action: PayloadAction<Coupon>) => {
      state.coupons.push(action.payload);
    },
    removeCoupon: (state, action: PayloadAction<number>) => {
      state.coupons.splice(action.payload, 1);
    },
    setService: (
      state,
      action: PayloadAction<{ index: number; value: string }>,
    ) => {
      state.services[action.payload.index] = action.payload.value;
    },
    addService: (state) => {
      state.services.push("");
    },
    removeService: (state, action: PayloadAction<number>) => {
      state.services.splice(action.payload, 1);
    },
    setDesign: (state, action: PayloadAction<Design>) => {
      state.design = action.payload;
    },
    setExpiration: (state, action: PayloadAction<string>) => {
      state.expiration = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    setLogo: (state, action: PayloadAction<string>) => {
      state.logo = action.payload;
    },
    setNap: (state, action: PayloadAction<CouponState["nap"]>) => {
      state.nap = action.payload;
    },
    setTagline: (state, action: PayloadAction<string>) => {
      state.tagline = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.nap.name = action.payload;
    },
    setWebsite: (state, action: PayloadAction<string>) => {
      state.website = action.payload;
    },
    setColors: (state, action: PayloadAction<Design>) => {
      state.design = action.payload;
    }
  },
});

export default couponSlice.reducer;
