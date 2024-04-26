export interface Coupon {
  title: string;
  description: string;
  inclusions: string[];
  code: string | undefined;
  discount: number;
  type: "percentage" | "fixed";
  finePrint: string;
}
