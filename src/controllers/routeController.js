import Route from "../models/route.js";
import { makeResourceController } from "./resourceController.js";
const controller = makeResourceController(Route, { populate: [], publicFilter: { status: "ACTIVE" } });
export const getRoutes = controller.list;
export const getRouteById = controller.get;
export const createRoute = controller.create;
export const updateRoute = controller.update;
export const deleteRoute = controller.remove;
