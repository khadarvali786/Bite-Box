import { useState } from "react";
import { User, Store, ChevronDown } from "lucide-react";

const RoleDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const options = [
    { label: "Customer", value: "customer", icon: User, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Restaurant", value: "restaurant", icon: Store, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  const selectedOption = options.find((opt) => opt.value === value);
  const SelectedIcon = selectedOption?.icon || User;

  return (
    <div className="relative w-full">
      {/* Selected box */}
      <div
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-3 border rounded-xl 
          text-sm cursor-pointer bg-white font-semibold
          transition-all duration-200 flex items-center justify-between
          ${open
            ? "border-orange-400 ring-2 ring-orange-200"
            : "border-gray-200 hover:border-gray-300"
          }`}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 ${selectedOption?.bg || 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
            <SelectedIcon size={18} className={selectedOption?.color || 'text-gray-600'} />
          </div>
          <span>{selectedOption ? selectedOption.label : "Select Role"}</span>
        </div>
        <ChevronDown 
          size={18} 
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} 
        />
      </div>

      {/* Dropdown list */}
      {open && (
        <ul className="absolute z-10 w-full mt-2 bg-white border 
                       border-gray-200 rounded-xl shadow-xl overflow-hidden
                       animate-in slide-in-from-top-2 duration-200">
          {options.map((opt, index) => {
            const Icon = opt.icon;
            return (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer transition-all duration-150
                            flex items-center space-x-3 press-effect
                            ${value === opt.value ? opt.bg : 'hover:bg-gray-50'}
                            ${index !== options.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <div className={`w-8 h-8 ${opt.bg} rounded-lg flex items-center justify-center`}>
                  <Icon size={18} className={opt.color} />
                </div>
                <span className={`font-semibold ${value === opt.value ? opt.color : 'text-gray-700'}`}>
                  {opt.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RoleDropdown;



