import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sendMail", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "storm.mgss@gmail.com",
        pass: "YOUR_APP_PASSWORD", // generate Gmail App Password
      },
    });

    await transporter.sendMail({
      from: email,
      to: "storm.mgss@gmail.com",
      subject: `New Message from ${name}`,
      text: message,
      html: `<p>${message}</p><p>From: ${name} (${email})</p>`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
