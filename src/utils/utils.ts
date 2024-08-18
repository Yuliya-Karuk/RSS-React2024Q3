export const calculateStrength = (password: string): number => {
  let strength = 0;

  if (password.length >= 8) {
    strength++;
  }
  if (/[A-Z]/.test(password)) {
    strength++;
  }
  if (/[a-z]/.test(password)) {
    strength++;
  }
  if (/\d/.test(password)) {
    strength++;
  }
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    strength++;
  }

  return Math.min(strength, 4);
};

export const transformImgToBase64 = (img: File): Promise<string> => {
  const reader = new FileReader();

  reader.readAsDataURL(img);
  return new Promise(resolve => {
    reader.onload = () => {
      resolve(reader.result as string);
    };
  });
};
