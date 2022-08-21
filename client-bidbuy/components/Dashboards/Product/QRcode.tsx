import QRCode from "qrcode.react";

export default function QRcode({
  id,
  setShow,
  showModal,
}: {
  id: number;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}) {
  return (
    <div
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 transition-all duration-300 ${
        showModal ? "" : "opacity-0 -translate-y-[1500px]"
      }`}
    >
      <div
        className={`flex justify-center items-center h-full transition-all delay-300 ${
          showModal ? "bg-[rgba(1,1,1,0.4)]" : "bg-transparent"
        }`}
      >
        <div className="relative p-8">
          <div className="relative bg-white rounded-lg shadow">
            <button
              onClick={() => setShow(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
            <div className="p-10 rounded shadow-2xl">
              <QRCode
                value={`http://hasanjahidul.com/product/detail.php?id=${id}`}
                height="500px"
                width="500px"
                renderAs="canvas"
                size={500}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
