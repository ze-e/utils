export const isEmail = (email) => {
  return email.match(
    new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  );
};
