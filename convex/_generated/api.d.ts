/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as _helpers_dates from "../_helpers/dates.js";
import type * as _helpers_xp from "../_helpers/xp.js";
import type * as auth from "../auth.js";
import type * as completions from "../completions.js";
import type * as http from "../http.js";
import type * as users from "../users.js";
import type * as weeklyMissions from "../weeklyMissions.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "_helpers/dates": typeof _helpers_dates;
  "_helpers/xp": typeof _helpers_xp;
  auth: typeof auth;
  completions: typeof completions;
  http: typeof http;
  users: typeof users;
  weeklyMissions: typeof weeklyMissions;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
