export function validateCardNumber(
  number,
  label,
  input,
  cardErrorMessage,
  generalErrorMessage
) {
  if (number.length != 14 || !/^\d+$/.test(number)) {
    label.classList.add("text-red-700");
    input.classList.add(
      "bg-red-50",
      "border-red-500",
      "text-red-900",
      "placeholder-red-700",
      "focus:ring-red-500",
      "focus:border-red-500"
    );
    if (number.length == 14) {
      cardErrorMessage.textContent = "Card number must contain only digits.";
    } else {
      cardErrorMessage.textContent = "Card number must be exactly 14 digits.";
    }
    cardErrorMessage.classList.remove("hidden");
    generalErrorMessage.classList.remove("hidden");

    return false;
  }

  label.classList.remove("text-red-700");
  input.classList.remove(
    "bg-red-50",
    "border-red-500",
    "text-red-900",
    "placeholder-red-700",
    "focus:ring-red-500",
    "focus:border-red-500"
  );
  cardErrorMessage.classList.add("hidden");

  generalErrorMessage.classList.add("hidden");

  return true;
}
