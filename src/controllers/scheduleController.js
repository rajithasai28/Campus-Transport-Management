import Schedule from "../models/schedule.js";
import { makeResourceController } from "./resourceController.js";
const controller = makeResourceController(Schedule, { populate: ["route", "vehicle"], publicFilter: { status: "ACTIVE" } });
export const getSchedules = controller.list;
export const getScheduleById = controller.get;
export const createSchedule = controller.create;
export const updateSchedule = controller.update;
export const deleteSchedule = controller.remove;
