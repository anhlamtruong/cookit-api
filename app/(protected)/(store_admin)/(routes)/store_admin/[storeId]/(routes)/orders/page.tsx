import prismaMySQL from "@/lib/service/prisma_mysql";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { OrderColumn } from "./_components/columns";
import { OrderClient } from "./_components/orders_client";
import { getUserById } from "@/actions/admin/get_user_by_id";
export const revalidate = 0;
const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismaMySQL.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          menu: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = await Promise.all(
    orders.map(async (item): Promise<OrderColumn> => {
      const customer = await getUserById(item.customerId);

      return {
        id: item.id,
        menu: item.orderItems
          .map((orderItem) => orderItem.menu.name)
          .join(", "),
        customer: customer.name ?? "Un-know",
        totalPrice: formatter.format(
          item.orderItems.reduce((total, item) => {
            return total + Number(item.menu.price) * Number(item.quantity);
          }, 0)
        ),
        quantity: item.orderItems
          .reduce((total, item) => {
            return total + Number(item.quantity);
          }, 0)
          .toString(),
        orderItems: item.orderItems.map((item) => {
          return {
            menu: item.menu.name,
            quantity: item.quantity ?? 1,
            unitPrice: item.unitPrice ?? 0,
            totalPrice: (item.quantity ?? 1) * (item.unitPrice ?? 0),
          };
        }),
        note: item.notes ?? "",
        email: customer.email ?? "unknown@email.com",
        isPaid: item.isPaid ? "Paid" : "Order Placed",
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
        phone: item.phone,
        address: item.address,
      };
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders}></OrderClient>
      </div>
    </div>
  );
};

export default OrdersPage;
