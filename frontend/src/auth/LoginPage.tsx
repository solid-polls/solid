import { Button, Stack } from "@mui/material";
import { userManager } from "./userManager";

export default function LoginPage() {
    return <Stack>
        <Button onClick={() => {
            userManager.signinRedirect();
        }}>Log In</Button>
    </Stack>
}