import Image from "next/image";
import React from "react";
export type InvoiceTabProps = {
  title: string;
  timestamps: number;
};
const InvoiceTab = ({ title, timestamps }: InvoiceTabProps) => {
  const invoiceTime = formatTimeStampsToDate(timestamps);

  function formatTimeStampsToDate(timestamps: number) {
    const day = new Date(timestamps).getDate();
    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    const month = new Date(timestamps).getMonth();
    return `${day} ${months[month]}`;
  }
  return (
    <div className="p-2 px-4 inline-flex items-center justify-between cursor-pointer hover:bg-gray-200 w-full">
      <div className="inline-flex items-center gap-2">
        <Image src={"/PDF.png"} alt="pdf-image" width={20} height={20} />
        <h6 className="font-semibold ">{title}</h6>
      </div>
      <p className="capitalize text-xs text-secondaryColor">{invoiceTime}</p>
    </div>
  );
};

export default InvoiceTab;
