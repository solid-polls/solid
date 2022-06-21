import { UserManager, UserManagerSettings } from "oidc-client-ts";

const settings: UserManagerSettings = {
    authority: import.meta.env.VITE_OIDC_ISSUER_URL,
    client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
    redirect_uri: window.location.origin + "/auth/callback",
    response_type: "code",
};
export const userManager = new UserManager(settings);