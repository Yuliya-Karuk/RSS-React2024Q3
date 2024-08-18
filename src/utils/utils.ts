export const calculateStrength = (password: string): number => {
  let strength = 0;

  if (password.length >= 8) {
    strength += 1;
  }
  if (/[A-Z]/.test(password)) {
    strength += 1;
  }
  if (/[a-z]/.test(password)) {
    strength += 1;
  }
  if (/\d/.test(password)) {
    strength += 1;
  }
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    strength += 1;
  }

  return Math.min(strength, 5);
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
