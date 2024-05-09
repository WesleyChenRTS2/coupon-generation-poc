import { CouponState } from "../store/coupon/couponSlice";

import { TemplateType } from "../types/Template";
import TemplateA from "./templates/back/TemplateA";

type Props = {
  coupon: CouponState;
  templateType: TemplateType;
};

function PreviewBack({ coupon, templateType }: Props) {
  if (templateType === TemplateType.A) {
    return (
      <TemplateA {...coupon} />
    );
  }
  return null;
}

export default PreviewBack;

