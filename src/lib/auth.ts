import { betterAuth } from "better-auth";
import { sendEmailAction } from "@/actions/send-email.action";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { getNormalizedName, getValidEmailDomains } from "@/lib/utils";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),

  // Social providers configuration
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  // Email and Password Configuration
  emailAndPassword: {
    enabled: true,
    // Disabled auto sign in after registration
    autoSignIn: false,
    // Reset the  Password hashing and verification algorithm to Argon2
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    requireEmailVerification: true,
    // reset password configuration
    sendResetPassword: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email!,
        subject: "Reset your password",
        meta: {
          description: "Please click the link below to reset your password",
          link: url,
        },
      });
    },
  },

  // Email verification configuration
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60, // 1 hour
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      // redirect the user to the verify page if the token is invalid or expired
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify-email");

      await sendEmailAction({
        to: user.email!,
        subject: "Verify your email address",
        meta: {
          description:
            "Please verify your email address to complete your registration",
          link: String(link),
        },
      });
    },
  },

  // Adding additional fields to the user model and better auth type schema
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN", "VISITOR", "AUTHOR"],
        input: false,
      },
    },
  },

  // Session expiration logic
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days
  },

  // Hooks and hook for checking email for valid domains
  hooks: {
    before: createAuthMiddleware(async (context) => {
      if (context.path === "/sign-up/email") {
        const email = context.body?.email as string;
        const domain = email.split("@")[1];

        const VALID_DOMAINS = getValidEmailDomains();
        if (!VALID_DOMAINS.includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid email domain, please use a valid email domain",
          });
        }

        const name = getNormalizedName(context.body?.name as string);
        return {
          context: {
            ...context,
            body: {
              ...context.body,
              name,
            },
          },
        };
      }
    }),
  },
  plugins: [nextCookies()],
});
