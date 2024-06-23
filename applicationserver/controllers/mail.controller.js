import config from "../../config/config.js";
import { generateEmailToken } from "../../config/passport.config.js";
import { usersService } from "../services/users.service.js";
// import { DuplicateCode, IncompleteFields, NotFound } from "../test/customError.js";
// import { generateProducts } from "../utils.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "lstucchi@gmail.com",
    pass: "pass",
  },
});

const mail = async(req,res)=>{
  const correo = req.query.email;
  const token = generateEmailToken(correo);
  res.cookie("emailToken", token);
  const user = await usersService.getUserByEmail(correo);
  if (user) {
    let result = await transport.sendMail({
      from: "Carla del Proyecto de Coder <lstucchi@gmail.com>",
      to: `${user.first_name} ${user.last_name} <${correo}>`,
      subject: "Recupero de contraseña",
      html: `
      <div style="background-color: #f2f2f2; padding: 20px; text-align: center;">
        <h3 style="color: #28a745;">Usted ha solicitado recuperar la contraseña</h3>
        <p style="font-family: Arial, sans-serif; color: #333;">Haga click en el siguiente botón que lo redigirá a la página de recuperación</p>
        <a href="http://localhost:${config.port}/restoreLink?email=${correo}" class="btn btn-success" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: #fff; text-decoration: none; border: 1px solid #218838; border-radius: 5px;" onmouseover="this.style.backgroundColor='#218838'; this.style.borderColor='#1e7e34'" onmouseout="this.style.backgroundColor='#28a745'; this.style.borderColor='#218838'">Recuperar Contraseña</a>
      </div>
    `,
      attachments: [],
    });
    let msg = "Se le ha enviado un correo para la recuperación de la contraseña";
    res.render("login", { msg });
  } else {
    let msg = "El correo es incorrecto";
    res.render("passwordRestore", { msg });
  }
}


const mailController  = {
  mail,
}

export default mailController;