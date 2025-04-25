import express from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import cartRoutes from "./routes/cart.routes";
import restaurantsRoutes from "./routes/restaurants.routes";
import menusRoutes from "./routes/menus.routes";
import ordersRoutes from "./routes/orders.routes";
import customerRoutes from "./routes/customers.routes";
import paymentRoutes from "./routes/payments.routes";
import reportRoutes from "./routes/report.routes";

import swaggerUi from "swagger-ui-express";

const app = express();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/restaurants", restaurantsRoutes);
app.use("/api/v1/menus", menusRoutes);
app.use("/api/v1/orders", ordersRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/reports", reportRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(require("./swagger-output.json"))
);

app.listen(3000, () => {
  console.log(`Server is running on 3000`);
});
