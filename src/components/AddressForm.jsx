import { useAddress } from "../hooks/useAddress";

const AddressForm = () => {
  const { createAddress, error, loading, retryOperation } = useAddress();

  const handleSubmit = async (formData) => {
    try {
      await createAddress(formData);
      // Handle success
    } catch (err) {
      // Error is already handled by the hook
      console.error("Address creation failed:", err.message);
    }
  };

  return (
    <div>
      {error && (
        <div className="error-message">
          {error}
          <button onClick={retryOperation}>Retry</button>
        </div>
      )}

      {/* ...existing form code... */}

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Address"}
      </button>
    </div>
  );
};
