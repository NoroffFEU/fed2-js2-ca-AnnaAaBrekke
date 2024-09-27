export default async function router(pathname = window.location.pathname) {
  const basePath = "/fed2-js2-ca-AnnaAaBrekke";  // Set the base path for GitHub Pages

  switch (true) {
    case pathname === basePath + "/":
      await import(`${basePath}/src/js/router/views/home.js`);
      break;
    case pathname === basePath + "/auth/login/":
      await import(`${basePath}/src/js/router/views/login.js`);
      break;
    case pathname === basePath + "/auth/register/":
      await import(`${basePath}/src/js/router/views/register.js`);
      break;
    case pathname === basePath + "/post/create/":
      await import(`${basePath}/src/js/router/views/postCreate.js`);
      break;
    case pathname.startsWith(basePath + "/post/edit"):
      await import(`${basePath}/src/js/router/views/postEdit.js`);
      break;
    case pathname === basePath + "/profile/":
      await import(`${basePath}/src/js/router/views/profile.js`);
      break;
    default:
      await import(`${basePath}/src/js/router/views/notFound.js`);
  }
}
