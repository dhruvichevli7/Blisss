import { XMarkIcon } from "@heroicons/react/24/outline";

function CheckoutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 font-fahkwang">
      <div className="bg-white w-[90%] max-w-lg p-10 relative shadow-2xl text-center">
        {/* Close Icon */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Content */}
        <h2 className="text-3xl font-regular mb-4 leading-tight">
          We can't accept online orders right now
        </h2>
        
        <p className="text-gray-600 mb-8">
          Please contact us to complete your purchase.
        </p>

        {/* Got It Button */}
        <button
          onClick={onClose}
          className="bg-[#4a4a4a] text-white px-10 py-3 uppercase tracking-widest text-sm hover:bg-black transition-colors"
        >
          Got It
        </button>
      </div>
    </div>
  );
}

export default CheckoutModal;