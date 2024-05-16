import {
  Button,
  Kbd,
  Label,
  Modal,
  Radio,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { CouponState } from "../store/coupon/couponSlice";
import { RootState, AppDispatch } from "../store/store";
import { HiPlus, HiX } from "react-icons/hi";
import {  useEffect, useState } from "react";
import { Coupon } from "../types/Coupon";
import PreviewFront from "../components/PreviewFront";
import PreviewBack from "../components/PreviewBack";
import { TemplateType } from "../types/Template";
import { Bars } from "react-loader-spinner";


function Create() {
  const [isAddCouponDialogOpen, setIsAddCouponDialogOpen] = useState(false);
  const [activeCouponIndex, setActiveCouponIndex] = useState<number | null>(
    null,
  );
  const [frontTemplateType, setFrontTemplateType] = useState<TemplateType>(TemplateType.A);
  const [backTemplateType, setBackTemplateType] = useState<TemplateType>(TemplateType.A);
  const [primaryColor, setPrimaryColor] = useState<string>("#ffcc00");
  const [secondaryColor, setSecondaryColor] = useState<string>("#353535");
  const [fontBaseColor, setFontBaseColor] = useState<string>("#f5f5f5");
  const [fontContrastColor, setFontContrastColor] = useState<string>("#808080");
  const [templateUrl, setTemplateUrl] = useState<string>("");
  const [imageDescription, setImageDescription] = useState<string>("");
  const [viewFront, setViewFront] = useState<boolean>(true);
  const [isLoadingColorScheme, setIsLoadingColorScheme] = useState<boolean>(false);
  const [isLoadingDescription, setIsLoadingDescription] = useState<boolean>(false);
  const [isLoadingLogo, setIsLoadingLogo] = useState<boolean>(false);

  const [newCoupon, setNewCoupon] = useState<Coupon>({
    title: "",
    description: "",
    type: "fixed",
    inclusions: [],
    code: undefined,
    discount: 0,
    finePrint: "",
  });

  const coupon: CouponState = useSelector((state: RootState) => state.coupon);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (activeCouponIndex === null) {
      return;
    }

    setNewCoupon(coupon.coupons[activeCouponIndex]);
    setIsAddCouponDialogOpen(true);
  }, [activeCouponIndex]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Form submitted");
  }

  function handleOpenAddCouponDialog() {
    setIsAddCouponDialogOpen(true);
  }

  function handleCreateCoupon(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // If we have an active coupon index, update the coupon
    if (activeCouponIndex !== null) {
      dispatch({
        type: "coupon/updateCoupon",
        payload: { index: activeCouponIndex, value: newCoupon },
      });
      setIsAddCouponDialogOpen(false);
      setActiveCouponIndex(null);

      return;
    }

    dispatch({
      type: "coupon/addCoupon",
      payload: newCoupon,
    });
    setIsAddCouponDialogOpen(false);
    setActiveCouponIndex(null);
    setNewCoupon({
      title: "",
      description: "",
      inclusions: [],
      type: "fixed",
      code: undefined,
      discount: 10,
      finePrint: "",
    });
  }

  function handleToggle() {
    setViewFront(!viewFront);
  };

  function updateDesignColors({primaryColor, secondaryColor, fontBaseColor, fontContrastColor} : {primaryColor: string, secondaryColor: string, fontBaseColor: string, fontContrastColor: string
  }) {
      document.documentElement.style.setProperty('--color-primary', primaryColor);
      document.documentElement.style.setProperty('--color-secondary', secondaryColor);
      document.documentElement.style.setProperty('--color-tbase', fontBaseColor);
      document.documentElement.style.setProperty('--color-tcontrast', fontContrastColor);
  }

  function normalizeHexCode(hex: string) {
    // Remove the leading '#' if present
    hex = hex.replace('#', '');
    
    // Check if the length is 3 characters
    if (hex.length === 3) {
      // Double each character
      hex = hex.split('').map(char => char + char).join('');
    }
    
    // Add the leading '#' back
    return `#${hex}`;
  }

  async function fetchColorSchemeSuggestion(url: string) {
    setIsLoadingColorScheme(true);
    try {
      const response = await fetch(`https://mailshark-colorgen-api.vercel.app/color_scheme_suggestion?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)

      const primaryColor = normalizeHexCode(data.Primary);
      const secondaryColor = normalizeHexCode(data.Secondary);
      const fontBaseColor = data.FontBase ? normalizeHexCode(data.FontBase): normalizeHexCode(data.BaseFont);
      const fontContrastColor = data.FontContrast ? normalizeHexCode(data.FontContrast): normalizeHexCode(data.ContrastFont);

      // Update the design colors
      setPrimaryColor(primaryColor);
      setSecondaryColor(secondaryColor);
      setFontBaseColor(fontBaseColor);
      setFontContrastColor(fontContrastColor);

      updateDesignColors({
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        fontBaseColor: fontBaseColor,
        fontContrastColor: fontContrastColor
      })
      setIsLoadingColorScheme(false);
      return data;
    } catch (error) {
      console.error('Failed to fetch color scheme suggestion:', error);
      setIsLoadingColorScheme(false); 
      return null;
    }
  }

  async function fetchLogoFromUrl(url: string) {
    setIsLoadingLogo(true);
    try {
      const response = await fetch(`https://mailshark-colorgen-api.vercel.app/fetch_logo?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)

      dispatch({
        type: "coupon/setLogo",
        payload: data.logo_url,
      })

      setIsLoadingLogo(false);
      return data;
    } catch (error) {
      console.error('Failed to fetch color scheme suggestion:', error);
      setIsLoadingLogo(false); 
      return null;
    }
  }

  function fetchDataFromTemplateUrl(url: string) {
    fetchColorSchemeSuggestion(url);
    fetchLogoFromUrl(url);
  }

  async function fetchImageFromDescription(description: string) {
    setIsLoadingDescription(true);
    try {
      const response = await fetch(
        `https://mailshark-colorgen-api.vercel.app/generate_image`, 
        {body: JSON.stringify({
          description: description,
          primary_color: primaryColor,
          secondaryColor: secondaryColor,
          size: "1024x1024"
        }), 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}}
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)

      // TODO: HARDCODED URL FOR TESTING
      data.image_url = "https://cdn.creatureandcoagency.com/uploads/2017/09/Hippo-Facts-2.jpg"

      dispatch({
        type: "coupon/setImage",
        payload: data.image_url,
      })
      setIsLoadingDescription(false);
    } catch (error) {
      console.error('Failed to fetch color scheme suggestion:', error);
      setIsLoadingDescription(false);
      // TODO: HARDCODED URL FOR TESTING
      const image_url = "https://cdn.creatureandcoagency.com/uploads/2017/09/Hippo-Facts-2.jpg"

      // TODO REMOVE
      dispatch({
        type: "coupon/setImage",
        payload: image_url,
      }) 
      return null;
    }
  }

  return (
    <div className="flex h-screen " >
      <div
        id="canvas"
        className="flex grow flex-col items-center justify-center gap-6 overflow-y-auto print:block"
      >
        <div className='space-y-8'>
        <h2 className="mt-4 text-center text-4xl font-bold uppercase tracking-wide text-primary print:hidden">
    {viewFront ? 'Front' : 'Back'}
  </h2>
  <button
    onClick={handleToggle}
    className="hover:bg-primary-dark mt-8 rounded-lg bg-primary px-6 py-3 font-semibold text-tcontrast print:hidden shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75"
  >
    {viewFront ? 'Switch to Back' : 'Switch to Front'}
  </button>

  {viewFront ? (
    <PreviewFront coupon={coupon} templateType={frontTemplateType} />
  ) : (
    <PreviewBack coupon={coupon} templateType={backTemplateType} />
  )}
        </div>
      </div>
      <div
        id="sidebar"
        className=" h-screen w-96 shrink-0 overflow-y-scroll bg-gray-50 px-4 py-8 shadow-md print:hidden"
      >
        <div className="mb-3">
          <Label htmlFor="front-template-type" value="Front Template Type" />
          <Select
            id="front-template-type"
            onChange={(event) => setFrontTemplateType(event.target.value as TemplateType)}
            value={frontTemplateType}
          >
            <option value={TemplateType.A}>Template A</option>
            <option value={TemplateType.B}>Template B</option>
            <option value={TemplateType.C}>Template C</option>
          </Select>
        </div>

        <div className="mb-3">
          <Label htmlFor="back-template-type" value="Back Template Type" />
          <Select
            id="back-template-type"
            onChange={(event) => setBackTemplateType(event.target.value as TemplateType)}
            value={backTemplateType}
          >
            <option value={TemplateType.A}>Template A</option>
            {/* <option value={TemplateType.B}>Template B</option>
            <option value={TemplateType.C}>Template C</option> */}
          </Select>
        </div>
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <fieldset>
            <legend className="mb-4 text-xl font-bold">
              General information
            </legend>
            <div className="mb-3">
              <div className="mb-2 block">
                <Label htmlFor="company-name" value="Company Name" />
              </div>
              <TextInput
                id="company-name"
                type="text"
                placeholder="ex. Awesome Company"
                required
                onChange={(event) =>
                  dispatch({
                    type: "coupon/setNap",
                    payload: { ...coupon.nap, name: event.target.value },
                  })
                }
              />
            </div>

            <div className="mb-3">
              <div className="mb-2 block">
                <Label htmlFor="tagline" value="Tagline" />
              </div>
              <TextInput
                id="tagline"
                type="text"
                placeholder="ex. We are awesome"
                required
                onChange={(event) =>
                  dispatch({
                    type: "coupon/setTagline",
                    payload: event.target.value,
                  })
                }
              />
            </div>
            <legend className="my-4 text-xl font-bold">
              Design Information
            </legend>

            <div className="mb-1">
              <div className="mb-2 block">
                <Label htmlFor="template URL" value="Template URL" />
              </div>
              <TextInput
                id="template-url"
                type="text"
                placeholder="ex. www.mywebsite.com"
                onChange={(event) =>
                  setTemplateUrl(event.target.value)
                }
              />
            </div>


            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => {fetchDataFromTemplateUrl(templateUrl)}} 
                disabled={!templateUrl || isLoadingColorScheme || isLoadingLogo} 
                className="my-4"
              >
                  Generate design from URL
                </Button>
                <Bars
                height="40"
                width="80"
                color="#0e7490"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass="bars-wrapper"
                visible={isLoadingColorScheme}
                />
              </div>
           
              <div className="mb-2 block">
                <Label htmlFor="primary-color" value="Primary Color" className="mr-3" />
                <input
                  type="color"
                  id="primary-color"
                  className="align-middle"
                  value={primaryColor}
                  onChange={(event) => setPrimaryColor(event.target.value)}

                />
              </div>

              <div className="mb-2 block">
                <Label htmlFor="secondary-color" value="Secondary Color" className="mr-3" />
                <input
                  type="color"
                  id="secondary-color"
                  className="align-middle"
                  value={secondaryColor}
                  onChange={(event) => setSecondaryColor(event.target.value)}
                />

              </div>
              <div className="mb-2 block">
                <Label htmlFor="font-base-color" value="Font Base Color" className="mr-3" />
                <input
                  type="color"
                  id="font-base-color"
                  className="align-middle"
                  value={fontBaseColor}
                  onChange={(event) => setFontBaseColor(event.target.value)}
                />
              </div>

              <div className="mb-2 block">
                <Label htmlFor="font-contrast-color" value="Font Contrast Color" className="mr-3" />
                <input
                  type="color"
                  id="font-contrast-color"
                  className="align-middle"
                  value={fontContrastColor}
                  onChange={(event) => setFontContrastColor(event.target.value)}
                />
              </div>

              <Button onClick={() => updateDesignColors({
                primaryColor: primaryColor,
                secondaryColor: secondaryColor,
                fontBaseColor: fontBaseColor,
                fontContrastColor: fontContrastColor
              })} >
                Update Design
              </Button>

              <div className="my-3">
                <div className="mb-2 block">
                  <Label htmlFor="imageDescription" value="Image description" />
                </div>
                <Textarea
                  id="imageDescription"
                  placeholder="Provide a description of an image you want to use"
                  required
                  onChange={(event) =>
                    setImageDescription(event.target.value)
                  }
                  value={imageDescription}
                />
              </div>

              <div className="flex items-center space-x-4">
                <Button 
                  disabled={!imageDescription || isLoadingDescription}
                  onClick={() => {
                    fetchImageFromDescription(imageDescription)
                  }
                } >
                  Generate Image
                </Button>

                <Bars
                height="40"
                width="80"
                color="#0e7490"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass="bars-wrapper"
                visible={isLoadingDescription}
                />
              </div>
 
          </fieldset>

          <hr className="my-4" />

          <fieldset>
            <legend className="mb-4 text-xl font-bold">
              Contact information
            </legend>

            <div className="mb-3">
              <div className="mb-2 block">
                <Label htmlFor="website" value="Website" />
              </div>
              <TextInput
                id="website"
                type="url"
                placeholder="ex. https://awesome.com"
                required
                onChange={(event) =>
                  dispatch({
                    type: "coupon/setWebsite",
                    payload: event.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Phone" />
              </div>
              <TextInput
                id="phone"
                type="tel"
                placeholder="ex. 123-456-7890"
                required
                onChange={(event) =>
                  dispatch({
                    type: "coupon/setNap",
                    payload: { ...coupon.nap, phone: event.target.value },
                  })
                }
              />
            </div>

            <div className="mb-3">
              <div className="mb-2 block">
                <Label htmlFor="address" value="Address" />
              </div>
              <TextInput
                id="address"
                type="text"
                placeholder="ex. 123 Awesome St"
                required
                onChange={(event) =>
                  dispatch({
                    type: "coupon/setNap",
                    payload: { ...coupon.nap, address: event.target.value },
                  })
                }
              />
            </div>
          </fieldset>

          <hr className="my-4" />

          <fieldset>
            <legend className="mb-4 text-xl font-bold">Services</legend>

            <div className="mb-3">
              <div className="mb-2 block">
                <Label htmlFor="coupons" value="Services" />
              </div>

              {coupon.services.length === 0 ? (
                <p className="mb-4 text-gray-500">No services added</p>
              ) : (
                coupon.services.map((service, index) => (
                  <div className="group relative" key={index}>
                    <TextInput
                      id={`service-${index}`}
                      type="text"
                      placeholder={`ex. Service ${index + 1}`}
                      required
                      value={service}
                      className="mb-2"
                      onChange={(event) =>
                        dispatch({
                          type: "coupon/setService",
                          payload: { index, value: event.target.value },
                        })
                      }
                    />
                    <Button
                      color="light"
                      onClick={() =>
                        dispatch({
                          type: "coupon/removeService",
                          payload: index,
                        })
                      }
                      className="absolute right-1 top-1 hidden group-hover:block"
                    >
                      <HiX className="size-3" />
                    </Button>
                  </div>
                ))
              )}
              <Button
                color="light"
                onClick={() => dispatch({ type: "coupon/addService" })}
                className="flex w-full items-center gap-2"
              >
                <HiPlus className="mr-1 size-4" />
                Add service
              </Button>
            </div>
          </fieldset>

          <hr className="my-4" />

          <fieldset>
            <legend className="mb-4 text-xl font-bold">Coupons</legend>

            <div className="mb-3">
              <div className="mb-2 block">
                <Label htmlFor="coupons" value="Coupons" />
              </div>

              {coupon.services.length === 0 ? (
                <p className="mb-4 text-gray-500">No coupons added</p>
              ) : (
                <div className="mb-4 flex gap-2">
                  {coupon.coupons.map((coupon, index) => (
                    <Kbd
                      key={index}
                      onClick={() => setActiveCouponIndex(index)}
                    >
                      {coupon.title}
                    </Kbd>
                  ))}
                </div>
              )}
              <Button
                color="light"
                onClick={handleOpenAddCouponDialog}
                className="flex w-full items-center gap-2"
              >
                <HiPlus className="mr-1 size-4" />
                Add coupon
              </Button>
            </div>
          </fieldset>

          <Button type="submit" gradientDuoTone="purpleToBlue">
            Create
          </Button>
        </form>
      </div>

      <Modal
        show={isAddCouponDialogOpen}
        onClose={() => setIsAddCouponDialogOpen(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleCreateCoupon}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create your coupon
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                id="title"
                placeholder="ex. Air Conditioning Tune-up"
                value={newCoupon.title}
                onChange={(event) =>
                  setNewCoupon({
                    ...newCoupon,
                    title: event.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <Textarea
                id="description"
                placeholder="ex. Get your air conditioning unit tuned up for the summer season."
                rows={4}
                required
                value={newCoupon.description}
                onChange={(event) =>
                  setNewCoupon({
                    ...newCoupon,
                    description: event.target.value,
                  })
                }
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="inclusions" value="Inclusions" />
              </div>

              {newCoupon.inclusions.map((inclusion, index) => (
                <TextInput
                  key={index}
                  id="inclusions"
                  placeholder="ex. Includes a 20-point inspection and filter replacement."
                  required
                  value={inclusion}
                  className="mb-2"
                  onChange={(event) =>
                    setNewCoupon({
                      ...newCoupon,
                      inclusions: newCoupon.inclusions.map((inclusion, i) => {
                        if (i === index) {
                          return event.target.value;
                        }

                        return inclusion;
                      }),
                    })
                  }
                />
              ))}

              <Button
                color="light"
                onClick={() =>
                  setNewCoupon({
                    ...newCoupon,
                    inclusions: [...newCoupon.inclusions, ""],
                  })
                }
                className="flex w-full items-center gap-2"
              >
                <HiPlus className="mr-1 size-4" />
                Add inclusion
              </Button>
            </div>

            <fieldset className="flex max-w-md flex-col gap-4">
              <legend className="mb-4">Discount type</legend>
              <div className="flex items-center gap-2">
                <Radio
                  id="fixed"
                  name="type"
                  value="fixed"
                  checked={newCoupon.type === "fixed"}
                  onChange={() =>
                    setNewCoupon({
                      ...newCoupon,
                      type: "fixed",
                    })
                  }
                />
                <Label htmlFor="fixed">Fixed</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="percentage"
                  name="type"
                  value="percentage"
                  checked={newCoupon.type === "percentage"}
                  onChange={() =>
                    setNewCoupon({
                      ...newCoupon,
                      type: "percentage",
                    })
                  }
                />
                <Label htmlFor="percentage">Percentage</Label>
              </div>
            </fieldset>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="discount" value="Discount" />
              </div>
              <TextInput
                id="discount"
                type="number"
                required
                value={newCoupon.discount}
                onChange={(event) =>
                  setNewCoupon({
                    ...newCoupon,
                    discount: event.target.valueAsNumber,
                  })
                }
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="conditions" value="Rules and conditions" />
              </div>
              <Textarea
                id="conditions"
                placeholder="ex. Valid for new customers only. Cannot be combined with other offers."
                rows={4}
                required
                value={newCoupon.finePrint}
                onChange={(event) =>
                  setNewCoupon({ ...newCoupon, finePrint: event.target.value })
                }
              />
            </div>

            <div className="flex w-full justify-end">
              <Button type="submit">Create coupon</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Create;
