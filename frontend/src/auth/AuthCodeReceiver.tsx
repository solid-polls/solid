import { DefaultParams, RouteComponentProps, RouteProps } from "wouter";

export default function AuthCodeReceiver(props: RouteComponentProps<DefaultParams>) {
    const params = new URLSearchParams(window.location.search);
    return <div>{params.get("code")}</div>;
}