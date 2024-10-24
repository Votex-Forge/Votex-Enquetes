declare module "passport-jwt" {
  import { Strategy as PassportStrategy } from "passport";

  interface JwtFromRequestFunction {
    (req: Request): string | null;
  }

  interface StrategyOptions {
    jwtFromRequest: JwtFromRequestFunction;
    secretOrKey: string | Buffer;
    issuer?: string;
    audience?: string;
    algorithms?: string[];
    ignoreExpiration?: boolean;
    passReqToCallback?: boolean;
    jsonWebTokenOptions?: {
      complete?: boolean;
    };
  }

  interface VerifyCallback {
    (error: any, user?: any, info?: any): void;
  }

  export class Strategy extends PassportStrategy {
    constructor(options: StrategyOptions, verify: VerifyCallback);
  }

  export namespace ExtractJwt {
    function fromAuthHeaderAsBearerToken(): JwtFromRequestFunction;
  }
}
