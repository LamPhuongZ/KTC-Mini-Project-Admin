import { useState } from 'react';
import clsx from 'clsx';

function BookingManagementPage() {
  const [basicActive, setBasicActive] = useState('editPersonalInfo');

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  return (
    <section className="container mx-auto">
      <div className={clsx("flex justify-center mb-3 border-b border-gray-200")}>
        <button
          className={clsx(
            "py-2 px-4",
            basicActive === 'editPersonalInfo' 
              ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
              : "text-gray-500 hover:text-blue-500"
          )}
          onClick={() => handleBasicClick('editPersonalInfo')}
        >
          THÔNG TIN CÁ NHÂN
        </button>

        <button
          className={clsx(
            "py-2 px-4 ml-4",
            basicActive === 'tab2'
              ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
              : "text-gray-500 hover:text-blue-500"
          )}
          onClick={() => handleBasicClick('tab2')}
        >
          LỊCH SỬ ĐẶT VÉ
        </button>
      </div>
      <div>
        {basicActive === 'editPersonalInfo' && (
          <div>
            {/* Content for THÔNG TIN CÁ NHÂN */}
          </div>
        )}
        {basicActive === 'tab2' && (
          <div>
            {/* Content for LỊCH SỬ ĐẶT VÉ */}
          </div>
        )}
      </div>
    </section>
  );
}

export default BookingManagementPage;
