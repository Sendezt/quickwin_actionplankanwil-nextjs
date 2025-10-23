// components\kolaborasimerchant\sections\SectionHeader.jsx
export const SectionHeader = ({ title, icon: Icon, bgColor, textColor, borderColor }) => (
  <div className={`${bgColor} px-4 py-2 rounded-t-lg border-b-2 ${borderColor}`}>
    <h2 className={`text-lg font-bold ${textColor} flex items-center gap-2`}>
      <Icon className="h-5 w-5" />
      {title}
    </h2>
  </div>
);
