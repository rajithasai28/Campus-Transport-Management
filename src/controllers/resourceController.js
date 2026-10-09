export function makeResourceController(Model, { populate = [], publicFilter = {} } = {}) {
  return {
    list: async (req, res, next) => {
      try {
        const filter = req.user.role === "ADMIN" ? {} : publicFilter;
        let query = Model.find(filter);
        for (const path of populate) query = query.populate(path);
        res.json({ count: await Model.countDocuments(filter), data: await query.sort({ createdAt: -1 }) });
      } catch (e) { next(e); }
    },
    get: async (req, res, next) => {
      try {
        let query = Model.findById(req.params.id);
        for (const path of populate) query = query.populate(path);
        const item = await query;
        if (!item || (req.user.role !== "ADMIN" && publicFilter.status && item.status !== publicFilter.status)) return res.status(404).json({ message: "Record not found" });
        res.json({ data: item });
      } catch (e) { next(e); }
    },
    create: async (req, res, next) => {
      try {
        const item = await Model.create(req.body);
        res.status(201).json({ message: "Record created successfully", data: item });
      } catch (e) { next(e); }
    },
    update: async (req, res, next) => {
      try {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ message: "Record not found" });
        res.json({ message: "Record updated successfully", data: item });
      } catch (e) { next(e); }
    },
    remove: async (req, res, next) => {
      try {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: "Record not found" });
        res.json({ message: "Record deleted successfully" });
      } catch (e) { next(e); }
    }
  };
}
