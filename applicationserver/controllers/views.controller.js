

export async function rootView(req, res) {
  res.redirect("/login");
}


export async function failloginView(req, res) {
  let msg = req.query.msg;
  res.render("login", { msg });
}

export async function loginView(req, res) {
  if (req.signedCookies.jwt) {
    res.redirect("/products");
  } else {
    res.render("login");
  }
}


export async function passwordRestoreView(req, res) {
  res.render("passwordRestore");
}

export async function restoreLinkView(req, res) {
  let email = req.query.email;
  const token = req.cookies.emailToken;
  const isValidToken = verifyEmailToken(token);
  if (!isValidToken) {
    let msg = "El enlace ha expirado";
    return res.render("login", { msg });
  }
  res.render("restoreLink", { email, token });
}

export async function registerView(req, res) {
  try {
    if (req.signedCookies.jwt) {
      res.redirect("/products");
    } else {
      res.render("register");
    }
  } catch (error) {
    req.logger.ERROR(error.message);
    res.status(500).send(error.messages);
  }
}
export async function failRegisterView(req, res) {
  let msg = req.query.msg;
  res.render("register", { msg });
}
