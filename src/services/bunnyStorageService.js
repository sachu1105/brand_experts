const API_KEY = import.meta.env.VITE_BUNNY_API_KEY;
const STORAGE_ZONE_NAME = import.meta.env.VITE_BUNNY_STORAGE_ZONE;
const STORAGE_ENDPOINT = import.meta.env.VITE_BUNNY_STORAGE_ENDPOINT;

// Validate environment variables
if (!API_KEY || !STORAGE_ZONE_NAME || !STORAGE_ENDPOINT) {
  console.error("Missing required environment variables:", {
    API_KEY: !!API_KEY,
    STORAGE_ZONE_NAME: !!STORAGE_ZONE_NAME,
    STORAGE_ENDPOINT: !!STORAGE_ENDPOINT,
  });
  throw new Error(
    "Missing required environment variables for Bunny.net storage"
  );
}

const STORAGE_PATH = `/${STORAGE_ZONE_NAME}/designs`;

export const uploadDesign = async (file) => {
  try {
    const timestamp = Date.now();
    const safeFileName = `design_${timestamp}_${file.name.replace(
      /[^a-zA-Z0-9.-]/g,
      "_"
    )}`;
    const uploadPath = `${STORAGE_PATH}/${safeFileName}`;

    // Log the full upload URL for debugging
    const uploadUrl = `${STORAGE_ENDPOINT}${uploadPath}`;
    console.log("Attempting upload to:", uploadUrl);

    // Convert file to Blob
    const blob = new Blob([await file.arrayBuffer()], { type: file.type });

    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        AccessKey: API_KEY,
        "Content-Type": file.type || "application/octet-stream",
        // Remove CORS headers - these should be set on server side
      },
      body: blob,
      // Add mode credentials if needed
      credentials: "omit",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upload failed:", {
        status: response.status,
        error: errorText,
        path: uploadPath,
      });
      throw new Error(`Upload failed: ${response.status} - ${errorText}`);
    }

    return {
      cdnUrl: `https://${STORAGE_ZONE_NAME}.b-cdn.net/designs/${safeFileName}`,
      storagePath: uploadPath,
    };
  } catch (error) {
    // Improved error logging
    console.error("Bunny.net Upload Error:", {
      message: error.message,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      endpoint: STORAGE_ENDPOINT,
      storagePath: STORAGE_PATH,
    });
    throw new Error(`Upload failed: ${error.message}`);
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
