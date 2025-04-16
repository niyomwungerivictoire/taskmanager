import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../../controllers/tasks.controllers.js";
import { protect } from "../../middleware/auth.js";


const routes=new Router();

routes.post("/create",protect,createTask)
routes.get("/",protect,getAllTasks)
routes.get("/:id",protect,getTaskById)
routes.put("/:id",protect,updateTask)
routes.delete("/:id",protect,deleteTask)





export default routes;