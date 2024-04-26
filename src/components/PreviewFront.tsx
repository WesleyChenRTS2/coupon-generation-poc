import { CouponState } from "../store/coupon/couponSlice";
import logo from "../assets/logoipsum-325.svg";
import portrait from "../assets/blog_family_life_compressed.jpg";

type Props = {
  coupon: CouponState;
};

function PreviewFront({ coupon }: Props) {
  return (
    <div className="flex h-[600px] w-[1200px] shrink-0 flex-nowrap bg-yellow-300 text-slate-900 shadow-xl">
      <div className="flex-1 grow">
        <div className="px-8 pb-4 pt-12">
          <img src={logo} alt="Coupon" className="w-full" />
        </div>
        <div className="p-4">
          <p className="mb-8 border border-x-0 border-y-8 border-y-sky-400 py-8 text-center text-4xl font-bold ">
            {coupon.tagline || "Your tagline"}
          </p>
          <ul className="flex w-full flex-col items-center justify-center pl-8 text-xl">
            {coupon.services.map((service, index) => (
              <li className="list-disc" key={index}>
                {service || "Service Name"}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-1 grow flex-col bg-sky-400">
        <div className="shrink-0">
          <img src={portrait} alt="" />
        </div>
        <div className="flex grow flex-col items-center justify-center px-4">
          <p className="mb-4 text-xl font-bold text-white">
            Call today or Conveniently Schedule Online!
          </p>
          <p className="mb-4 rounded-full bg-yellow-300 px-12 py-4 text-3xl font-bold shadow">
            {coupon.nap?.phone || "Your phone number"}
          </p>
          <p className="text-xl font-bold text-white">
            {coupon.website || "yourwebsite.com"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PreviewFront;
