// const { Lucia } = require("lucia");
// const BetterSQLite3Adapter = require("your-sqlite3-adapter-path"); // Ensure to require the adapter correctly
// const db = require("./db"); // Ensure to require your database instance correctly

// const adapter = new BetterSQLite3Adapter(db); // your adapter

// const lucia = new Lucia(adapter, {
//   sessionCookie: {
//     // this sets cookies with super long expiration
//     // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
//     expires: false,
//     attributes: {
//       // set to `true` when using HTTPS
//       secure: process.env.NODE_ENV === "production",
//     },
//   },
// });

// const validateRequest = cache(async () => {
//   const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
//   if (!sessionId) {
//     return {
//       user: null,
//       session: null,
//     };
//   }

//   const result = await lucia.validateSession(sessionId);

//   // next.js throws when you attempt to set cookie when rendering page
//   try {
//     if (result.session && result.session.fresh) {
//       const sessionCookie = lucia.createSessionCookie(result.session.id);
//       cookies().set(
//         sessionCookie.name,
//         sessionCookie.value,
//         sessionCookie.attributes
//       );
//     }
//     if (!result.session) {
//       const sessionCookie = lucia.createBlankSessionCookie();
//       cookies().set(
//         sessionCookie.name,
//         sessionCookie.value,
//         sessionCookie.attributes
//       );
//     }
//   } catch (error) {
//     console.error("Failed to set cookie:", error);
//   }

//   return result;
// });

// module.exports = {
//   lucia,
//   validateRequest,
// };
// lucia.js

const { PrismaClient } = require("@prisma/client");
// import { cookies } from "next/headers";
import cookies from "js-cookie";
import { Lucia } from "lucia";
// const { prisma } = require("./db");

const prisma = new PrismaClient();

const lucia = new Lucia(prisma, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

const validateRequest = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {
    console.error("Failed to set cookie:", error);
  }

  return result;
};

module.exports = {
  lucia,
  validateRequest,
};
