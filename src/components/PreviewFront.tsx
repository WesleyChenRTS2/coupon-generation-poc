import { CouponState } from "../store/coupon/couponSlice";
import { TemplateType } from "../types/Template";
import TemplateA from "./templates/front/TemplateA";
import TemplateB from "./templates/front/TemplateB";
import TemplateC from "./templates/front/TemplateC";

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
    case TemplateType.C:
      return (
        <TemplateC {...coupon} />
      );
    default:
      return null;
  }


}

export default PreviewFront;

