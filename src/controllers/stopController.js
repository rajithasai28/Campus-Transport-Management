import Stop from "../models/stop.js";
import { makeResourceController } from "./resourceController.js";
const controller = makeResourceController(Stop, { populate: ["route"], publicFilter: { status: "ACTIVE" } });
export const getStops = controller.list;
export const getStopById = controller.get;
export const createStop = controller.create;
export const updateStop = controller.update;
export const deleteStop = controller.remove;
