import { CouponState } from "../store/coupon/couponSlice";
import portrait from "../assets/blog_family_life_compressed.jpg";
import { TemplateType } from "../types/Template";

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


const TemplateA = (coupon : CouponState) => {
  return (
    <div className="flex h-[600px] w-[1200px] shrink-0 flex-nowrap shadow-xl">
      <div className="flex flex-1 grow flex-col bg-white text-tbase">
        <div className="grow">
          <div className="flex justify-between p-8">
            <div className="relative size-48 overflow-hidden rounded-full border-8 border-secondary">
              <img
                src={portrait}
                className="absolute left-0 top-0 size-full object-cover"
              />
            </div>
            <div className="px-8 pb-4 pt-24">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-primary"  viewBox="0 0 220 40">
              <path d="M20 40c11.046 0 20-8.954 20-20V6a6 6 0 0 0-6-6H21v8.774c0 2.002.122 4.076 1.172 5.78a9.999 9.999 0 0 0 6.904 4.627l.383.062a.8.8 0 0 1 0 1.514l-.383.062a10 10 0 0 0-8.257 8.257l-.062.383a.8.8 0 0 1-1.514 0l-.062-.383a10 10 0 0 0-4.627-6.904C12.85 21.122 10.776 21 8.774 21H.024C.547 31.581 9.29 40 20 40Z"></path><path d="M0 19h8.774c2.002 0 4.076-.122 5.78-1.172a10.018 10.018 0 0 0 3.274-3.274C18.878 12.85 19 10.776 19 8.774V0H6a6 6 0 0 0-6 6v13ZM46.455 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM211.711 12.104c5.591 0 8.289 3.905 8.289 8.428v8.495h-5.851V21.54c0-2.05-.748-3.742-2.893-3.742-2.145 0-2.86 1.692-2.86 3.742v7.486h-5.851V21.54c0-2.05-.715-3.742-2.861-3.742-2.145 0-2.893 1.692-2.893 3.742v7.486h-5.85v-8.495c0-4.523 2.697-8.428 8.288-8.428 3.056 0 5.266 1.204 6.274 3.189 1.072-1.985 3.413-3.19 6.208-3.19ZM180.427 23.82c1.885 0 2.698-1.725 2.698-3.776v-7.29h5.85v8.006c0 4.784-2.795 8.755-8.548 8.755-5.754 0-8.549-3.97-8.549-8.755v-8.006h5.851v7.29c0 2.05.812 3.776 2.698 3.776ZM163.275 29.547c-3.673 0-6.046-1.269-7.444-3.742l4.226-2.376c.585 1.041 1.462 1.562 2.925 1.562 1.203 0 1.755-.423 1.755-.944 0-1.985-8.581.033-8.581-6.28 0-3.06 2.6-5.533 7.021-5.533 3.868 0 5.981 1.887 6.924 3.71l-4.226 2.408c-.357-.976-1.463-1.562-2.568-1.562-.845 0-1.3.358-1.3.846 0 2.018 8.581.163 8.581 6.281 0 3.417-3.348 5.63-7.313 5.63ZM142.833 36.512h-5.851V20.858c0-4.98 3.738-8.592 8.939-8.592 5.071 0 8.939 3.873 8.939 8.592 0 5.207-3.446 8.657-8.614 8.657-1.203 0-2.405-.358-3.413-.912v7.909Zm3.088-12.497c1.853 0 3.088-1.432 3.088-3.125 0-1.724-1.235-3.124-3.088-3.124s-3.088 1.4-3.088 3.125c0 1.692 1.235 3.124 3.088 3.124ZM131.121 11.03c-1.918 0-3.51-1.595-3.51-3.515 0-1.92 1.592-3.515 3.51-3.515 1.918 0 3.511 1.595 3.511 3.515 0 1.92-1.593 3.515-3.511 3.515Zm-2.925 1.724h5.851v16.273h-5.851V12.754ZM116.97 29.515c-5.071 0-8.939-3.905-8.939-8.657 0-4.719 3.868-8.624 8.939-8.624s8.939 3.905 8.939 8.624c0 4.752-3.868 8.657-8.939 8.657Zm0-5.5c1.853 0 3.088-1.432 3.088-3.125 0-1.724-1.235-3.156-3.088-3.156s-3.088 1.432-3.088 3.156c0 1.693 1.235 3.125 3.088 3.125ZM96.983 37c-4.03 0-6.956-1.79-8.451-4.98l4.843-2.603c.52 1.107 1.495 2.246 3.51 2.246 2.114 0 3.511-1.335 3.674-3.678-.78.684-2.016 1.204-3.868 1.204-4.519 0-8.16-3.482-8.16-8.364 0-4.718 3.869-8.559 8.94-8.559 5.201 0 8.939 3.613 8.939 8.592v6.444c0 5.858-4.064 9.698-9.427 9.698Zm.39-13.31c1.755 0 3.088-1.205 3.088-2.995 0-1.757-1.332-2.929-3.088-2.929-1.723 0-3.088 1.172-3.088 2.93 0 1.79 1.365 2.993 3.088 2.993ZM78.607 29.515c-5.071 0-8.94-3.905-8.94-8.657 0-4.719 3.869-8.624 8.94-8.624 5.07 0 8.939 3.905 8.939 8.624 0 4.752-3.869 8.657-8.94 8.657Zm0-5.5c1.853 0 3.088-1.432 3.088-3.125 0-1.724-1.235-3.156-3.088-3.156s-3.088 1.432-3.088 3.156c0 1.693 1.235 3.125 3.088 3.125ZM59.013 7.06v16.434H68.7v5.533H58.2c-3.705 0-5.2-1.953-5.2-5.045V7.06h6.013Z"/>
            </svg>
        </div>
          </div>
        </div>
        <div className="shrink bg-primary  p-8 text-tcontrast">
          <div className="flex">
            <div className="grow">
              <p className="text-xl font-bold uppercase italic">
                Scan here to easily schedule your appoinment
              </p>
              <p className="text-3xl font-bold">
                {coupon.nap.phone || "Your phone number"}
                <span className="px-4">&bull;</span>
                <br/>
                {coupon.website || "Your website"}
              </p>
              <p className="text-2xl italic">
                {coupon.nap.address || "Your address"}
              </p>
            </div>
            <div className="shrink">
              <img src="https://via.placeholder.com/150" alt="QR Code" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex shrink basis-1/3 flex-col border-l border-gray-200 bg-secondary">
        <div className="h-full justify-between bg-primary p-8 ">
          {coupon.coupons.map((coupon, index) => (
            <div
              key={index}
              className="mb-8 border-4 border-dashed border-black bg-white"
            >
              <p className="mb-4 bg-secondary p-4 text-center text-2xl font-bold text-white">
                {coupon.title || "Coupon Title"}
              </p>
              <p className="mb-2 text-center text-5xl font-bold text-secondary">
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