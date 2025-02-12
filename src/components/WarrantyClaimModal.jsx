import { Download, X } from "lucide-react";
import toast from "react-hot-toast";

const WarrantyClaimModal = ({ claimDetails, onClose }) => {
  const downloadInvoice = async () => {
    try {
      const invoiceUrl = claimDetails.warranty_details.invoice_file;

      // Show loading toast
      const loadingToast = toast.loading("Downloading invoice...");

      // Fetch the file
      const response = await fetch(invoiceUrl);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      // Get filename from url or use default
      const filename = invoiceUrl.split("/").pop() || "invoice";

      // Set download attributes
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);

      // Trigger download
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      // Success message
      toast.dismiss(loadingToast);
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download invoice. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h2 className="text-2xl font-semibold">Warranty Claim Details</h2>
              <p className="text-sm text-gray-500">
                Warranty Number: {claimDetails.warranty_details.warranty_number}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Rest of the content similar to WarrantyClaim component */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Claim Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-600">Status:</span>{" "}
                  {claimDetails.claim_details.status}
                </p>
                <p>
                  <span className="text-gray-600">Claimed At:</span>{" "}
                  {claimDetails.claim_details.claimed_at}
                </p>
                <p>
                  <span className="text-gray-600">Description:</span>{" "}
                  {claimDetails.claim_details.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Warranty Details</h3>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-600">Full Name:</span>{" "}
                  {claimDetails.warranty_details.full_name}
                </p>
                <p>
                  <span className="text-gray-600">Email:</span>{" "}
                  {claimDetails.warranty_details.email}
                </p>
                <p>
                  <span className="text-gray-600">Phone:</span>{" "}
                  {claimDetails.warranty_details.phone}
                </p>
                <p>
                  <span className="text-gray-600">Product:</span>{" "}
                  {claimDetails.warranty_details.product_name}
                </p>
                <p>
                  <span className="text-gray-600">Invoice Date:</span>{" "}
                  {claimDetails.warranty_details.invoice_date}
                </p>
                <p>
                  <span className="text-gray-600">Invoice Value:</span>{" "}
                  {claimDetails.warranty_details.invoice_value} AED
                </p>
                <p>
                  <span className="text-gray-600">Warranty Plan:</span>{" "}
                  {claimDetails.warranty_details.warranty_plan}
                </p>
              </div>
            </div>
          </div>

          {claimDetails.warranty_details.invoice_file && (
            <div className="flex justify-center pt-4">
              <button
                onClick={downloadInvoice}
                className="flex items-center gap-2 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-4 py-2 rounded-md hover:shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                Download Invoice
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarrantyClaimModal;
