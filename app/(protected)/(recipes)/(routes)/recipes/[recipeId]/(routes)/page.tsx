import { CreditCard, DollarSign, Package } from "lucide-react";
import useStoreData from "@/hooks/store/useStore";
import { Separator } from "@/components/ui/separator";
import { AdminDashboardOverview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { getTotalRevenue } from "@/actions/admin/get_total_revenue";
import { getSalesCount } from "@/actions/admin/get_sales_count";
import { getGraphRevenue } from "@/actions/admin/get_graph_revenue";
import { getStockCount } from "@/actions/admin/get_stock_count";
import { formatter } from "@/lib/utils";
import { Suspense } from "react";
import LoadingOverlay from "@/components/loading_overlay";
export interface DashBoardPageProps {
  params: {
    storeId: string;
  };
}

const DashBoardPage: React.FC<DashBoardPageProps> = async ({ params }) => {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <div>Test</div>
    </Suspense>
  );
};

export default DashBoardPage;
