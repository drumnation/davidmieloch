import { ContactFormValues } from "./ContactForm.types";

export const createFormData = (values: ContactFormValues): FormData => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null && value !== "") {
      formData.append(key, String(value));
    }
  });
  if (!formData.has("_gotcha")) {
    formData.append("_gotcha", "");
  }
  return formData;
};
