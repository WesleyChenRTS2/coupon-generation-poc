import { CouponState } from "../store/coupon/couponSlice";
import { TemplateType } from "../types/Template";
import TemplateA from "./templates/front/TemplateA";
import TemplateB from "./templates/front/TemplateB";

type Props = {
  coupon: CouponState;
  templateType: TemplateType;
};

function PreviewFront({ coupon, templateType }: Props) {

  // make the above into a switch case
  switch(templateType) {
    case TemplateType.A:
      return (
        <TemplateA {...coupon} />
      );
    case TemplateType.B:
      return (
        <TemplateB {...coupon} />
      );
    default:
      return null;
  }


}

export default PreviewFront;

