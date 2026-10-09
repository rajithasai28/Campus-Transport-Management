import Vehicle from "../models/vehicle.js";
import { makeResourceController } from "./resourceController.js";
const controller = makeResourceController(Vehicle, { populate: ["route"], publicFilter: { status: "ACTIVE" } });
export const getVehicles = controller.list;
export const getVehicleById = controller.get;
export const createVehicle = controller.create;
export const updateVehicle = controller.update;
export const deleteVehicle = controller.remove;
