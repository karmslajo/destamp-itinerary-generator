import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { MockContext } from "./src/types/types";

type Context = {
  prisma: PrismaClient;
  req: any;
};

const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  };
};

const prisma = new PrismaClient();

const context: Context = {
  prisma,
  req: {},
};

const createContext = (request: any) => {
  return {
    ...request,
    prisma,
  };
};

export { context, createMockContext, createContext };
export type { Context };
