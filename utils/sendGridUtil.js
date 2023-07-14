const CustomHttpError = require("./customHttpError");
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;

const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(SENDGRID_API_KEY);

const sendSGemail = async (data) => {
  const msg = { ...data, from: "voroninkv09@gmail.com" };
  // const msg = {
  //   to: userMail,
  //   from: "voroninkv09@gmail.com",
  //   subject: "Verify e-mail",
  //   text: "Please press the Link",
  //   html: `<a>href="http/:localhost/3000/users/verify/:${verifyToken}"</a>`,

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    throw new CustomHttpError(error.code, error.message);
  }
};

module.exports = sendSGemail;

// sgMail
//   .send(msg)
//   .then((res) => {
//     console.log("Email sent");
//     console.log(res);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
