const API_KEY = import.meta.env.VITE_BUNNY_API_KEY;
const STORAGE_ZONE_NAME = import.meta.env.VITE_BUNNY_STORAGE_ZONE;
const STORAGE_ENDPOINT = import.meta.env.VITE_BUNNY_STORAGE_ENDPOINT;

// Validate environment variables
if (!API_KEY || !STORAGE_ZONE_NAME || !STORAGE_ENDPOINT) {
  console.error("Missing required environment variables");
  throw new Error(
    "Missing required environment variables for Bunny.net storage"
  );
}

const STORAGE_PATH = `/${STORAGE_ZONE_NAME}/warranty-invoices`;

export const uploadInvoice = async (file) => {
  try {
    const timestamp = Date.now();
    const safeFileName = `invoice_${timestamp}_${file.name.replace(
      /[^a-zA-Z0-9.-]/g,
      "_"
    )}`;
    const uploadPath = `${STORAGE_PATH}/${safeFileName}`;

    const uploadUrl = `${STORAGE_ENDPOINT}${uploadPath}`;
    console.log("Attempting invoice upload to:", uploadUrl);

    const blob = new Blob([await file.arrayBuffer()], { type: file.type });

    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        AccessKey: API_KEY,
        "Content-Type": file.type || "application/octet-stream",
      },
      body: blob,
      credentials: "omit",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} - ${errorText}`);
    }

    return {
      cdnUrl: `https://${STORAGE_ZONE_NAME}.b-cdn.net/warranty-invoices/${safeFileName}`,
      storagePath: uploadPath,
    };
  } catch (error) {
    console.error("Invoice Upload Error:", {
      message: error.message,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    });
    throw error;
  }
};
