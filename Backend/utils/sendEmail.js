const sendEmail = async (to, subject, text) => {
  console.log("📧 Fake email (DEV MODE)");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("Text:", text);
};

export default sendEmail;