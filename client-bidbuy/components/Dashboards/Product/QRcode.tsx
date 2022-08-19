import { useState } from "react";
import ReactDOM from "react-dom";
import QRCode from "qrcode.react";

export default function QRcode({
  id,
  setShow,
}: {
  id: number;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //   const [show, setShow] = useState(true);
  // //   const [qrCode, setQrCode] = useState("");
  // //   const [qrCodeUrl, setQrCodeUrl] = useState("");
  console.log(id);

  //   const handleClick = () => {
  //     // setShow(!show);
  //   };

  //   const handleClose = () => setShow(false);
  return (
    <div
      id="popup-modal"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => setShow(false)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="popup-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>

            <span className="sr-only">Close modal</span>
          </button>
          <QRCode
            value="https://flowbite.com/products/1"
            height="100%"
            width="100%"
            renderAs="canvas"
          />
        </div>
      </div>
    </div>
  );
}
