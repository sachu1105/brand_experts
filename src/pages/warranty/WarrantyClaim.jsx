import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import toast from "react-hot-toast";
import API from "../loginSignin/Api";

const WarrantyClaim = () => {
  const { warrantyNumber } = useParams();
  const navigate = useNavigate();
  const [claimDetails, setClaimDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = sessionStorage.getItem("claimDetails");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setClaimDetails(parsedData);
        setLoading(false);
        // Only remove the data after we're sure it's been successfully parsed and set
        sessionStorage.removeItem("claimDetails");
      } catch (error) {
        console.error("Error parsing stored claim details:", error);
        fetchClaimDetails();
      }
    } else {
      fetchClaimDetails();
    }
  }, [warrantyNumber]);

  const fetchClaimDetails = async () => {
    try {
      const response = await API.get(`create_claim_warranty/${warrantyNumber}`);

      if (response.data) {
        setClaimDetails(response.data);
      } else {
        throw new Error("No data received");
      }
    } catch (error) {
      console.error("Fetch claim details error:", error);
      toast.error("Failed to fetch claim details", {
        duration: 3000,
      });
      // Add a delay before navigation to ensure the error message is visible
      setTimeout(() => {
        navigate("/warranty");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

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

  const getFileType = (url) => {
    const extension = url.split(".").pop().toLowerCase();
    return ["pdf"].includes(extension) ? "pdf" : "image";
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!claimDetails) {
    return <div className="p-8 text-center">Claim not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6">
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-semibold">Warranty Claim Details</h2>
            <p className="text-sm text-gray-500">
              Warranty Number: {claimDetails.warranty_details.warranty_number}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">Invoice Preview</h3>
              <div className="border rounded-lg overflow-hidden">
                {getFileType(claimDetails.warranty_details.invoice_file) ===
                "pdf" ? (
                  <iframe
                    src={claimDetails.warranty_details.invoice_file}
                    className="w-full h-[500px]"
                    title="Invoice Preview"
                  />
                ) : (
                  <img
                    src={claimDetails.warranty_details.invoice_file}
                    alt="Invoice"
                    className="w-full h-auto"
                  />
                )}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={downloadInvoice}
                  className="flex items-center gap-2 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-4 py-2 rounded-md hover:shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download Invoice
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarrantyClaim;
