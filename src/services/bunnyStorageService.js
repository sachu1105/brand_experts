const API_KEY = "7d589972-67b3-49fd-bf18c77403d3-850d-4a78";
const STORAGE_ZONE_NAME = "brand-experts";
const STORAGE_ENDPOINT = "https://storage.bunnycdn.com";
const STORAGE_PATH = `/${STORAGE_ZONE_NAME}/designs`; // Updated path construction

export const uploadDesign = async (file) => {
  try {
    // Generate a unique filename with timestamp and clean name
    const timestamp = Date.now();
    const safeFileName = `design_${timestamp}_${file.name.replace(
      /[^a-zA-Z0-9.-]/g,
      "_"
    )}`;
    const uploadPath = `${STORAGE_PATH}/${safeFileName}`;

    // Create blob from file and get array buffer
    const arrayBuffer = await file.arrayBuffer();

    // Upload to Bunny.net storage with corrected URL
    const response = await fetch(`${STORAGE_ENDPOINT}${uploadPath}`, {
      method: "PUT",
      headers: {
        AccessKey: API_KEY,
        "Content-Type": "application/octet-stream",
        Accept: "*/*", // Added to ensure proper response handling
      },
      body: arrayBuffer,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} - ${errorText}`);
    }

    // Construct the CDN URL correctly
    const cdnUrl = `https://${STORAGE_ZONE_NAME}.b-cdn.net/designs/${safeFileName}`;

    return {
      cdnUrl,
      storagePath: uploadPath,
    };
  } catch (error) {
    console.error("Bunny.net Upload Error:", error);
    throw new Error(`Failed to upload design: ${error.message}`);
  }
};

// Optional: Add function to delete file if needed
export const deleteDesign = async (storagePath) => {
  try {
    const response = await fetch(`${STORAGE_ENDPOINT}${storagePath}`, {
      method: "DELETE",
      headers: {
        AccessKey: API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Bunny.net Delete Error:", error);
    throw new Error("Failed to delete design: " + error.message);
  }
};
