import { NextRequest } from "next/server";
import { sessionMiddleware } from "./middlewares";

export default function name(request: NextRequest) {
    // console.log("middleware");

    sessionMiddleware(request);
}
