import { CouponState } from "../store/coupon/couponSlice";
import logo from "../assets/logoipsum-325.svg";
import portrait from "../assets/blog_family_life_compressed.jpg";

type Props = {
  coupon: CouponState;
};

function PreviewBack({ coupon }: Props) {
  return (
    <div className="flex h-[600px] w-[1200px] shrink-0 flex-nowrap text-slate-900 shadow-xl">
      <div className="flex flex-1 grow flex-col bg-white">
        <div className="grow">
          <div className="flex justify-between p-8">
            <div className="relative size-48 overflow-hidden rounded-full border-8 border-sky-400">
              <img
                src={portrait}
                className="absolute left-0 top-0 size-full object-cover"
              />
            </div>
            <img src={logo} />
          </div>
        </div>
        <div className="shrink bg-yellow-300 p-8">
          <div className="flex">
            <div className="grow">
              <p className="text-xl font-bold uppercase italic">
                Scan here to easily schedule your appoinment
              </p>
              <p className="text-3xl font-bold text-sky-400">
                {coupon.nap.phone || "Your phone number"}
                <span className="px-4">&bull;</span>
                {coupon.website || "Your website"}
              </p>
              <p className="text-2xl italic text-slate-600">
                {coupon.nap.address || "Your address"}
              </p>
            </div>
            <div className="shrink">
              <img src="https://via.placeholder.com/150" alt="QR Code" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full shrink basis-1/3 flex-col border-l border-gray-200 bg-white">
        <div className="bg-yellow-300 p-8">
          {coupon.coupons.map((coupon, index) => (
            <div
              key={index}
              className="border-4 border-dashed border-sky-400 bg-white"
            >
              <p className="mb-4 bg-sky-400 p-4 text-center text-2xl font-bold text-white">
                {coupon.title || "Coupon Title"}
              </p>
              <p className="mb-2 text-center text-5xl font-bold text-sky-400">
                {coupon.type === "fixed" && "$"}
                {coupon.discount}
                {coupon.type === "percentage" && "%"}
              </p>
              <p className="mb-2 text-center text-2xl font-bold">
                {coupon.description || "Coupon Description"}
              </p>
              <ul className="flex flex-col items-center justify-center pb-4 text-sm">
                {coupon.inclusions.map((inclusion, index) => (
                  <li key={index} className="text-center">
                    <span className="mr-1">&bull;</span> {inclusion}
                  </li>
                ))}
              </ul>
              <p className="mb-4 text-center text-sm">{coupon.finePrint}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PreviewBack;
