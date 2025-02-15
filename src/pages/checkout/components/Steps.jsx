import { CHECKOUT_STEPS } from "../../../constants/checkoutSteps";

export function Steps({ currentStep }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {CHECKOUT_STEPS.map((step, stepIdx) => (
            <li
              key={step.name}
              className={`relative ${
                stepIdx !== CHECKOUT_STEPS.length - 1 ? "flex-1" : ""
              }`}
            >
              {stepIdx !== CHECKOUT_STEPS.length - 1 && (
                <div className="absolute top-4 left-0 -right-2 h-0.5">
                  <div
                    className={`h-full ${
                      stepIdx <
                      CHECKOUT_STEPS.findIndex((s) => s.id === currentStep)
                        ? "bg-red-600"
                        : "bg-gray-200"
                    }`}
                  />
                </div>
              )}

              <div className="relative flex flex-col items-center group">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.id === currentStep
                      ? "bg-red-600 text-white ring-2 ring-red-600"
                      : stepIdx <
                        CHECKOUT_STEPS.findIndex((s) => s.id === currentStep)
                      ? "bg-red-600 text-white"
                      : "bg-white border-2 border-gray-300 text-gray-500"
                  }`}
                >
                  {stepIdx <
                  CHECKOUT_STEPS.findIndex((s) => s.id === currentStep) ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    stepIdx + 1
                  )}
                </span>
                <span
                  className={`mt-2 text-sm font-medium ${
                    step.id === currentStep
                      ? "text-red-600"
                      : stepIdx <
                        CHECKOUT_STEPS.findIndex((s) => s.id === currentStep)
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
